
# from .serializers import generate_otp
from .models import OTP
from django.core.mail import send_mail
from django.conf import settings
import random
import string
from .models import User
# def generate_otp():
#     return ''.join(random.choices(string.digits, k=6))

# def send_otp_to_email(user):
#     otp_code = generate_otp()
#     print(user)
#     otp_instance, created = OTP.objects.get_or_create(user=user)
#     otp_instance.code = otp_code
#     otp_instance.save()
#     subject = 'Your OTP Code for account verification'
#     message = f'Your OTP code is {otp_code}. It is valid for 5 minutes.'
#     from_email = settings.EMAIL_HOST_USER
#     recipient_list = [user.email]
#     print(user.email)
#     send_mail(subject, message, from_email, recipient_list)
#     user_obj = User.objects.filter(email= user.email)
#     user_obj.otp = otp_code
#     user_obj.save()






def generate_otp():
    return ''.join(random.choices(string.digits, k=6))

# def send_otp_to_email(user):
#     otp_code = generate_otp()
#     otp_instance, created = OTP.objects.get_or_create(user=user)
#     otp_instance.code = otp_code
#     otp_instance.save()

#     subject = 'Your OTP Code'
#     message = f'Your OTP code is {otp_code}.'
#     from_email = settings.EMAIL_HOST_USER
#     recipient_list = [user.email]
#     print(user.username)
#     print(user.email)
#     print(f'Sending OTP {otp_code} to {user.email}')

#     send_mail(subject, message, from_email, recipient_list)

#     print(f'Email sent to {user.email}')
def send_otp_to_email(email):
    user = User.objects.get(email=email)
    
    otp_code = generate_otp()
    otp_instance, created = OTP.objects.get_or_create(user=user)
    otp_instance.code = otp_code
    otp_instance.save()

    subject = 'Your OTP Code'
    message = f'Your OTP code is {otp_code}.'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [user.email]  # Send to user's email

    print(f'Sending OTP {otp_code} to {user.username} ({user.email})')
    send_mail(subject, message, from_email, recipient_list)

    print(f'Email sent to {user.email}')











    # send_mail(subject, message, from_email, recipient_list)

# import logging
#
# logger = logging.getLogger(__name__)
#
# def send_otp_to_email(user):
#     otp_code = generate_otp()
#     OTP.objects.create(user=user, code=otp_code)
#     subject = 'Your OTP Code for account verification'
#     message = f'Your OTP code is {otp_code}. It is valid for 5 minutes.'
#     from_email = settings.EMAIL_HOST_USER
#     recipient_list = [user.email]
#
#     try:
#         send_mail(subject, message, from_email, recipient_list)
#         logger.info(f'OTP sent to {user.email}')
#     except Exception as e:
#         logger.error(f'Failed to send OTP to {user.email}: {e}')
