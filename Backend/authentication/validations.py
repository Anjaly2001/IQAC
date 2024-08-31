import re

from django.forms import ValidationError

def validate_phone_number(phone_number):
    pattern = r'^[6-9]\d{9}$'
    if not phone_number.isdigit() or len(phone_number) != 10:
        raise ValidationError('Invalid phone number')

def validate_email_format(email):
    return re.match(r".+@christuniversity\.in$", email)



