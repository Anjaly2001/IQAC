# from django.contrib.auth import login, logout
# from rest_framework import status
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from rest_framework.response import Response
# from rest_framework_simplejwt.tokens import RefreshToken
# # from authentication.serializers import UserSerializer, UserLoginSerializer
# from .emails import send_otp_to_email
# from django.utils import timezone
# from datetime import timedelta

# # views.py

# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from django.contrib.auth import authenticate, login
# from rest_framework_simplejwt.tokens import RefreshToken
# from .serializers import UserLoginSerializer, RegisterSerializer
# from django.contrib.auth.models import User
# from django.shortcuts import get_object_or_404

# @api_view(['POST'])
# def login_with_email(request):
#     email = request.data.get('email')
#     if email:
#         print(email)
#         user = User.objects.get(email=email)
#         print(user)
#         send_otp_to_email(email)
#         return Response({'message': 'OTP sent to your email.'}, status=status.HTTP_200_OK)
#     return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

# from .models import OTP


# @api_view(['POST'])
# def verify_otp(request):
#     email = request.data.get('email')
#     otp = request.data.get('otp')

#     if email and otp:
#         user = User.objects.filter(email=email).first()
#         print(user)
#         if not user:
#             return Response({'error': 'No user found with this email.'}, status=status.HTTP_404_NOT_FOUND)

#         otp_entry = OTP.objects.filter(user=user, code=otp).first()
#         if otp_entry:
#             # Check if the OTP is within the valid time frame (1 day)
#             time_difference = timezone.now() - otp_entry.created_at
#             if time_difference > timedelta(days=1):
#                 return Response({'error': 'OTP expired.'}, status=status.HTTP_400_BAD_REQUEST)

#             # OTP is valid, proceed with login
#             login(request, user)
#             refresh = RefreshToken.for_user(user)
#             # if user.is_superuser and user.is_staff:
#             #     role = "Admin"
#             # else:
#             #     role = "User"

#             return Response({
#                 "data": {
#                     'access_token': str(refresh.access_token),
#                     'refresh_token': str(refresh),
#                 },
#                 'user': user.username,
#                 # 'role': role,
#                 'first_name': user.first_name,
#             }, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)

#     return Response({'error': 'Email and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def user_token_refresh(request):
#     if request.method == 'POST':
#         refresh_token = request.data.get('refresh_token')
#         if not refresh_token:
#             return Response({"error": "Refresh token is missing"}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             refresh = RefreshToken(refresh_token)
#             access_token = str(refresh.access_token)
#             return Response({"access_token": access_token}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
# @api_view(['POST'])
# def register(request):
#     if request.method == 'POST':
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response({
#                 'username': user.username,
#                 'email': user.email,
#                 'role': serializer.data['role'],
#                 # 'emp_id':user.emp_id,
#                 'message': 'User registered successfully.'
#             }, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def user_logout(request):
#     if request.method == 'POST':
#         refresh_token = request.data.get('refresh_token')
#         if not refresh_token:
#             return Response({"error": "Refresh token is missing"}, status=status.HTTP_400_BAD_REQUEST)
#         try:
#             refresh = RefreshToken(refresh_token)
#             refresh.blacklist()
#             return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
# //////////////////////////////////////////////////////////////////////////////////////////////////////

from django.contrib.auth import login, logout
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser, User_profile
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserRegistrationSerializer, USerProfileSerializer, LoginSerializer, DepartmentSerializer

from .emails import send_otp_to_email
from datetime import timedelta

from django.utils import timezone
# from datetime import timedelta

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
       data = request.data.copy()
       data['role'] = 'staffs'

       data['is_superuser'] =  False
       data['is_staff'] = False

       data_user_profile = {
                'emp_id':request.data.get('emp_id'),
                'ph': request.data.get('ph'),
                'department': request.data.get('department'),

            } 
       
       serializer = UserRegistrationSerializer(data=data)
       if serializer.is_valid():
            user = serializer.save()

            # Add the user to the user profile data
            data_user_profile['user'] = user.id

            # Serialize and save the user profile
            user_profile_serializer = USerProfileSerializer(data=data_user_profile)
            if user_profile_serializer.is_valid():
                user_profile = user_profile_serializer.save()

                # Return both the user and user profile data
                return Response({
                    'user': UserRegistrationSerializer(user).data,
                    'user_profile': USerProfileSerializer(user_profile).data,
                }, status=status.HTTP_201_CREATED)

            # If the user profile serializer is not valid, delete the created user
            user.delete()
            return Response(user_profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_with_email(request):
    email = request.data.get('email')
    if email:
        print(email)
        user = CustomUser.objects.get(email=email)
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
        user = CustomUser.objects.filter(email=email).first()
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
        

import csv
from django.core.files.storage import default_storage

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def multiple_user_registration(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Handle file upload
    file = request.FILES['file']
    file_path = default_storage.save('temp.csv', file)

    # Parse CSV and save data
    with open(file_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Extract CustomUser data
            user_data = {
                'email': row['email'],
                'username': row['username'],
                'role': row['role'],
                # Add other fields if needed
            }

            user_serializer = UserRegistrationSerializer(data=user_data)
            if user_serializer.is_valid():
                user = user_serializer.save()

                # Extract UserProfile data and associate with the user
                profile_data = {
                    'user': user.id,
                    'emp_id': row['emp_id'],
                    'ph': row['ph'],
                    'department': row['department'],  # This should be an ID or slug of the department
                    # Add other fields if needed
                }

                profile_serializer = USerProfileSerializer(data=profile_data)
                if profile_serializer.is_valid():
                    profile_serializer.save()
                else:
                    return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({"status": "success"}, status=status.HTTP_201_CREATED)





@api_view(['POST'])
@permission_classes([IsAuthenticated])
def department_register(request):
    if request.method == 'POST':
        if not request.user.is_superuser and not request.user.is_staff:
            return Response({"error": "Only admin can create departments"})
        serializer = DepartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({"errors": serializer.errors, "message": "Registration failed."},
                        status=status.HTTP_400_BAD_REQUEST)
    else:
        # Handling for GET or other methods if needed
        return Response({"error": "Method not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)