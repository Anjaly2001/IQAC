from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser,User_profile
from rest_framework_simplejwt.tokens import RefreshToken 
from .models import Department, Location

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

        # def validate_department(self, value):
        # # Check if the input is a primary key (integer)
        #     if isinstance(value, int):
        #         try:
        #             return Department.objects.get(pk=value)
        #         except Department.DoesNotExist:
        #             raise serializers.ValidationError('Department with this ID does not exist.')
            
        #     # If not a primary key, handle the "Other" case or validate the department name
        #     if value.lower() == 'other':
        #         # Retrieve the custom department name from the request data
        #         custom_department_name = self.context['request'].data.get('custom_department_name')
        #         if not custom_department_name:
        #             raise serializers.ValidationError('Custom department name is required when "Other" is selected.')
        #         # Create or get the department
        #         department, created = Department.objects.get_or_create(name=custom_department_name)
        #         return department  # Return the department instance
        #     else:
        #         # Return the existing department if not "Other" and not a primary key
        #         try:
        #             return Department.objects.get(name=value)
        #         except Department.DoesNotExist:
        #             raise serializers.ValidationError('Selected department does not exist.')

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


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
        # ['id','campus', 'logo', 'created_by']
        # read_only_fields = ['created_by']  # Prevent direct modification

