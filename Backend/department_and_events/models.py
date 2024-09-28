import os
from django.db import models
from django.utils.text import slugify
import datetime
from django.conf import settings
from authentication.models import Location,Department



class Academic_year(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='cam')
    start_date = models.DateField()
    end_date = models.DateField()
    label = models.CharField(max_length=9, null=False, unique= True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='creat')
    created_on = models.DateTimeField(auto_now_add=True)


class Tag(models.Model):
    name = models.CharField(max_length=250, unique=True)
    description = models.TextField()


class Event_type(models.Model):
    title = models.CharField(max_length=250, unique=True)
    description = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created')
    created_on = models.DateTimeField(auto_now_add=True)


def custom_upload_to(instance, filename):
    # Use slugify to create a safe directory name based on the event title
    event_title_slug = slugify(instance.event.event_title)
    upload_path = os.path.join(event_title_slug, filename)
    return upload_path


class Event_Proposal(models.Model):
    event_title = models.CharField(max_length=350)
    no_of_activities = models.IntegerField(null=True)
    date_and_time = models.DateTimeField(auto_now_add=True)
    venue = models.TextField(max_length=250, null=True)
    academic_year = models.ForeignKey(Academic_year, on_delete=models.CASCADE, null=True)
    event_type = models.ForeignKey(Event_type, on_delete=models.CASCADE, null=True)
    need_analysis = models.CharField(max_length=250, null=True)
    objectives = models.CharField(max_length=250, null=True)
    expected_outcomes = models.CharField(max_length=250, null=True)
    speaker_profile = models.CharField(max_length=250, null=True)

    EVENT_CATEGORY_CHOICES = [
        ('Fest', 'Fest'),
        ('Conference', 'Conference'),
    ]
    event_category = models.CharField(max_length=50, choices=EVENT_CATEGORY_CHOICES, null=True, blank=True)
    
    remarks = models.CharField(max_length=250, null=True)
    approved_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.event_title

    def total_income(self):
        # Sum all incomes related to this event proposal
        return self.incomes.aggregate(total=models.Sum('amount'))['total'] or 0

    @property
    def total_expenditure(self):
        # Sum all expenses related to this event proposal
        return self.expenses.aggregate(total=models.Sum('amount'))['total'] or 0


class Income(models.Model):
    event_proposal = models.ForeignKey(Event_Proposal, related_name='incomes', on_delete=models.CASCADE)  # Added related_name
    particular = models.CharField(max_length=255)
    num_participants = models.PositiveIntegerField(null=True, blank=True)
    rate = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Income - {self.particular}"

    @property
    def total_amount(self):
        if self.num_participants and self.rate:
            return self.num_participants * self.rate
        return self.amount


class Expense(models.Model):
    event_proposal = models.ForeignKey(Event_Proposal, related_name='expenses', on_delete=models.CASCADE)  # Added related_name
    particular = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Expense - {self.particular}"


class Event_Register(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='locate')
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='dpt')
    event_title = models.CharField(max_length=350)
    description = models.TextField()
    no_of_activities = models.IntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
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




class Proposal_Upload(models.Model):
    event = models.ForeignKey(Event_Register, on_delete=models.CASCADE, related_name='proposal_files', null=True)
    file = models.FileField(upload_to='proposal_files/', null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)



class Role(models.Model):
    users = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='roles')
    ROLE_CHOICES = [
        ('departmentHOD', 'DepartmentHOD'),
        ('IQACuser', 'IQACUser'),
        ('staff', 'Staff'),
        # ('department','Department')
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='staffs')
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

