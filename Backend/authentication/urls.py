from django.urls import path
from .views import register, login_with_email, verify_otp, multiple_user_registration,user_token_refresh


urlpatterns = [
    path('login_with_email',login_with_email,name = 'login_with_email'),
    path('verify_otp', verify_otp, name = 'verify_otp'),
    path('refresh', user_token_refresh, name='refresh'),
    path('register', register, name='register'),
    # path('logout', user_logout, name='logout'),

    path('multiple_user_registration/',multiple_user_registration, name = 'multiple_user_registration'),

]