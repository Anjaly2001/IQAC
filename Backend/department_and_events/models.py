import os
from django.db import models
from django.utils.text import slugify
import datetime
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


class Academic_year(models.Model):
    location = models.ForeignKey(
        Location, on_delete=models.CASCADE, related_name='cam')
    start_date = models.DateField()
    end_date = models.DateField()
    label = models.CharField(max_length=9, null=False)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='creat')
    created_on = models.DateTimeField(auto_now_add=True)


class Tag(models.Model):
    name = models.CharField(max_length=250, unique=True)
    description = models.TextField()


class Event_type(models.Model):
    title = models.CharField(max_length=250, unique=True)
    description = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created')
    created_on = models.DateTimeField(auto_now_add=True)


class Event_Register(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='locate')
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='dpt')
    event_title = models.CharField(max_length=350)
    description = models.TextField()
    no_of_activities = models.IntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    # venue = models.TextField(max_length=250)
    academic_year = models.ForeignKey(Academic_year, on_delete=models.CASCADE, related_name='year')
    event_type = models.ForeignKey(Event_type, on_delete=models.CASCADE, related_name='event')
    tags = models.ManyToManyField(Tag, related_name='events', blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='c', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)


class Activity(models.Model):
    event = models.ForeignKey(Event_Register, on_delete=models.CASCADE)
    activity_title = models.CharField(max_length=350)
    activity_description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    venue = models.TextField(max_length=250)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)


class Collaborators(models.Model):
    event = models.ForeignKey(Event_Register, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='deptmt')
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='loca')
    staffs = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user')


def custom_upload_to(instance, filename):
    # Use slugify to create a safe directory name based on the event title
    event_title_slug = slugify(instance.event.event_title)
    upload_path = os.path.join(event_title_slug, filename)
    return upload_path


class Proposal_Upload(models.Model):
    event = models.ForeignKey(Event_Register, on_delete=models.CASCADE, related_name='proposal_files', null=True)
    file = models.FileField(upload_to='proposal_files/', null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)


class Role(models.Model):
    users = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=(
        ('viewers', 'Viewers'),
        ('departmentHOD', 'DepartmentHOD'),
        ('IQACuser', 'IQACUser'),
        ('staffs', 'Staffs'),
    ), default='staffs')
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    status = models.BooleanField(default=True)


class EventStatus(models.Model):
    event = models.ForeignKey(Event_Register, on_delete=models.CASCADE)
    STATUS_CHOICES = [
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ]
    status = models.CharField(max_length=250, choices=STATUS_CHOICES, default='pending')
    comments = models.CharField(max_length=250)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='staff', null=False)
    created_at = models.DateTimeField(auto_now_add=True)
   

class EventReport(models.Model):
    event = models.ForeignKey(Event_Register, on_delete=models.CASCADE)
    blog_link= models.TextField(null = True)
    target_audience = models.TextField(null = True)
    external_members_or_agencies_with_affiliation = models.TextField(null = True)
    website_contact_of_external_members = models.TextField(null = True)
    organizing_committee_details = models.TextField(null = True)
    no_of_student_volunteers = models.TextField(null = True)
    no_of_attendees_or_participants = models.TextField(null = True)

class EventReportFileUpload(models.Model):
    event = models.ForeignKey(Event_Register, on_delete=models.CASCADE)
    poster = models.FileField(upload_to=custom_upload_to, blank=True, null=True)
    brochure = models.FileField(upload_to=custom_upload_to, blank=True, null=True)
    detailed_report = models.FileField(upload_to=custom_upload_to, blank=True, null=True)
    photographs = models.FileField(upload_to=custom_upload_to, blank=True, null=True)
    registration_list = models.FileField(upload_to=custom_upload_to, blank=True, null=True)
    certificate_participants = models.FileField(upload_to=custom_upload_to, blank=True, null=True)
    certificate_winners = models.FileField(upload_to=custom_upload_to,  blank=True, null=True)
    proposal = models.FileField(upload_to=custom_upload_to, blank=True, null=True)
    budget = models.FileField(upload_to=custom_upload_to, blank=True, null=True)
    email_communication = models.FileField(upload_to=custom_upload_to, blank=True, null=True)

class EventReportFinal(models.Model):
    summary_of_the_overall_event = models.TextField()
    outcomes = models.TextField()


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
    event = models.ForeignKey(Event_Register, on_delete=models.CASCADE)
    status = models.CharField(max_length=250, choices=STATUS_CHOICES, default='pending')
    comments = models.TextField(blank=True)

    def __str__(self):
        return f"Report Status: {self.status} for {self.report}"
    


#
# # Create your models here.
# class Department(models.Model):
#     TYPE_CHOICES = [
#         ('department', 'Department'),
#         ('club', 'Club'),
#         ('center', 'Center'),
#     ]
#     department_name = models.CharField(unique=True,max_length=250)
#     type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='created')
#     is_active = models.BooleanField(default=True)
#     created_on = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now_add=True)


