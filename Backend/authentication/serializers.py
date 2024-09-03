from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser,User_profile
from rest_framework_simplejwt.tokens import RefreshToken 
from .models import Department, Location
import re


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
        fields = ['user','emp_id','ph','department','location']

    # def validate_ph(self, value):
    #     country_code = self.initial_data.get('country_code')

    #     # Define phone number length limits based on country code
    #     country_phone_patterns = {
    #         '91': r'^\d{10}$',  # India: 10 digits
    #         '1': r'^\d{10}$',  # US: 10 digits (without country code)
    #         '44': r'^\d{11}$',  # UK: 11 digits
    #         # Add other country codes and their phone number patterns here
    #     }

    #     # Validate based on the country code
    #     if country_code in country_phone_patterns:
    #         phone_pattern = re.compile(country_phone_patterns[country_code])
    #         if not phone_pattern.match(value):
    #             raise serializers.ValidationError(f"Invalid phone number for {country_code}. Please enter a valid number.")
    #     else:
    #         raise serializers.ValidationError("Invalid country code.")
        
        # return value

    def create(self, validated_data):
        return super().create(validated_data)


    def create(self, validated_data):
        # The department field is already converted to a Department instance by validate_department
        validated_data['department'] = validated_data['department']
        return super().create(validated_data)


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

