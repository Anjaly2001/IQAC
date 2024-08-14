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
    
class Location(models.Model):
    # CAMPUS = [
    #     ('Banglore Central Campus', 'banglore central campus'),
    #     ('Banglore Bannerghatta Campus', 'banglore bannerghatta campus'),
    #     ('Banglore Kangeri Campus', 'banglore kangeri campus'),
    #     ('Banglore Yeshwanthpur Campus', 'banglore yeshwanthpur campus'),
    #     ('Delhi NCR Campus', 'delhi ncr campus'),
    #     ('Pune Lavasa Campus', 'pune lavasa campus'),
    #     ('Others', 'others'),
    # ]
    campus = models.CharField(max_length=200)
    logo = models.ImageField(null = True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(CustomUser,on_delete=models.CASCADE, related_name = 'created_by')
    
class Department(models.Model):
    TYPE_CHOICES = [
        ('Department', 'department'),
        ('Club', 'club'),
        ('Center', 'Center'),
        ('Ofice', 'office'),
        ('Cell', 'cell'),
        ('Others', 'others'),
    ]
    name = models.CharField(unique=True,max_length=250)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='others')
    description = models.CharField(max_length=250,null = True)
    location = models.ForeignKey(Location,on_delete=models.CASCADE, related_name = 'loc', null = True)
    is_active = models.BooleanField(default=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)


    
class User_profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    emp_id = models.IntegerField(unique=True)
    ph = models.CharField(max_length=15)
    department =  models.ForeignKey(Department,on_delete=models.CASCADE, related_name= 'dept')
    location = models.ForeignKey(Location,on_delete=models.CASCADE, related_name= 'camp', null=True)
   

    def __str__(self):
        return f"{self.user.username}'s Profile"
    
class OTP(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)



