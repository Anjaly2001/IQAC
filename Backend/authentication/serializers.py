# from rest_framework import serializers
# from django.contrib.auth.models import User
# from django.contrib.auth import authenticate

# # serializers.py

# from rest_framework import serializers
# from django.contrib.auth.models import User
# from .models import OTP, UserProfile
# from .emails import  send_otp_to_email


# from rest_framework import serializers
# from .models import UserProfile
# from django.contrib.auth.models import User


# class UserLoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     # otp = serializers.CharField(write_only=True, required=False)

#     def validate(self, data):
#         email = data.get("email").lower()
#         otp = data.get("otp")

#         try:
#             user = User.objects.get(username=email)
#         except User.DoesNotExist:
#             raise serializers.ValidationError("No user found with this email.")

#         if otp:
#             try:
#                 otp_obj = OTP.objects.get(user=user, code=otp)
#                 if otp_obj.is_valid():
#                     data["user"] = user
#                 else:
#                     raise serializers.ValidationError("OTP is expired or invalid.")
#             except OTP.DoesNotExist:
#                 raise serializers.ValidationError("Invalid OTP.")
#         else:
#             send_otp_to_email(user)
#             raise serializers.ValidationError("OTP sent to your email. Please verify.")

#         return data
    


# from rest_framework import serializers
# from django.contrib.auth.models import User
# from .models import UserProfile

# from rest_framework import serializers
# from django.contrib.auth.models import User
# from .models import UserProfile

# class RegisterSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField()
#     username = serializers.CharField(max_length=150)
#     emp_id = serializers.IntegerField()
#     department = serializers.CharField(max_length=100)
#     ph = serializers.CharField(max_length=15)
#     role = serializers.ChoiceField(choices=UserProfile._meta.get_field('role').choices, default='staffs')
    

#     class Meta:
#         model = User
#         fields = ['username', 'email', 'emp_id', 'department', 'ph','role']

#     def validate_email(self, value):
#         if User.objects.filter(email=value).exists():
#             raise serializers.ValidationError("This email is already in use.")
#         return value

#     def validate_emp_id(self, value):
#         if UserProfile.objects.filter(emp_id=value).exists():
#             raise serializers.ValidationError("This employee ID is already in use.")
#         return value

#     def create(self, validated_data):
#         user_data = {
#             'username': validated_data['username'],
#             'email': validated_data['email']
#         }

#         user = User.objects.create(**user_data)

#         # Creating UserProfile with a fixed role of 'user'
#         UserProfile.objects.create(
#             user=user,
#             emp_id=validated_data['emp_id'],
#             department=validated_data['department'],
#             role=validated_data.get('role', 'staffs'),
#             ph=validated_data['ph']
#         )

#         return user
# # ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser,User_profile
from rest_framework_simplejwt.tokens import RefreshToken 
from .models import Department

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email','role','last_login','date_joined','is_staff','is_superuser']

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['username'],
            # emp_id = validated_data['emp_id'],
            # is_superuser=validated_data['is_superuser'],
            # is_staff=validated_data['is_staff'],
            role=validated_data['role']
        )
        user.save()
        return user
    
class USerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_profile
        fields = ['user','emp_id','ph','department']


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)

            if not user:
                raise serializers.ValidationError('Invalid login credentials')

            if not user.is_active:
                raise serializers.ValidationError('User is disabled')

            data['user'] = user
        else:
            raise serializers.ValidationError('Must include "email" and "password".')

        return data

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def create(self, validated_data):
        user = validated_data['user']
        tokens = self.get_tokens_for_user(user)
        return {
            'user': user,
            'tokens': tokens
        }
    

class ReadCSVSerializer(serializers.Serializer):
    file = serializers.FileField()


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'