# from django.core.mail import send_mail
# from django.conf import settings
# from .models import Department_head, User_department_map
# from django.contrib.auth.models import User
# from django.core.mail import EmailMessage
# from datetime import timedelta
# def send_event_notification(event,mail_list):
#     subject = f'New Event Registered: {event.event_title}'
#     report_submission_date = event.start_date + timedelta(days=6)
#     message = f'A new event has been registered.\n\nTitle: {event.event_title}\nDate: {event.start_date}\nVenue: {event.venue}\nDepartment: {event.department.department_name}\nCreated_by: {event.created_by},\nReport Submission: {report_submission_date}'
#     from_email = settings.EMAIL_HOST_USER
#     recipient_list = mail_list['to']
#     cc = mail_list['cc']

#     email = EmailMessage(
#         subject,
#         message,
#         from_email,
#         [recipient_list],
#         cc,
#         headers={'Reply-To': from_email}
#     )
#     email.send()