# class Department_head(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE,related_name= 'users')
#     department = models.ForeignKey(Department,on_delete=models.CASCADE, related_name= 'dept',null=True)
#     created_by = models.ForeignKey(User,on_delete=models.CASCADE, related_name= 'created_by')
#     created_on = models.DateTimeField(auto_now_add=True)
#     updated_by = models.ForeignKey(User,on_delete=models.CASCADE, related_name = 'updated_by')
#     updated_on = models.DateTimeField(auto_now_add=True)
#     is_active = models.BooleanField(default=True)

#     def __str__(self):
#         return f"Department Head: {self.user.username}"


# class User_department_map(models.Model):
#     user= models.ForeignKey(User,on_delete=models.CASCADE, related_name= 'user')
#     department = models.ForeignKey(Department, on_delete= models.CASCADE, related_name='department')
#     is_active = models.BooleanField(default= True)


# class Event(models.Model):
#     department = models.ForeignKey(Department, on_delete= models.CASCADE, related_name='dpt')
#     event_title = models.CharField(max_length=350)
#     no_of_activities = models.IntegerField()
#     start_date = models.DateTimeField()
#     end_date = models.DateTimeField()
#     venue = models.TextField(max_length=250)
#     academic_year = models.TextField(max_length=10)
#     event_type =models.TextField(max_length=250)
#     created_by = models.ForeignKey(User,on_delete=models.CASCADE, related_name= 'c')
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at =  models.DateTimeField(auto_now_add=True)

# class Activity(models.Model):
#     event = models.ForeignKey(Event, on_delete= models.CASCADE)
#     activity_title = models.CharField(max_length=350)
#     activity_description = models.TextField()
#     activity_date = models.DateTimeField()
#     venue = models.TextField(max_length=250)
#     created_by = models.ForeignKey(User,on_delete=models.CASCADE, related_name='usr')
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now_add=True)


# def custom_upload_to(instance, filename):
#     # Use slugify to create a safe directory name based on the event title
#     event_title_slug = slugify(instance.event.event_title)
#     upload_path = os.path.join(event_title_slug, filename)
#     return upload_path

# class EventReport(models.Model):
#     event = models.ForeignKey(Event, on_delete= models.CASCADE, related_name='events')
#     # brochure = models.ImageField(upload_to=custom_upload_to, blank=True)
#     external_speakers = models.FileField(upload_to=custom_upload_to)
#     # photographs = models.ImageField(upload_to='photographs/%Y')
#     # blogPostPrintout = models.ImageField(upload_to='external_speakers/%Y/%m')
#     registration_list = models.FileField(upload_to=custom_upload_to)
#     list_of_attendees = models.FileField(upload_to=custom_upload_to)
#     details_of_external_attendees = models.FileField(upload_to=custom_upload_to)
#     list_of_all_participants_and_winners_list= models.FileField(upload_to=custom_upload_to)
#     list_of_students_volunteers = models.FileField(upload_to=custom_upload_to)
#     sample_certificates_of_participants_or_attendees = models.FileField(upload_to=custom_upload_to)
#     sample_certificates_of_winners = models.FileField(upload_to=custom_upload_to)
#     proposal_or_planning_documents = models.FileField(upload_to=custom_upload_to)
#     budgets = models.FileField(upload_to=custom_upload_to)
#     printout_of_email_communication= models.FileField(upload_to=custom_upload_to)
#     feedback = models.FileField(upload_to=custom_upload_to)
#     # def __str__(self):
#     #     return self

# class Photographs(models.Model):
#     image = models.FileField(upload_to=custom_upload_to)
#     event_report = models.ForeignKey(EventReport, on_delete=models.CASCADE, related_name='photographs')
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

# class BlogPost(models.Model):
#     image = models.FileField(upload_to=custom_upload_to)
#     event_report = models.ForeignKey(EventReport, on_delete=models.CASCADE, related_name='blog_posts')
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

# class Brochure(models.Model):
#     image = models.FileField(upload_to=custom_upload_to)
#     event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='brochures')
#     event_report = models.ForeignKey(EventReport, on_delete=models.CASCADE, related_name='brochure')
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)


# class ReportStatus(models.Model):
#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('approved_by_department', 'Approved_by_Department'),
#         ('approved_by_IQAC', 'Approved_by_IQAC'),
#         ('rejected_by_department', 'Rejected_by_Department'),
#         ('rejected_by_IQAC', 'Rejected_by_IQAC'),
#         ('report_send_to_department', 'Report_send_to_Department'),
#         ('report_send_to_IQAC', 'Report_send_to_IQAC')
# ]
#     report = models.ForeignKey(EventReport, on_delete=models.CASCADE)
#     status = models.CharField(max_length=250, choices=STATUS_CHOICES, default='pending')
#     comments = models.TextField(blank=True)

#     def __str__(self):
#         return f"Report Status: {self.status} for {self.report}"

# class EventOwners(models.Model):
#     event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='event_owners')
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='person')
#     created_by = models.ForeignKey(User,on_delete=models.CASCADE, related_name='cr')
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
