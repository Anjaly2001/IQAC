from django.urls import path

from .views import user_register, user_token_refresh, user_logout, login_with_email,  verify_otp

urlpatterns = [
    # path('login', user_login, name='login'),
    path('login_with_email',login_with_email,name = 'login_with_email'),
    path('verify_otp', verify_otp, name = 'verify_otp'),
    path('refresh', user_token_refresh, name='refresh'),
    path('register', user_register, name='register'),
    path('logout', user_logout, name='logout'),
]