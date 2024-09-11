from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser,User_profile
from rest_framework_simplejwt.tokens import RefreshToken 
from .models import Department, Location
import re


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','username', 'email','last_login','date_joined','is_staff','is_superuser']

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['username'],
            # emp_id = validated_data['emp_id'],
            # is_superuser=validated_data['is_superuser'],
            # is_staff=validated_data['is_staff'],
            # role=validated_data['role']
        )
        user.save()
        return user
    
    def validate(self, data):
        # Transform the data to title case
        data['username'] = data.get('username', '').title()
        # data['last_name'] = data.get('last_name', '').title()
        return data

    
class USerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_profile
        fields = ['user','emp_id','ph','department','location']
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

