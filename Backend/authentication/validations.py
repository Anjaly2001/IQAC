import re

from django.forms import ValidationError

def validate_phone_number(phone_number):
    pattern = r'^[6-9]\d{9}$'
    if not phone_number.isdigit() or len(phone_number) != 10:
        raise ValidationError('Invalid phone number')
    return True
    
# def validate_phone_number(phone_number):
#     if phone_number is None:
#         raise ValueError("Phone number cannot be empty.")  # Handle None phone number

#     if not phone_number.isdigit() or len(phone_number) != 10:
#         raise ValueError("Phone number must be a 10-digit numeric value.")


def validate_email_format(email):
    return re.match(r".+@christuniversity\.in$", email)



