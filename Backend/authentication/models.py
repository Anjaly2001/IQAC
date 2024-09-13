from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from department_and_events.models import Department,Location

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
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


