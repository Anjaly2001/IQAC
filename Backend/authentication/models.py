# from django.db import models
# from django.db import models
# from django.contrib.auth.models import User


# class OTP(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     code = models.CharField(max_length=6)
#     created_at = models.DateTimeField(auto_now_add=True)


# # users/models.py

# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     emp_id = models.IntegerField(unique=True)
#     department = models.CharField(max_length=100)
#     role =  models.CharField(max_length=20, choices=(
#         ('viewers', 'Viewers'),
#         ('university_IQAC', 'University_IQAC'),
#         ('department_IQAC', 'Department_IQAC'),
#         ('staffs', 'Staffs'),    
#     ), default='staffs')
#     ph = models.CharField(max_length=15)

#     def __str__(self):
#         return self.user.username


# ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# users/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
from django.conf import settings

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    role =  models.CharField(max_length=20, choices=(
        ('viewers', 'Viewers'),
        ('university_IQAC', 'University_IQAC'),
        ('department_IQAC', 'Department_IQAC'),
        ('staffs', 'Staffs'),    
    ), default='admin')
    # emp_id = models.IntegerField(unique=True)

    USERNAME_FIELD = 'email'
    # PASSWORD_FIELD = 'emp_id'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    
class Department(models.Model):
    TYPE_CHOICES = [
        ('department', 'Department'),
        ('club', 'Club'),
        ('center', 'Center'),
        ('office', 'Office'),
        ('cell', 'Cell'),
        ('others', 'Others'),
    ]
    name = models.CharField(unique=True,max_length=250)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='created')
    is_active = models.BooleanField(default=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    
class User_profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    emp_id = models.IntegerField(unique=True)
    ph = models.CharField(max_length=15)
    department =  models.ForeignKey(Department,on_delete=models.CASCADE, related_name= 'dept')
   

    def __str__(self):
        return f"{self.user.username}'s Profile"
    
class OTP(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)



