
# from .serializers import generate_otp
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
    otp_instance.save()

    subject = 'Your OTP Code'
    message = f'Your OTP code is {otp_code}.'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [user.email]  # Send to user's email

    print(f'Sending OTP {otp_code} to {user.username} ({user.email})')
    send_mail(subject, message, from_email, recipient_list)

    print(f'Email sent to {user.email}')








