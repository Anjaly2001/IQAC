

from django.contrib.auth import login, logout
from django.forms import ValidationError
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from authentication.validations import validate_email_format, validate_phone_number
from department_and_events.models import Role
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



@api_view(['POST'])
def register(request):
    if request.method == 'POST':
       
        data = request.data.copy()
        # data['role'] = 'staffs'
        data['is_superuser'] =  False
        data['is_staff'] = False
        dep=request.data.get('department')
        loc = request.data.get('location')
        phone_number = request.data.get('ph')
        print(f"Phone number received: {phone_number}")

        try:
            validate_phone_number(phone_number)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
        if dep=='others':
            dep1 = request.data.get('new_department')
            depObj=Department.objects.create(name=dep1)
            data_user_profile = {
                'emp_id':request.data.get('emp_id'),
                'ph': request.data.get('ph'),                                                                  
                'department': depObj.id,
                'location':loc,
            } 
        else:
            data_user_profile = {
                'emp_id':request.data.get('emp_id'),
                'ph': request.data.get('ph'),
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
                    send_email(email)
                return Response({
                    'user': UserRegistrationSerializer(user).data,
                    'user_profile': USerProfileSerializer(user_profile).data,
                }, status=status.HTTP_201_CREATED)

            user.delete()
            return Response(user_profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_with_email(request):
    email = request.data.get('email')
    if '@christuniversity.in' not in email:
        return Response({'error': 'You are not authorized to login.'}, status=status.HTTP_401_UNAUTHORIZED)
    if email:
        print(email)
        user = CustomUser.objects.get(email=email)
        send_otp_to_email(email)
        return Response({'message': 'OTP sent to your email.'}, status=status.HTTP_200_OK)
    return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def verify_otp(request):
#     email = request.data.get('email')
#     otp = request.data.get('otp')

#     if email and otp:
#         user = CustomUser.objects.filter(email=email).first()
#         if not user:
#             return Response({'error': 'No user found with this email.'}, status=status.HTTP_404_NOT_FOUND)
        
        

#         otp_entry = OTP.objects.filter(user=user, code=otp)
#         if otp_entry:
#             time_difference = timezone.now() - otp_entry.created_at
#             if time_difference > timedelta(days=1):
#                 return Response({'error': 'OTP expired.'}, status=status.HTTP_400_BAD_REQUEST)
            
#             # OTP is valid, proceed with login
#             login(request, user)
#             refresh = RefreshToken.for_user(user)
#             print("gasjhudf")
#             # Check if user is superuser and staff
#             if user.is_superuser and user.is_staff:
#                 role = 'admin'
#             else:
#                 # Fetch existing role entry or create a new one with the default role
#                 role_entry = Role.objects.filter(user=user).first()
#                 if role_entry:
#                     role = role_entry.role
#                 else:
#                     # Assign a default role and department
#                     role = 'staffs'  # Or whatever default role you prefer
#                     default_department = Department.objects.first()  # Adjust as needed
#                     Role.objects.create(user=user, role=role, department=default_department)
            
#             # If the user is superuser and staff, save the admin role
#             if user.is_superuser and user.is_staff:
#                 default_department = Department.objects.first()  # Adjust as needed
#                 Role.objects.update_or_create(user=user, defaults={'role': 'admin', 'department': default_department})
            
#             return Response({
#                 "data": {
#                     'access_token': str(refresh.access_token),
#                     'refresh_token': str(refresh),
#                 },
#                 'user': user.username,
#                 'role': role,
#                 'first_name': user.first_name,
#             }, status=status.HTTP_200_OK)
        
#         return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)
    
#     return Response({'error': 'Email and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)

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
            login(request, user)
            refresh = RefreshToken.for_user(user)
            if user.is_superuser and user.is_staff:
                role = 'admin'
            else:
                # Fetch existing role entry or create a new one with the default role
                role_entry = Role.objects.filter(user=user).first()
                if role_entry:
                    role = role_entry.role
                else:
                    # Assign a default role and department
                    role = 'staffs'  # Or whatever default role you prefer
                    default_department = Department.objects.first()  # Adjust as needed
                    Role.objects.create(user=user, role=role, department=default_department)
            
            # If the user is superuser and staff, save the admin role
            # if user.is_superuser and user.is_staff:
            #     default_department = Department.objects.first()  # Adjust as needed
            #     Role.objects.update_or_create(user=user, defaults={'role': 'admin', 'department': default_department})
        
            return Response({
                "data": {
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                },
                'user': user.username,
                'role': role,
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
    total_count = 0  

    # Parse CSV and save data
    with default_storage.open(file_name, mode='r') as csvfile:
        reader = csv.DictReader(csvfile)

        for row in reader:
            total_count += 1 
            email = row['email']
            error_message = ""

            # Validate email format
            if not validate_email_format(email):
                error_message += "Invalid email format. "

            # Check if the user already exists
            if CustomUser.objects.filter(email=email).exists():
                error_message += "User already exists. "

            phone_number = row['ph'].strip()  # Clean any leading/trailing spaces
            print(f"Validating phone number: {phone_number}")  # Debugging: print phone number

            # Validate phone number
            try:
                validate_phone_number(phone_number)  # Validate cleaned phone number
            except ValidationError as e:
                error_message += str(e) + " "

            # Validate department and location
            department_id = get_department_id(row['department'])
            location_id = get_location_id(row['location'])

            if not department_id:
                error_message += "Department not found. "
            if not location_id:
                error_message += "Location not found. "

            # If there are any errors, log them and move on to the next row
            if error_message:
                row['error'] = error_message
                error_rows.append(row)
            else:
                # No errors, proceed with user registration and profile creation
                user_data = {
                    'email': email,
                    'username': row['username'],
                    'role': 'staffs'  # Set default role or modify as needed
                }

                user_serializer = UserRegistrationSerializer(data=user_data)

                if user_serializer.is_valid():
                    user = user_serializer.save()

                    profile_data = {
                        'user': user.id,
                        'emp_id': row['emp_id'],
                        'ph': phone_number,
                        'department': department_id,
                        'location': location_id
                    }

                    profile_serializer = USerProfileSerializer(data=profile_data)

                    if profile_serializer.is_valid():
                        profile_serializer.save()
                        Role.objects.create(user=user, role='staffs', department=Department.objects.first())  # Set default department or modify as needed

                        success_row = {
                            'email': email,
                            'username': row['username'],
                            'emp_id': row['emp_id'],
                            'ph': phone_number,
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

    # After processing all rows, handle success and error files
    success_file_url, error_file_url = None, None

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
        "total_count": total_count,  # Total number of users in the CSV
        "success_count": len(success_rows),  # Number of successfully registered users
        "error_count": len(error_rows),
        "success_file_url": success_file_url,
        "error_file_url": error_file_url,
    }
    return Response(response_data, status=status.HTTP_201_CREATED)


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
    # Fetch all users
    users = CustomUser.objects.all()

    # Create a list to hold the user data
    user_data = []

    # Loop through all users to gather data
    for user in users:
        # Try to get the corresponding profile, if it exists
        try:
            profile = User_profile.objects.get(user=user)
            department = profile.department.name if profile.department else None
            campus = profile.location.campus if profile.location else None
            phone_number = profile.ph
            emp_id = profile.emp_id
        except User_profile.DoesNotExist:
            # If no profile exists, set default values
            department = None
            campus = None
            phone_number = None
            emp_id = None

        user_data.append({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'emp_id': emp_id,
            'phone_number': phone_number,
            'campus': campus,
            'department': department,
            'status': user.is_active,
            'last_login': user.last_login,
            'date_joined': user.date_joined,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
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
    

    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def user_update(request, id):
    try:
        profile = User_profile.objects.get(user=id)
        user = profile.user
    except User_profile.DoesNotExist:
        return Response({"detail": "User profile not found."}, status=status.HTTP_404_NOT_FOUND)

    user_data = request.data.get('user', {}) 
    profile_data = request.data.copy() 
    user_serializer = UserRegistrationSerializer(user, data=user_data, partial=True)
    if user_serializer.is_valid():
        user_serializer.save()
    else:
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Update the User_profile data
    profile_data.pop('user', None)  
    profile_serializer = USerProfileSerializer(profile, data=profile_data, partial=True)
    if profile_serializer.is_valid():
        profile_serializer.save()
        data = {**profile_serializer.data, **user_serializer.data}
        return Response(data, status=status.HTTP_200_OK)
    else:
        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)