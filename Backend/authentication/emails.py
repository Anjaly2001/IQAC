
# from .serializers import generate_otp
from datetime import *
from django.utils import timezone
from .models import OTP
from django.core.mail import send_mail
from django.conf import settings
import random
import string
from .models import CustomUser



def generate_otp():
    return ''.join(random.choices(string.digits, k=6))


def send_otp_to_email(email):
    user = CustomUser.objects.get(email=email)
    otp_code = generate_otp()
    otp_instance, created = OTP.objects.get_or_create(user=user)
    otp_instance.code = otp_code
    otp_instance.created_at = timezone.now() 
    otp_instance.save()

    subject = 'Your OTP Code'
    message = f'Your OTP code is {otp_code}.'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [user.email]  # Send to user's email

    print(f'Sending OTP {otp_code} to {user.username} ({user.email})')
    send_mail(subject, message, from_email, recipient_list)

    print(f'Email sent to {user.email}')



def send_email(email):
    user = CustomUser.objects.get(email=email)
    subject = 'Successfully Registered in IQAC '
    message = f'WELCOME { email}.'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [user.email]  # Send to user's email
    # print(f'Sending OTP to {user.username} ({user.email})')
    send_mail(subject, message, from_email, recipient_list)

    print(f'Email sent to {user.email}')

# def send_event_register(email):
#     try:
#         # Fetch the user using the provided email
#         user = CustomUser.objects.get(email=email)
        
#         # Email subject and message
#         subject = 'Successfully Registered in IQAC'
#         message = f'WELCOME {user.username}, you have successfully registered in IQAC.'
        
#         # Email settings
#         from_email = settings.EMAIL_HOST_USER
#         recipient_list = [user.email]  
        
#         # Print message to indicate email sending process
#         print(f'Sending event registration confirmation to {user.username} ({user.email})')
        
#         # Send email
#         send_mail(subject, message, from_email, recipient_list)
        
#         # Confirmation message after sending email
#         print(f'Email sent successfully to {user.email}')
    
#     except CustomUser.DoesNotExist:
#         print(f'User with email {email} does not exist.')
#     except Exception as e:
#         print(f'Error sending email: {str(e)}')


def send_event_register(email_list):
    subject = 'Successfully Registered in IQAC'
    message = 'Your event has been successfully registered.'
    from_email = settings.EMAIL_HOST_USER
    
    print(f"Preparing to send email to: {email_list}")  # Log email list
    
    try:
        send_mail(subject, message, from_email, email_list)
        print(f"Email sent to: {email_list}")  # Log successful sending
    except Exception as e:
        print(f"Error sending email: {e}")  # Log any exceptions
        raise e

