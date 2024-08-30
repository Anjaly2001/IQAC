

from django.contrib.auth import login, logout
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser, User_profile
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from .models import Department
from .serializers import UserRegistrationSerializer, USerProfileSerializer, LoginSerializer
import csv
from django.core.files.storage import default_storage
from .emails import send_email, send_otp_to_email
from datetime import timedelta
from .models import OTP, Location
from django.utils import timezone

import csv
import re
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


# from datetime import timedelta

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
       
        data = request.data.copy()
        data['role'] = 'staffs'
        data['is_superuser'] =  False
        data['is_staff'] = False
        dep=request.data.get('department')
        loc = request.data.get('location')
        country_code = request.data.get('country_code')

        if dep=='others':
            dep1 = request.data.get('new_department')
            depObj=Department.objects.create(name=dep1)
            data_user_profile = {
                'emp_id':request.data.get('emp_id'),
                'country_code':country_code,
                'ph': request.data.get('ph'),                                                                  
                'department': depObj.id,
                'location':loc,
            } 
        else:
            data_user_profile = {
                'emp_id':request.data.get('emp_id'),
                'ph': request.data.get('ph'),
                'country_code':country_code,
                'department': dep,
                'location':loc,
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
                email = request.data.get('email')
                if email:
                    print(email)
                    user = CustomUser.objects.get(email=email)
                    print(user.role)
                    send_email(email)

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
    # if not email.contains('@christuniversity.in'):
    #     return Response({'you are not authorised to login'})
    if '@christuniversity.in' not in email:
        return Response({'error': 'You are not authorized to login.'}, status=status.HTTP_401_UNAUTHORIZED)
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
        


def get_department_id(department_name):
    try:
        department = Department.objects.get(name=department_name)
        return department.id
    except Department.DoesNotExist:
        return None

def get_location_id(location_name):
    try:
        location = Location.objects.get(campus=location_name)
        return location.id
    except Location.DoesNotExist:
        return None

def validate_email_format(email):
    return re.match(r".+@christuniversity\.in$", email)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def multiple_user_registration(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Handle file upload
    file = request.FILES['file']
    file_name = default_storage.save('temp.csv', ContentFile(file.read()))

    error_rows = []
    success_rows = []

    # Parse CSV and save data
    with default_storage.open(file_name, mode='r') as csvfile:
        reader = csv.DictReader(csvfile)

        for row in reader:
            email = row['email']
            
            if not validate_email_format(email):
                row['error'] = "Invalid email format"
                error_rows.append(row)
                continue

            if CustomUser.objects.filter(email=email).exists():
                row['error'] = "User already exists"
                error_rows.append(row)
                continue

             # Validate phone number based on country code
            phone_number = row['ph']
            country_code = row.get('country_code')
            error_message = ""

            # if not validate_ph(phone_number, country_code):
            #     error_message += f"Invalid phone number for country code {country_code}. "

            department_id = get_department_id(row['department'])
            location_id = get_location_id(row['location'])

            error_message = ""
            if not department_id:
                error_message += "Department not found"
            if not location_id:
                if error_message:
                    error_message += " and Location not found"
                else:
                    error_message += "Location not found"

            if error_message:
                row['error'] = error_message
                error_rows.append(row)
                continue

            user_data = {
                'email': email,
                'username': row['username'],
                'role': 'staffs'
            }

            user_serializer = UserRegistrationSerializer(data=user_data)

            if user_serializer.is_valid():
                user = user_serializer.save()

                profile_data = {
                    'user': user.id,
                    'emp_id': row['emp_id'],
                    'country_code':row['country_code'],
                    'phone_number': row['ph'],
                    'department': department_id,
                    'location': location_id
                }

                profile_serializer = USerProfileSerializer(data=profile_data)

                if profile_serializer.is_valid():
                    profile_serializer.save()

                    success_row = {
                        'email': email,
                        'username': row['username'],
                        'emp_id': row['emp_id'],
                        'country_code':row['country_code'],
                        'ph': row['ph'],
                        'department': row['department'],
                        'location': row['location']
                    }
                    success_rows.append(success_row)
                else:
                    row['error'] = profile_serializer.errors
                    error_rows.append(row)
            else:
                row['error'] = user_serializer.errors
                error_rows.append(row)

    success_file_url = None
    error_file_url = None

    if success_rows:
        success_file_name = 'success_report.csv'
        success_file_path = default_storage.path(success_file_name)
        with open(success_file_path, mode='w', newline='') as success_file:
            fieldnames = list(success_rows[0].keys())
            writer = csv.DictWriter(success_file, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(success_rows)
        # Send email if success
        for success_row in success_rows:
            email = success_row['email']
            send_email(email)
        success_file_url = default_storage.url(success_file_name)

    if error_rows:
        error_file_name = 'error_report.csv'
        error_file_path = default_storage.path(error_file_name)
        with open(error_file_path, mode='w', newline='') as error_file:
            fieldnames = list(error_rows[0].keys())
            writer = csv.DictWriter(error_file, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(error_rows)

        error_file_url = default_storage.url(error_file_name)

    response_data = {
        "status": "success",
        "success_file_url": success_file_url,
        "error_file_url": error_file_url,
    }

    return Response(response_data, status=status.HTTP_201_CREATED)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def csv_user_view(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="users.csv"'

    writer = csv.writer(response)
    
    # Write the header row in the CSV
    writer.writerow(['Username', 'Email', 'Role', 'Employee ID', 'Phone', 'Department', 'Location'])

    # Fetch user data along with the related profile data
    users = CustomUser.objects.select_related('user_profile').all()

    for user in users:
        profile = user.user_profile
        writer.writerow([
            user.username,
            user.email,
            user.role,
            profile.emp_id,
            profile.ph,
            profile.department.name if profile.department else '',  # Fetch department name
            profile.location.campus if profile.location else ''  # Fetch location campus name
        ])

    return response


#______________USER LIST API__________
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_list(request):
    users = User_profile.objects.select_related('user', 'department', 'location').all()
    
    # Creating a list of dictionaries with the required fields
    user_data = []
    for profile in users:
        user_data.append({
            'id':profile.user.id,
            'username': profile.user.username,
            'emp_id': profile.emp_id,
            'email': profile.user.email,
            'campus': profile.location.campus,  # Assuming 'campus' is a field in the Location model
            'department': profile.department.name,  # Assuming 'name' is a field in the Department model
            'status': profile.user.is_active,
        })
    
    return Response(user_data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_deactivate(request,id):
    if request.method == 'POST':
        user = get_object_or_404(CustomUser, id=id)
        user.is_active = not user.is_active
        user.save()
        serializer = UserRegistrationSerializer(user)
        return Response({'data': serializer.data, "message": "User status updated successfully."},status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def user_delete(request,id):
    if request.method == 'DELETE':
        user = CustomUser.objects.get(id = id)
        user.delete()
        return Response("User deleted successfully")
    

    
# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])  
# def user_update(request,id):
#     if request.method == 'PUT':
#         user = CustomUser