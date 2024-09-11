from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from authentication.emails import send_event_register
from authentication.models import CustomUser, User_profile
from authentication.serializers import UserRegistrationSerializer
from .models import Academic_year, Event_Register, Event_type, EventStatus, Location, Department, Role, Tag
from .serializers import AcademicyearSerializer, DepartmentSerializer,  DepartmentSerializer, EventListSerializer, EventRegisterSerializer, EventStatusSerializer, EventTypeSerializer, LocationSerializer, MultiRoleSerializer, ProposalFileSerializer, TagSerializer
from django.contrib.auth.models import User
from .emails import send_event_status_email


# _____________DEPARTMENT API_________

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def department_register(request):
    print(request.data)
    if request.method == 'POST':
        if not request.user.is_superuser and not request.user.is_staff:
            return Response({"error": "Only admin can create departments"})
        data = request.data.copy()
        if data.get('location') == 'Others':
            new_location_name = data.get('new_location')
            new_location = Location.objects.create(
                campus=new_location_name, created_by=request.user)
            data['location'] = new_location.id
            # Create a new location
            loc_serializer = LocationSerializer(data=new_location)
            if loc_serializer.is_valid():
                loc_serializer.save()
        serializer = DepartmentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({"errors": serializer.errors, "message": "Registration failed."},
                        status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error": "Method not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def department_list(request):
    if request.method == 'GET':
        obj = Department.objects.all()
        serializer = DepartmentSerializer(obj, many=True)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def department_activation(request, id):
    if request.method == 'POST':
        if not request.user.is_superuser and request.user.is_staff:
            return Response({"error": "Only admin can activate/deactivate departments"})
        hospital = get_object_or_404(Department, id=id)
        hospital.is_active = not hospital.is_active
        hospital.save()
        serializer = DepartmentSerializer(hospital)
        return Response({'data': serializer.data, "message": "Department status updated successfully."},
                        status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def department_update(request, id):
    if request.method == 'PUT':
        if not request.user.is_superuser and request.user.is_staff:
            return Response({"error": "Only admin can update departments"})
        obj = Department.objects.get(id=id)
        serializer = DepartmentSerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data, "message": "Hospital registered successfully."},
                            status=status.HTTP_200_OK)
        return Response({"errors": serializer.errors, "message": "Updation failed."},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def department_delete(request, id):
    if request.method == 'DELETE':
        if not request.user.is_superuser and request.user.is_staff:
            return Response({"error": "Only admin can delete departments"})
        obj = Department.objects.get(id=id)
        obj.delete()
        return Response({'message': 'Deleted Successfully'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def department_list_by_user(request, id):
    try:
        user = CustomUser.objects.get(id=id)
        user_profile_department = None
        if hasattr(user, 'user_profile'):
            user_profile_department = user.user_profile.department

        role_departments = Department.objects.filter(
            role__user=user).distinct()
        departments = set(role_departments)
        if user_profile_department:
            departments.add(user_profile_department)
        department_names = [dept.name for dept in departments]

        return Response({
            "department_names": department_names
        }, status=status.HTTP_200_OK)

    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def department_list_by_campus(request, id):
    try:
        campus = Location.objects.get(id=id)
    except Location.DoesNotExist:
        return Response({'error': 'Campus not found'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        departments = Department.objects.filter(location=campus)
        serializer = DepartmentSerializer(departments, many=True)
        department_data = [{'id': department['id'], 'name': department['name']}
                           for department in serializer.data]
        return Response(department_data, status=status.HTTP_200_OK)


# ________________CAMPUS API____________

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def campus_register(request):
    if request.method == 'POST':
        if not request.user.is_superuser and request.user.is_staff:
            return Response({"error": "Only admin can list departments"})
        data = request.data.copy()
        data['created_by'] = request.user.id
        serializer = LocationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"errors": serializer.errors, "message": "Registration failed."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def campus_list(request):
    if request.method == 'GET':
        obj = Location.objects.all().order_by('-created_at')
        serializer = LocationSerializer(obj, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def campus_name_list(request):
    if request.method == 'GET':
        campus = Location.objects.all()
        serializer = LocationSerializer(campus, many=True)
        # campus_names = [campus['campus'] for campus in serializer.data]
        campus_names = [{'id': campus['id'], 'name': campus['campus']}
                        for campus in serializer.data]
        return Response(campus_names, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def campus_delete(request, id):
    if request.method == 'DELETE':
        campus = Location.objects.get(id=id)
        campus.delete()
        return Response('Campus deleted successfully')


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def campus_update(request, id):
    print(request.data)
    if request.method == 'PUT':
        campus = Location.objects.get(id=id)
        serializer = LocationSerializer(
            campus, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data, 'message': 'Campus updates successfully'})
        return Response(serializer.errors)


# ________ACADEMIC_YEAR API________

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_academic_year(request):
    print(request.data)
    location_ids = request.data.get('location_id')
    if not location_ids:
        return Response({'error': 'location_id field is required'}, status=status.HTTP_400_BAD_REQUEST)
    created_academic_years = []
    errors = []
    for location_id in location_ids:
        academic_year_data = request.data.copy()
        academic_year_data['location_id'] = location_id
        serializer = AcademicyearSerializer(data=academic_year_data)
        if serializer.is_valid():
            academic_year = serializer.save(created_by=request.user)
            created_academic_years.append(
                AcademicyearSerializer(academic_year).data)
        else:
            errors.append(serializer.errors)
    if created_academic_years:
        return Response({
            'data': created_academic_years,
            'message': 'Academic year(s) created successfully'
        }, status=status.HTTP_201_CREATED)
    return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_academic_year(request):
    if request.method == 'GET':
        year = Academic_year.objects.all()
        serializer = AcademicyearSerializer(year, many=True)
        return Response({'data': serializer.data, }, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_academic_year(request, id):
    if request.method == 'PUT':
        year = Academic_year.objects.get(id=id)
        serializer = AcademicyearSerializer(
            year, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data, 'message': 'Successfully updated the data'}, status=status.HTTP_200_OK)
        return Response(serializer.errors)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_academic_year(request, id):
    if request.method == 'DELETE':
        year = Academic_year.objects.get(id=id)
        year.delete()
        return Response("Year deleted successfully")


# ________EVENT TYPE API__________
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event_type(request):
    if request.method == 'POST':
        serializer = EventTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response({'data': serializer.data, 'message': 'Successfully created event type'}, status=status.HTTP_200_OK)
        return Response(serializer.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_event_type(request):
    if request.method == 'GET':
        event_type = Event_type.objects.all()
        serializer = EventTypeSerializer(event_type, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_event_type(request, id):
    if request. method == 'DELETE':
        event_type = Event_type.objects.get(id=id)
        event_type.delete()
        return Response("Event type deleted successfully")


# _______EVENT REGISTER API_______________


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def event_register(request):
    if request.method == 'POST':
        serializer = EventRegisterSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            event = serializer.save()
            user = request.user
            department_id = request.data.get('department_id')

            if not department_id:
                return Response({'error': 'Department ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
            hods_and_iqacs = Role.objects.filter(department=department_id, role__in=[
                                                 'departmentHOD', 'IQACuser'])
            user_ids = hods_and_iqacs.values_list('user_id', flat=True)
            users_with_roles = CustomUser.objects.filter(id__in=user_ids)
            email_list = [
                user.email for user in users_with_roles if user.email]

            if email_list:
                try:
                    send_event_register(email_list)
                except Exception as e:
                    print(f"Error sending email to HOD/IQAC users: {str(e)}")

            if user.email and user.email not in email_list:
                try:
                    send_event_register([user.email])
                except Exception as e:
                    print(f"Error sending email to event creator: {str(e)}")
            return Response({'data': serializer.data, 'message': 'Event Registered Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_proposal_files(request, event_id):
    """
    Upload files for an event.
    """
    if not event_id:
        return Response({"detail": "Event ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    if not Event_Register.objects.filter(id=event_id).exists():
        return Response({"detail": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    files = request.FILES.getlist('files')
    if not files:
        return Response({"detail": "No files uploaded."}, status=status.HTTP_400_BAD_REQUEST)

    response_data = []
    for file in files:
        file_data = {
            'event': event_id,
            'file': file
        }
        serializer = ProposalFileSerializer(data=file_data)
        if serializer.is_valid():
            serializer.save()
            response_data.append(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({"files": response_data}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def event_list(request):
    if request.method == 'GET':
        event_list = Event_Register.objects.all()
        serializer = EventListSerializer(event_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def event_delete(request, id):
    if request.method == 'DELETE':
        event = Event_Register.objects.get(id=id)
        event.delete()
        return Response('Event Deleted Successfully')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_events_in_each_department(request, id):
    if request.method == 'GET':
        department = Department.objects.get(id=id)
        events = Event_Register.objects.filter(department=department)
        serializer = EventRegisterSerializer(events, many=True)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def event_register_status(request, id):
    if request.method == 'POST':
        try:
            event = Event_Register.objects.get(id=id)
        except Event_Register.DoesNotExist:
            return Response({"detail": "Event not found."}, status=404)

        try:
            user_roles = Role.objects.filter(
                user=request.user).values_list('role', flat=True)
        except Role.DoesNotExist:
            return Response({"detail": "No role found for the user."}, status=403)

        allowed_roles = ['departmentHOD', 'IQACuser', 'viewers']
        if not any(role in allowed_roles for role in user_roles):
            return Response({"detail": "You do not have permission to perform this action."}, status=403)

        data = request.data.copy()
        data['event'] = id
        data['created_by'] = request.user.id

        serializer = EventStatusSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            staff_user = event.created_by
            event_title = event.event_title
            status = serializer.validated_data['status']
            send_event_status_email(
                to_email=staff_user.email, event_title=event_title, status=status)
            return Response({'data': serializer.data}, status=200)
        return Response(serializer.errors, status=400)



# ________ROLE API___________

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assign_roles(request):
    if request.method == 'POST':
        serializer = MultiRoleSerializer(data=request.data)
        if serializer.is_valid():
            users = serializer.validated_data['users']
            departments = serializer.validated_data['departments']
            role = serializer.validated_data['role']
            for user in users:
                for department in departments:
                    Role.objects.create(
                        user=user, role=role, department=department)
            return Response({'message': 'Roles assigned successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# __________TAG API_______________

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_tag(request):
    if request.method == 'POST':
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_tag(request):
    if request.method == 'GET':
        tag = Tag.objects.all()
        serializer = TagSerializer(tag, many=True)
        return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_tag(request, id):
    if request.method == 'DELETE':
        tag = Tag.objects.get(id=id)
        tag.delete()
        return Response('Tag Deleted Successfully')


# ____________COLLABORATORS API________




# # ______DEPARTMENT API______

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def department_list(request):
#     if request.method == 'GET':
#         if not request.user.is_superuser and request.user.is_staff:
#             return Response({"error": "Only admin can list departments"})
#         obj = Department.objects.all()
#         serializer = DepartmentSerializer(obj, many=True)
#         return Response(serializer.data)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def department_register(request):
#     if request.method == 'POST':
#         if not request.user.is_superuser and not request.user.is_staff:
#             return Response({"error": "Only admin can create departments"})
#         serializer = DepartmentSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response({"errors": serializer.errors, "message": "Registration failed."},
#                         status=status.HTTP_400_BAD_REQUEST)
#     else:
#         # Handling for GET or other methods if needed
#         return Response({"error": "Method not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def department_update(request, id):
#     if request.method == 'PUT':
#         if not request.user.is_superuser and request.user.is_staff:
#             return Response({"error": "Only admin can update departments"})
#         obj = Department.objects.get(id=id)
#         serializer = DepartmentSerializer(obj, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"data": serializer.data, "message": "Hospital registered successfully."},
#                             status=status.HTTP_200_OK)
#         return Response({"errors": serializer.errors, "message": "Updation failed."},
#                         status=status.HTTP_400_BAD_REQUEST)


# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def department_delete(request, id):
#     if request.method == 'DELETE':
#         if not request.user.is_superuser and request.user.is_staff:
#             return Response({"error": "Only admin can delete departments"})
#         obj = Department.objects.get(id=id)
#         obj.delete()
#         return Response({'message': 'Deleted Successfully'})


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def department_activation(request, id):
#     if request.method == 'POST':
#         if not request.user.is_superuser and request.user.is_staff:
#             return Response({"error": "Only admin can activate/deactivate departments"})
#         hospital = get_object_or_404(Department, id=id)
#         hospital.is_active = not hospital.is_active
#         hospital.save()
#         serializer = DepartmentSerializer(hospital)
#         return Response({'data': serializer.data, "message": "Department status updated successfully."},
#                         status=status.HTTP_200_OK)
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def list_active_departments(request):
#     if request.method == 'GET':
#         departments = Department.objects.filter(is_active=True)
#         serializer = DepartmentSerializer(departments, many=True)
#         return Response(serializer.data, status= status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def list_inactive_departments(request):
#     if request.method == 'GET':
#         departments = Department.objects.filter(is_active=False)
#         serializer = DepartmentSerializer(departments, many=True)
#         return Response(serializer.data, status= status.HTTP_200_OK)


# # ______DEPARTMENT_HEAD API______

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def department_head_create(request):
#     if request.method == 'POST':
#         if not request.user.is_superuser and request.user.is_staff:
#             return Response({"error": "Only admin can activate/deactivate departments"})
#         serializer = Department_headSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response({"errors": serializer.errors, "message": "Registration failed."},
#                         status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def department_head_list(request):
#     if request.method == 'GET':
#         if not request.user.is_superuser and request.user.is_staff:
#             return Response({"error": "Only admin can activate/deactivate departments"})
#         obj = Department_head.objects.all()
#         serializer = Department_headSerializer(obj, many=True)

#         return Response(serializer.data)


# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def department_head_update(request, id):
#     if request.method == 'PUT':
#         if not request.user.is_superuser and request.user.is_staff:
#             return Response({"error": "Only admin can activate/deactivate departments"})
#         obj = Department_head.objects.get(id=id)
#         serializer = Department_headSerializer(obj, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"data": serializer.data, "message": "Updated successfully."},
#                             status=status.HTTP_200_OK)
#         return Response({"errors": serializer.errors, "message": "Updation failed."},
#                         status=status.HTTP_400_BAD_REQUEST)


# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def department_head_delete(request, id):
#     if request.method == 'DELETE':
#         if not request.user.is_superuser and request.user.is_staff:
#             return Response({"error": "Only admin can activate/deactivate departments"})
#         obj = Department_head.objects.get(id=id)
#         obj.delete()
#         return Response({'message': "Deleted Successfully"})


# # _________USER_DEPARTMENT_MAP API___________

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def user_department_map_create(request):
#     user = request.data.get('user_ids', [])
#     department = request.data.get('department_id')

#     if not department or not user:
#         return Response({"error": "Department ID and User IDs are required"}, status=status.HTTP_400_BAD_REQUEST)
#     department = Department.objects.filter(id=department).first()

#     if not department:
#         return Response({"error": "Department not found"}, status=status.HTTP_404_NOT_FOUND)

#     users = User.objects.filter(id__in=user)
#     if not users.exists():
#         return Response({"error": "No valid users found"}, status=status.HTTP_404_NOT_FOUND)

#     for user in users:
#         User_department_map.objects.get_or_create(user=user, department=department)

#     return Response({"message": "Users assigned to department successfully"}, status=status.HTTP_200_OK)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def list_active_user_department_map(request):
#     if request.method == 'GET':
#         departments = Department.objects.filter(is_active=True)
#         serializer = DepartmentSerializer(departments, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def list_inactive_user_department_map(request):
#     if request.method == 'GET':
#         departments = Department.objects.filter(is_active=False)
#         serializer = DepartmentSerializer(departments, many= True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

# # ___________EVENT API_____________
# from .emails import send_event_notification


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def event_register(request):
#     if request.method == 'POST':
#         serializer = EventSerializer(data=request.data)
#         if serializer.is_valid():
#             event = serializer.save()
#             mail_list = {}
#             mail_list['to'] = request.user.username
#             mail_list['cc'] = []
#             department_head = Department_head.objects.get(department=event.department.id, is_active=True)
#             mail_list['cc'].append(department_head.user.username)
#             iqacTeam = User.objects.filter(is_superuser=True)
#             for obj in iqacTeam:
#                 mail_list['cc'].append(obj.username)
#             # print(mail_list)
#             send_event_notification(event, mail_list)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response({"errors": serializer.errors, "message": "Registration failed."},
#                         status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def activity_create(request):
#     if request.method == 'POST':
#         serializer = ActivitySerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def activity_update(request,id):
#     if request.method == 'POST':
#         obj = Activity.objects.get(id=id)
#         serializer = ActivitySerializer(obj,data = request.data,partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def activity_delete(request,id):
#     if request.method == 'POST':
#         obj = Activity.objects.get(id=id)
#         obj.delete()
#         return Response({'message': 'Activity deleted.'}, status=status.HTTP_204_NO_CONTENT)


# #________EVENT REPORT API________
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def event_report_create(request):
#     if request.method == 'POST':
#         serializer = EventReportSerializer(data=request.data)
#         if serializer.is_valid():
#             report =serializer.save()
#             ReportStatus.objects.create(report=report, status='pending')
#             return Response( {'message':"Report send to department IQAC coordinator for approval", "data":serializer.data}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def event_report_update(request,id):
#     if request.method == 'POST':
#         obj = EventReport.objects.get(id=id)
#         serializer = EventReportSerializer(obj,data = request.data,partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"data": serializer.data, "message": "Report updated successfully."},status=status.HTTP_200_OK)
#         return Response({"errors": serializer.errors, "message": "Updation failed."},status=status.HTTP_400_BAD_REQUEST)

# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def event_report_delete(request,id):
#     if request.method == 'DELETE':
#         obj = EventReport.objects.get(id=id)
#         obj.delete()
#         return Response( {"message": "Report deleted successfully."})


# #____________BROCHURE API______________

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def brochure_upload(request):
#     if request.method == 'POST':
#         serializer = BrochureSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message": "Brochure Uploaded successfully.","data":serializer.data},status=status.HTTP_201_CREATED)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def brochure_update(request, id):
#     if request.method == 'POST':
#         obj = Brochure.objects.get(id = id)
#         serializer = BrochureSerializer(obj, data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message": "Brochure Updated successfully.","data":serializer.data})
#         return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def brochure_delete(request, id):
#     if request.method == 'DELETE':
#         obj = Brochure.objects.get(id = id)
#         image_id = request.data.get('image_id')
#         if image_id:
#             # Assuming the images are stored in a ManyToManyField or similar
#             obj.images.filter(id=image_id).delete()
#             return Response({"message": "Image deleted successfully."}, status=status.HTTP_200_OK)
#         return Response({"error": "Image ID not provided."}, status=status.HTTP_400_BAD_REQUEST)


# #________BLOG POST API_____________


# #__________PHOTOGRAPHS API____________


# #_______REPOPRT STATUS API______________

# # @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# # def approve_by_department(request, pk):
# #     report = get_object_or_404(EventReport, pk=pk)
# #     latest_status = report.reportstatus_set.latest('id')
# #     if latest_status.status == 'pending':
# #         new_status = ReportStatus(report=report, status='approved_by_department')
# #         new_status.save()
# #         return Response({'status': 'approved by department'}, status=status.HTTP_200_OK)
# #     return Response({'error': 'Invalid operation'}, status=status.HTTP_400_BAD_REQUEST)
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def approve_by_department(request, pk):
#     report = get_object_or_404(EventReport, pk=pk)
#     latest_status = report.reportstatus_set.latest('id')

#     if latest_status.status == 'pending'  or 'rejected_by_department':
#         latest_status.status = 'approved_by_department'
#         latest_status.save()
#         return Response({'status': 'approved by department'}, status=status.HTTP_200_OK)
#     else:
#         # Adding debug information
#         print(f"Current status: {latest_status.status}, expected 'pending'")
#         return Response({'error': 'Invalid operation'}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def reject_by_department(request, pk):
#     report = get_object_or_404(EventReport, pk=pk)
#     latest_status = report.reportstatus_set.latest('id')

#     if latest_status.status == 'pending' or 'approved_by_department':
#         latest_status.status = 'rejected_by_department'
#         latest_status.save()
#         return Response({'status': 'rejected by department'}, status=status.HTTP_200_OK)
#     else:
#         # Adding debug information
#         print(f"Current status: {latest_status.status}, expected 'pending'")
#         return Response({'error': 'Invalid operation'}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def approve_by_IQAC(request, pk):
#     if not request.user.is_superuser and request.user.is_staff:
#             return Response({"error": "Only admin send the approval"})
#     report = get_object_or_404(EventReport, pk=pk)
#     latest_status = report.reportstatus_set.latest('id')

#     if latest_status.status == 'pending'  or 'rejected_by_IQAC':
#         latest_status.status = 'approved_by_IQAC'
#         latest_status.save()
#         return Response({'status': 'approved by department'}, status=status.HTTP_200_OK)
#     else:
#         # Adding debug information
#         print(f"Current status: {latest_status.status}, expected 'pending'")
#         return Response({'error': 'Invalid operation'}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def reject_by_IQAC(request, pk):
#     if not request.user.is_superuser and request.user.is_staff:
#             return Response({"error": "Only admin can send the rejection"})
#     report = get_object_or_404(EventReport, pk=pk)
#     latest_status = report.reportstatus_set.latest('id')

#     if latest_status.status == 'pending' or 'approved_by_IQAC':
#         latest_status.status = 'rejected_by_IQAC'
#         latest_status.save()
#         return Response({'status': 'rejected by department'}, status=status.HTTP_200_OK)
#     else:
#         # Adding debug information
#         print(f"Current status: {latest_status.status}, expected 'pending'")
#         return Response({'error': 'Invalid operation'}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def check_status(request):
#     if request.method == 'GET':
#         obj = ReportStatus.objects.all()
#         serializer = ReportStatusSerializer(obj, many=True)
#         return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def check_status_id(request, id):
#     if request.method == 'GET':
#         try:
#             obj = ReportStatus.objects.get(id=id)
#             serializer = ReportStatusSerializer(obj)
#             return Response(serializer.data)
#         except ReportStatus.DoesNotExist:
#             return Response({"error": "ReportStatus not found"}, status=404)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def event_report_list(request):
#     reports = EventReport.objects.all()
#     serializer = EventReportSerializer(reports, many=True)
#     return Response(serializer.data)
