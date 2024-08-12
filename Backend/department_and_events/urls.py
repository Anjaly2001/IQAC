# from django.contrib import admin
# from django.urls import path
# from .views import department_list, department_register,department_update,department_delete, department_head_create, department_head_list, department_head_update, department_head_delete, user_department_map_create, event_register, activity_create, activity_update, activity_delete, event_report_create, event_report_update, event_report_delete, brochure_delete, brochure_update, brochure_upload, approve_by_department,event_report_list, check_status,check_status_id, reject_by_department, approve_by_IQAC,reject_by_IQAC, list_active_departments, department_activation, list_inactive_departments, list_active_user_department_map

# urlpatterns = [
#     path('department_list/',department_list,name = 'department_list'),
#     path('department_register/',department_register,name = 'department_register'),
#     path('department_update/<int:id>/',department_update,name = 'department_update'),
#     path('department_delete/<int:id>/',department_delete,name = 'department_delete'),
#     path('department_activation/<int:id>/',department_activation, name = 'department_activation'),
#     path('list_active_departments/',list_active_departments, name = "list_active_departments"),
#     path('list_inactive_departments/',list_inactive_departments, name ='list_inactive_departments'),

#     path('department_head_create/',department_head_create, name = 'department_head_create'),
#     path('department_head_list/',department_head_list ,name ='department_head_list'),
#     path('department_head_update/<int:id>/',department_head_update, name = 'department_head_update'),
#     path('department_head_delete/<int:id>/',department_head_delete, name= 'department_head_delete'),

#     path('user_department_map_create/',user_department_map_create, name = 'user_department_map_create'),
#     path('list_active_user_department_map/',list_active_user_department_map, name ='list_active_user_department_map'),

#     path('event_register/',event_register,name='event_register'),

#     path('activity_create/',activity_create, name = 'activity_create'),
#     path('activity_update/',activity_update,name = 'activity_update'),
#     path('activity_delete/<int:id>/',activity_delete, name = 'activity_delete'),
  

#     path('event_report_create/',event_report_create, name = 'event_report_create'),
#     path('event_report_update/',event_report_update, name = 'event_report_update'),
#     path('event_report_delete/<int:id>/',event_report_delete, name = 'event_report_delete'),

#     path('brochure_upload/',brochure_upload, name = 'brochure_upload'),
#     path('brochure_update/',brochure_update, name = "brochure_update"),
#     path('brochure_delete/',brochure_delete, name = 'brochure_delete'),

#     path('approve_by_department/<int:pk>/',approve_by_department, name = 'approve_by_department'),
#     path('reject_by_department/<int:pk>/',reject_by_department, name ='reject_by_department'),
#     path('approve_by_IQAC/<int:pk>/',approve_by_IQAC, name ='approve_by_IQAC'),
#     path('reject_by_IQAC/<int:pk>/',reject_by_IQAC,name = 'reject_by_IQAC'),
#     path('event_report_list/',event_report_list, name = 'event_report_list'),
#     path('check_status/',check_status, name = 'check_status'),
#     path('check_status_id/<int:id>/',check_status_id, name ='check_status_id'),



# ]
