from django.urls import path
from .views import assign_roles, campus_delete, campus_name_list, campus_update, create_academic_year, create_event_type, create_tag, delete_academic_year, delete_event_type, delete_tag, department_list_by_campus, department_list_by_user,  department_register,campus_register, campus_list, department_list, department_activation,department_update,department_delete, event_delete, event_list, event_register, event_register_status, list_academic_year, list_event_type, list_events_in_each_department, list_tag, update_academic_year, upload_proposal_files


urlpatterns = [
    path('department_register/',department_register,name = 'department_register'),
    path('department_list/',department_list, name = 'department_list'),
    path('department_activation/<int:id>/', department_activation, name=' department_activation'),
    path('department_update/<int:id>/',department_update,name = 'department_update'),
    path('department_delete/<str:id>/',department_delete, name= 'department_delete'),

    path('department_list_by_user/<int:id>/',department_list_by_user, name = 'department_list_by_user'),
    path('list_events_in_each_department/<int:id>/',list_events_in_each_department, name = 'list_events_in_each_department'),
    path('department_list_by_campus/<int:id>/',department_list_by_campus, name = 'department_list_by_campus'),

    path('campus_register/',campus_register, name = 'campus_register'),
    path('campus_list/',campus_list, name = 'campus_list'),
    path('campus_delete/<int:id>/',campus_delete, name = 'campus_delete'),
    path('campus_update/<int:id>/',campus_update, name = 'campus_update'),

    path('campus_name_list/',campus_name_list,name = 'campus_name_list'),

    path('create_academic_year/',create_academic_year, name = 'create_academic_year'),
    path('list_academic_year/',list_academic_year, name = 'list_academic_year'),
    path('update_academic_year/<int:id>/',update_academic_year, name = 'update_academic_year'),
    path('delete_academic_year/<int:id>/',delete_academic_year,name ='delete_academic_year'),
    
    path('create_event_type/',create_event_type, name = 'create_event_type'),
    path('list_event_type/',list_event_type, name = 'list_event_type'),
    path('delete_event_type/<int:id>/',delete_event_type, name = 'delete_event_type'),

    path('create_tag/',create_tag, name = 'create_tag'),
    path('list_tag/',list_tag, name = 'list_tag'),
    path('delete_tag/<int:id>/',delete_tag, name = 'delete_tag'),


    path('event_register/',event_register,name ='event_register'),
    path('upload_proposal_files/<int:event_id>/',upload_proposal_files, name = 'upload_proposal_files'),
    path('event_list/',event_list, name ='event_list'),
    path('event_delete/<int:id>/',event_delete, name = 'event_delete'),
    path('event_register_status/<int:id>/',event_register_status, name = 'event_register_status'),

    path('assign_role/',assign_roles, name ='assign_role'),
    # path('role_list/',role_list,name = 'role_list'),

]




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
