import os

from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


# Create your models here.
class Department(models.Model):
    TYPE_CHOICES = [
        ('department', 'Department'),
        ('club', 'Club'),
        ('center', 'Center'),
    ]
    department_name = models.CharField(unique=True,max_length=250)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='created')
    is_active = models.BooleanField(default=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)


class Department_head(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name= 'users')
    department = models.ForeignKey(Department,on_delete=models.CASCADE, related_name= 'dept',null=True)
    created_by = models.ForeignKey(User,on_delete=models.CASCADE, related_name= 'created_by')
    created_on = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User,on_delete=models.CASCADE, related_name = 'updated_by')
    updated_on = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Department Head: {self.user.username}"


class User_department_map(models.Model):
    user= models.ForeignKey(User,on_delete=models.CASCADE, related_name= 'user')
    department = models.ForeignKey(Department, on_delete= models.CASCADE, related_name='department')
    is_active = models.BooleanField(default= True)


class Event(models.Model):
    department = models.ForeignKey(Department, on_delete= models.CASCADE, related_name='dpt')
    event_title = models.CharField(max_length=350)
    no_of_activities = models.IntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    venue = models.TextField(max_length=250)
    academic_year = models.TextField(max_length=10)
    event_type =models.TextField(max_length=250)
    created_by = models.ForeignKey(User,on_delete=models.CASCADE, related_name= 'c')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at =  models.DateTimeField(auto_now_add=True)

class Activity(models.Model):
    event = models.ForeignKey(Event, on_delete= models.CASCADE)
    activity_title = models.CharField(max_length=350)
    activity_description = models.TextField()
    activity_date = models.DateTimeField()
    venue = models.TextField(max_length=250)
    created_by = models.ForeignKey(User,on_delete=models.CASCADE, related_name='usr')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)


def custom_upload_to(instance, filename):
    # Use slugify to create a safe directory name based on the event title
    event_title_slug = slugify(instance.event.event_title)
    upload_path = os.path.join(event_title_slug, filename)
    return upload_path

class EventReport(models.Model):
    event = models.ForeignKey(Event, on_delete= models.CASCADE, related_name='events')
    # brochure = models.ImageField(upload_to=custom_upload_to, blank=True)
    external_speakers = models.FileField(upload_to=custom_upload_to)
    # photographs = models.ImageField(upload_to='photographs/%Y')
    # blogPostPrintout = models.ImageField(upload_to='external_speakers/%Y/%m')
    registration_list = models.FileField(upload_to=custom_upload_to)
    list_of_attendees = models.FileField(upload_to=custom_upload_to)
    details_of_external_attendees = models.FileField(upload_to=custom_upload_to)
    list_of_all_participants_and_winners_list= models.FileField(upload_to=custom_upload_to)
    list_of_students_volunteers = models.FileField(upload_to=custom_upload_to)
    sample_certificates_of_participants_or_attendees = models.FileField(upload_to=custom_upload_to)
    sample_certificates_of_winners = models.FileField(upload_to=custom_upload_to)
    proposal_or_planning_documents = models.FileField(upload_to=custom_upload_to)
    budgets = models.FileField(upload_to=custom_upload_to)
    printout_of_email_communication= models.FileField(upload_to=custom_upload_to)
    feedback = models.FileField(upload_to=custom_upload_to)
    # def __str__(self):
    #     return self

class Photographs(models.Model):
    image = models.FileField(upload_to=custom_upload_to)
    event_report = models.ForeignKey(EventReport, on_delete=models.CASCADE, related_name='photographs')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class BlogPost(models.Model):
    image = models.FileField(upload_to=custom_upload_to)
    event_report = models.ForeignKey(EventReport, on_delete=models.CASCADE, related_name='blog_posts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Brochure(models.Model):
    image = models.FileField(upload_to=custom_upload_to)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='brochures')
    event_report = models.ForeignKey(EventReport, on_delete=models.CASCADE, related_name='brochure')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



class ReportStatus(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved_by_department', 'Approved_by_Department'),
        ('approved_by_IQAC', 'Approved_by_IQAC'),
        ('rejected_by_department', 'Rejected_by_Department'),
        ('rejected_by_IQAC', 'Rejected_by_IQAC'),
        ('report_send_to_department', 'Report_send_to_Department'),
        ('report_send_to_IQAC', 'Report_send_to_IQAC')
]
    report = models.ForeignKey(EventReport, on_delete=models.CASCADE)
    status = models.CharField(max_length=250, choices=STATUS_CHOICES, default='pending')
    comments = models.TextField(blank=True)

    def __str__(self):
        return f"Report Status: {self.status} for {self.report}"

class EventOwners(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='event_owners')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='person')
    created_by = models.ForeignKey(User,on_delete=models.CASCADE, related_name='cr')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)