from django.urls import path
from .views import csv_user_view, register, login_with_email, user_deactivate, user_delete, user_list, user_update, verify_otp, multiple_user_registration,user_token_refresh


urlpatterns = [
    path('login_with_email',login_with_email,name = 'login_with_email'),
    path('verify_otp', verify_otp, name = 'verify_otp'),
    path('refresh', user_token_refresh, name='refresh'),
    path('register', register, name='register'),
    path('multiple_user_registration/',multiple_user_registration, name = 'multiple_user_registration'),

    path('csv_user_view/',csv_user_view, name = 'csv_user_view'),
    path('user_list/',user_list, name = 'user_list'),
    path('user_deactivate/<int:id>/',user_deactivate, name = 'user_list_deactivate'),
    path('user_delete/<int:id>/',user_delete, name = 'user_delete'),
    path('user_update/<int:id>/',user_update, name ='user_update'),
    # path('logout', user_logout, name='logout'),

    

]