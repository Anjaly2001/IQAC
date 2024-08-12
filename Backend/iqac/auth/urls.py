from django.urls import path

from auth.views import user_login, user_register, user_token_refresh

urlpatterns = [
    path('login', user_login, name='login'),
    path('refresh', user_token_refresh, name='refresh'),
    path('register', user_register, name='register'),

]
