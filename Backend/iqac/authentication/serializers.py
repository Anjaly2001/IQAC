from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import OTP, UserProfile
from .emails import  send_otp_to_email


from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.models import User


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    # otp = serializers.CharField(write_only=True, required=False)

    def validate(self, data):
        email = data.get("email").lower()
        otp = data.get("otp")

        try:
            user = User.objects.get(username=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("No user found with this email.")

        if otp:
            try:
                otp_obj = OTP.objects.get(user=user, code=otp)
                if otp_obj.is_valid():
                    data["user"] = user
                else:
                    raise serializers.ValidationError("OTP is expired or invalid.")
            except OTP.DoesNotExist:
                raise serializers.ValidationError("Invalid OTP.")
        else:
            send_otp_to_email(user)
            raise serializers.ValidationError("OTP sent to your email. Please verify.")

        return data
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']
        # extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            # password=validated_data['password']
        )
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ['emp_id', 'department', 'role', 'ph']

    def create(self, validated_data):
        user = self.context['user']
        validated_data['user'] = user  # Associate user with the profile
        return UserProfile.objects.create(**validated_data)

