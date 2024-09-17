from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser,User_profile
from rest_framework_simplejwt.tokens import RefreshToken 
from .models import Department, Location
import re


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email','role', 'last_login', 'date_joined', 'is_staff', 'is_superuser']

    def create(self, validated_data):
        # Set email as username
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['email'],  # Use email as the username
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_staff=validated_data.get('is_staff', False),
            is_superuser=validated_data.get('is_superuser', False)
        )
        
        # Save the user with any additional logic you need
        user.save()
        return user

    def validate(self, data):
        # Ensure the username is converted to title case before processing
        data['username'] = data.get('email', '').lower()  # Use email as username, ensure it's lowercase
        return data



    
class USerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_profile
        fields = ['user','emp_id','phone_number','department','location']
    def create(self, validated_data):
        return super().create(validated_data)


    def create(self, validated_data):
        # The department field is already converted to a Department instance by validate_department
        validated_data['department'] = validated_data['department']
        return super().create(validated_data)
    
    # def update(self, instance, validated_data):
    #     # Update profile fields
    #     instance.emp_id = validated_data.get('emp_id', instance.emp_id)
    #     instance.ph = validated_data.get('ph', instance.ph)
    #     instance.department = validated_data.get('department', instance.department)
    #     instance.location = validated_data.get('location', instance.location)
    #     instance.save()
    #     return instance


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



        # ['id','campus', 'logo', 'created_by']
        # read_only_fields = ['created_by']  # Prevent direct modification

