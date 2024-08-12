from .views import getEvents,postEvents,deleteEvents,updateEvents
from django.urls import path

urlpatterns = [
    path('getevents/',getEvents,name='getevents'),
    path('postevents/',postEvents,name='postevents'),
    path('updateevents/',updateEvents,name='updateevents'),
    path('deleteevents/',deleteEvents,name='deletevents'),

]