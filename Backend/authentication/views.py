

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

from .models import Department
from .serializers import UserRegistrationSerializer, USerProfileSerializer, LoginSerializer, DepartmentSerializer, LocationSerializer
import csv
from django.core.files.storage import default_storage
from .emails import send_otp_to_email
from datetime import timedelta
from .models import OTP, Location
from django.utils import timezone

# from datetime import timedelta

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
       
        data = request.data.copy()
        data['role'] = 'staffs'

        data['is_superuser'] =  False
        data['is_staff'] = False

       
        dep=request.data.get('department')

        if dep=='others':
            dep1 = request.data.get('new_department')
            depObj=Department.objects.create(name=dep1)


            data_user_profile = {
                'emp_id':request.data.get('emp_id'),
                'ph': request.data.get('ph'),                                                                  
                'department': depObj.id,
            } 
        else:
            data_user_profile = {
                'emp_id':request.data.get('emp_id'),
                'ph': request.data.get('ph'),
                'department': dep,
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
        print(user.role)
        send_otp_to_email(email)
        return Response({'role': user.role,'message': 'OTP sent to your email.'}, status=status.HTTP_200_OK)
    return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)



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
            time_difference = timezone.now() - otp_entry.created_at
            if time_difference > timedelta(days=1):
                return Response({'error': 'OTP expired.'}, status=status.HTTP_400_BAD_REQUEST)

            # OTP is valid, proceed with login
            login(request, user)
            refresh = RefreshToken.for_user(user)
            if user.is_superuser and user.is_staff:
                role = "admin"
            else:
                role = "staffs"

            return Response({
                "data": {
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                },
                'user': user.username,
                'role': user.role,
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


#______________USER LIST API__________
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_list(request):
    obj = CustomUser.objects.all()




#_____________DEPARTMENT API_________

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
        return Response({"error": "Method not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def department_list(request):
    if request.method == 'GET':
        obj = Department.objects.all()
        serializer = DepartmentSerializer(obj, many=True)
        return Response(serializer.data)
    
#________________CAMPUS API____________

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def campus_register(request):
    if request.method == 'POST':
        if not request.user.is_superuser and request.user.is_staff:
            return Response({"error": "Only admin can list departments"})
        data = request.data.copy()
        data['created_by'] = request.user.id
        serializer = LocationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"errors": serializer.errors, "message": "Registration failed."},status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def campus_list(request):
    if request.method == 'GET':
        obj = Location.objects.all().order_by('-created_at')
        serializer = LocationSerializer(obj, many=True)
        return Response(serializer.data)