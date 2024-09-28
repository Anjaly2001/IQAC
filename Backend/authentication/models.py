from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class Location(models.Model):
    campus = models.CharField(max_length=200, unique=True)
    logo = models.ImageField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_by')


class Department(models.Model):
    TYPE_CHOICES = [
        ('Department', 'department'),
        ('Club', 'club'),
        ('Center', 'center'),
        ('Office', 'office'),
        ('Cell', 'cell'),
        ('Others', 'others'),
    ]
    name = models.CharField(max_length=250)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='others')
    description = models.CharField(max_length=250, null=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='loc')
    is_active = models.BooleanField(default=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    ROLE_CHOICES = [
        ('Admin', 'admin'),
        ('University_Viewer', 'university_viewer'),
        ('Campus_Admin', 'campus_admin'),
        ('Campus_Viewer', 'campus_viewer'),
        ('Department', 'department')
    ]

    role = models.CharField(max_length=25, choices=ROLE_CHOICES, default='Admin', null= False)
    USERNAME_FIELD = 'email'
    # PASSWORD_FIELD = 'emp_id'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    

    
class User_profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    emp_id = models.IntegerField(unique=True)
    phone_number = models.CharField(max_length=15)
    department =  models.ForeignKey(Department,on_delete=models.CASCADE, related_name= 'dept')
    location = models.ForeignKey(Location,on_delete=models.CASCADE, related_name= 'camp')
    # country_code = models.CharField(max_length=5) 

    def __str__(self):
        return f"{self.user.username}'s Profile"
    
    
class OTP(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)


