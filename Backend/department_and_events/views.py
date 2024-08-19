from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status

from .models import Location,Department

from .serializers import DepartmentSerializer,  DepartmentSerializer, LocationSerializer
from django.contrib.auth.models import User





#_____________DEPARTMENT API_________

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def department_register(request):
    if request.method == 'POST':
        if not request.user.is_superuser and not request.user.is_staff:
            return Response({"error": "Only admin can create departments"})
        serializer = DepartmentSerializer(data=request.data)
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
        # lst=[]
        # for department in serializer.data:
        #     c=(department['location'])
        #     c= Location.objects.get(c=id)
        #     lst.append(c)
        # print(lst)


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
    
#________________CAMPUS API____________

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
        return Response({"errors": serializer.errors, "message": "Registration failed."},status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def campus_list(request):
    if request.method == 'GET':
        obj = Location.objects.all().order_by('-created_at')
        serializer = LocationSerializer(obj, many=True)
        return Response(serializer.data)

# # Create your views here.

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