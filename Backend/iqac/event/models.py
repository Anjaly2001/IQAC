from django.db import models

# Create your models here.

class events(models.Model):
    name=models.CharField(max_length=50)
    venue=models.CharField(max_length=50)
    start_date=models.DateField()
    end_date=models.DateField()
    no_of_participants=models.IntegerField()
    