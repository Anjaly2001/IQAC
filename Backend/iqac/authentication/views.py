from django.contrib.auth import login, logout
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
# from authentication.serializers import UserSerializer, UserLoginSerializer
from .emails import send_otp_to_email
from django.utils import timezone
from datetime import timedelta

# views.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserLoginSerializer,  UserSerializer, UserProfileSerializer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

@api_view(['POST'])
def login_with_email(request):
    email = request.data.get('email')
    if email:
        print(email)
        user = User.objects.get(email=email)
        print(user)
        send_otp_to_email(email)
        return Response({'message': 'OTP sent to your email.'}, status=status.HTTP_200_OK)
    return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

from .models import OTP


@api_view(['POST'])
def verify_otp(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    if email and otp:
        user = User.objects.filter(email=email).first()
        print(user)
        if not user:
            return Response({'error': 'No user found with this email.'}, status=status.HTTP_404_NOT_FOUND)

        otp_entry = OTP.objects.filter(user=user, code=otp).first()
        if otp_entry:
            # Check if the OTP is within the valid time frame (1 day)
            time_difference = timezone.now() - otp_entry.created_at
            if time_difference > timedelta(days=1):
                return Response({'error': 'OTP expired.'}, status=status.HTTP_400_BAD_REQUEST)

            # OTP is valid, proceed with login
            login(request, user)
            refresh = RefreshToken.for_user(user)
            # if user.is_superuser and user.is_staff:
            #     role = "Admin"
            # else:
            #     role = "User"

            return Response({
                "data": {
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                },
                'user': user.username,
                # 'role': role,
                'first_name': user.first_name,
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'Email and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_token_refresh(request):
    if request.method == 'POST':
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({"error": "Refresh token is missing"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            return Response({"access_token": access_token}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def user_register(request):
    if not request.user.is_superuser:
        return Response({"error": "Only admin users can perform user registration."}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'POST':
        data = request.data.copy()
        data['role'] = 'user'

        # Validate and save the user data
        user_serializer = UserSerializer(data=data)
        if user_serializer.is_valid():
            user = user_serializer.save()

            # Prepare data for UserProfile
            data_user_profile = {
                'emp_id': request.data.get('emp_id'),
                'ph': request.data.get('ph'),
                'department': request.data.get('department'),
                'role': 'user'
            }

            # Pass the created user to the UserProfileSerializer via context
            user_profile_serializer = UserProfileSerializer(data=data_user_profile, context={'user': user})
            if user_profile_serializer.is_valid():
                user_profile_serializer.save()

                combined_data = {**user_serializer.data, **user_profile_serializer.data}
                return Response({"data": combined_data, "message": "Registration successful"}, status=status.HTTP_201_CREATED)
            else:
                print(user_profile_serializer.errors)  # Debugging
                return Response({"error": user_profile_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            print(user_serializer.errors)  # Debugging
            return Response({"error": user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated,IsAdminUser])
# def user_register(request):
#     if not request.user.is_superuser:
#         return Response({"error": "Only admin users can perform user registration."},status=status.HTTP_403_FORBIDDEN)

#     if request.method == 'POST':
#         data = request.data.copy()
#         data['role'] = 'user'
#         user_serializer = UserSerializer(data=data)
#         if  user_serializer.is_valid():
#             user_serializer.save()

#         data_user_profile = {
#                 'emp_id': request.data.get('emp_id'),
#                 'ph': request.data.get('ph')
#             } 
#         user_profile_serializer = UserProfileSerializer(data=data_user_profile)
#         if user_profile_serializer.is_valid():
#             user_profile_serializer.save
      
#         #    combined_data = user_profile_serializer.data + user_serializer.data
#             return Response({"data":user_serializer, "message": "registration successful"},status=status.HTTP_201_CREATED)
#         return Response({"data":  user_serializer.errors, "message": "Some error occurred"},status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({"error": "Refresh token is missing"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            refresh = RefreshToken(refresh_token)
            refresh.blacklist()
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)