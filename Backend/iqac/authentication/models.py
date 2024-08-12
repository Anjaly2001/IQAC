from django.db import models
from django.db import models
from django.contrib.auth.models import User


class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)


# users/models.py

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    emp_id = models.IntegerField(unique=True)
    department = models.CharField(max_length=100)
    role = models.CharField(max_length=50)
    ph = models.CharField(max_length=15)

    def __str__(self):
        return self.user.username