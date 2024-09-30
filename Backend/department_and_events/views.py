import logging
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from authentication.emails import send_event_register
from authentication.models import CustomUser, User_profile,Location, Department
from authentication.serializers import UserRegistrationSerializer
from .models import Academic_year, Collaborators, Event_Proposal, Event_Register, Event_type, EventReport, EventStatus, Expense, Income,  Role, Tag
from .serializers import AcademicyearSerializer, CollaboratorSerializer, DepartmentSerializer,  DepartmentSerializer, EventListSerializer, EventProposalSerializer, EventRegisterSerializer, EventReportFileUploadSerializer, EventReportSerializer, EventStatusSerializer, EventTypeSerializer, ExpenseSerializer, IncomeSerializer, LocationSerializer, MultiRoleSerializer, ProposalFileSerializer, RoleSerializer, TagSerializer
from django.contrib.auth.models import User
from .emails import send_event_status_email

from rest_framework.parsers import MultiPartParser, FormParser


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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def users_list_of_each_department(request, id):
    if request.method == 'GET':
        try:
            # Fetch department from Role table using department ID
            department_roles = Role.objects.filter(department__id=id)
            if not department_roles.exists():
                return Response({"error": "Department not found."}, status=status.HTTP_404_NOT_FOUND)

            # Extract users associated with the department roles
            users = [role.users for role in department_roles]
            user_serializer = UserRegistrationSerializer(users, many=True)
            user_data = [{'id': user.get('id'), 'username': user['username']} for user in user_serializer.data]

            # Get department name from the first Role object
            department_name = department_roles.first().department.name
    
            return Response({
                'department': department_name,
                'users': user_data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def roles_and_department_of_each_user(request, id):
    try:
        user = CustomUser.objects.get(id=id)
        roles = Role.objects.filter(users=user)
        serializer = MultiRoleSerializer(roles, many=True)

        return Response({
            'user_id': user.id,
            'roles': serializer.data
        }, status=status.HTTP_200_OK)

    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except User_profile.DoesNotExist:
        return Response({"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND)
   
   


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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def campus_details_by_user(request):
    # Get the logged-in user
    user = request.user

    # Fetch the User_profile associated with the logged-in user
    profile = get_object_or_404(User_profile, user=user)

    # Access the location linked to the user's profile
    location = profile.location

    if location:
        # Return the campus (location) details and logo if available
        return Response({
            "campus": location.campus,  # Assuming 'campus' is a field in the Location model
            "logo": location.logo.url if location.logo else None  # Return logo URL if exists
        })
    else:
        # If no location is found for the user, return an error response
        return Response({"error": "No campus location found for the user"}, status=404)
    
    
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_academic_year_by_campus(request,id):
    if request.method == 'GET':
        try:
            # Filter academic years by campus ID
            academic_years = Academic_year.objects.filter(location_id=id)
            serializer = AcademicyearSerializer(academic_years, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Academic_year.DoesNotExist:
            return Response({'detail': 'Academic years not found for the given campus.'}, status=status.HTTP_404_NOT_FOUND)

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



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_event_type(request,id):
    if request.method == 'PUT':
        event_type = Event_type.objects.get(id = id)
        serializer = EventTypeSerializer(event_type,data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response({"data":serializer.data,'message':'Updated SUccessfully'})
        return Response(serializer._errors)
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_event_type(request, id):
    if request. method == 'DELETE':
        event_type = Event_type.objects.get(id=id)
        event_type.delete()
        return Response("Event type deleted successfully")
    

#________EVENT PROPOSAL API_______________

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event_proposal(request):
    serializer = EventProposalSerializer(data=request.data)
    
    if serializer.is_valid():
        # Save the Event Proposal
        event_proposal = serializer.save()

        # Get incomes and expenses from the request data
        incomes_data = request.data.get('incomes', [])
        expenses_data = request.data.get('expenses', [])

        # Create Income instances
        for income_data in incomes_data:
            num_participants = income_data.get('num_participants')
            rate = income_data.get('rate')
            
            if num_participants and rate:
                # Calculate amount automatically if num_participants and rate are provided
                amount = num_participants * rate
            else:
                # Fallback to 0 if no calculation is possible
                amount = 0

            # Create the income record with the calculated amount
            Income.objects.create(
                event_proposal=event_proposal,
                particular=income_data.get('particular'),
                num_participants=num_participants,
                rate=rate,
                amount=amount
            )

        # Create Expense instances
        for expense_data in expenses_data:
            Expense.objects.create(event_proposal=event_proposal, **expense_data)

        # Re-fetch the Event Proposal to include incomes and expenses
        event_proposal = Event_Proposal.objects.prefetch_related('incomes', 'expenses').get(id=event_proposal.id)

        # Serialize the event proposal with incomes and expenses included
        response_serializer = EventProposalSerializer(event_proposal)
        
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_event_proposal(request, id):
    try:
        # Fetch the existing event proposal
        event_proposal = Event_Proposal.objects.get(id=id)
    except Event_Proposal.DoesNotExist:
        return Response({"error": "Event Proposal not found"}, status=status.HTTP_404_NOT_FOUND)

    # Update event proposal data
    serializer = EventProposalSerializer(event_proposal, data=request.data, partial=True)
    if serializer.is_valid():
        # Save updated event proposal
        event_proposal = serializer.save()

        # Get incomes and expenses data from request
        incomes_data = request.data.get('incomes', [])
        expenses_data = request.data.get('expenses', [])

        # Update incomes
        for income_data in incomes_data:
            income_id = income_data.get('id')
            if income_id:
                # Update existing income
                try:
                    income_instance = Income.objects.get(id=income_id, event_proposal=event_proposal)
                    for attr, value in income_data.items():
                        setattr(income_instance, attr, value)
                    income_instance.save()
                except Income.DoesNotExist:
                    return Response({"error": f"Income with id {income_id} not found."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Create new income
                Income.objects.create(event_proposal=event_proposal, **income_data)

        # Update expenses
        for expense_data in expenses_data:
            expense_id = expense_data.get('id')
            if expense_id:
                # Update existing expense
                try:
                    expense_instance = Expense.objects.get(id=expense_id, event_proposal=event_proposal)
                    for attr, value in expense_data.items():
                        setattr(expense_instance, attr, value)
                    expense_instance.save()
                except Expense.DoesNotExist:
                    return Response({"error": f"Expense with id {expense_id} not found."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Create new expense
                Expense.objects.create(event_proposal=event_proposal, **expense_data)

        # Re-fetch the event proposal with related incomes and expenses
        event_proposal = Event_Proposal.objects.prefetch_related('incomes', 'expenses').get(id=event_proposal.id)
        
        # Serialize the updated event proposal
        response_serializer = EventProposalSerializer(event_proposal)
        return Response(response_serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_event_proposal(request):
    if request.method == 'GET':
        proposal = Event_Proposal.objects.all()
        serializer = EventProposalSerializer(proposal, many = True)
        event_data = [
            {
                'id': proposal['id'],
                'event_title': proposal['event_title']
                
            } 
            for proposal in serializer.data
        ]
        
        return Response(event_data)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_event_proposal_by_department(request,id):
    proposal = Event_Proposal.objects.filter(department_id = id)
    serializer = EventProposalSerializer(proposal, many = True)
    event_data =[
        {
        'id':proposal['id'],
        'event_title': proposal['event_title']
        }
        for proposal in serializer.data
    ] 
    return Response(event_data)


# _______EVENT REGISTER API_______________


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def event_register(request):
    print(request.data)
    if request.method == 'POST':
        serializer = EventRegisterSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            event = serializer.save()
            user = request.user
            department_id = request.data.get('department_id')

            if not department_id:
                print('Department ID is required.')
                return Response({'error': 'Department ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Query to find HODs and IQAC users in the department
            hods_and_iqacs = Role.objects.filter(department=department_id, role__in=['departmentHOD', 'IQACuser'])
            
            # Use 'users_id' instead of 'user_id'
            user_ids = hods_and_iqacs.values_list('users_id', flat=True)
            
            # Fetch the users with the filtered IDs
            users_with_roles = CustomUser.objects.filter(id__in=user_ids)
            email_list = [user.email for user in users_with_roles if user.email]

            # Sending emails to HOD and IQAC users
            if email_list:
                try:
                    send_event_register(email_list)
                except Exception as e:
                    print(f"Error sending email to HOD/IQAC users: {str(e)}")

            # Send email to the event creator if not already in the list
            if user.email and user.email not in email_list:
                try:
                    send_event_register([user.email])
                except Exception as e:
                    print(f"Error sending email to event creator: {str(e)}")
                    
            return Response({'data': serializer.data, 'message': 'Event Registered Successfully'}, status=status.HTTP_201_CREATED)
        
        # Return errors in case serializer is not valid
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_proposal_files(request, event_id):

    print(request.data)
    """
    Upload files for an event.
    """
    if not event_id:
        print('event_id')
        return Response({"detail": "Event ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    if not Event_Register.objects.filter(id=event_id).exists():
        print( "Event not found.")
        return Response({"detail": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    files = request.FILES.getlist('files[]')
    if not files:
        print("no files")
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
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({"files": response_data}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def event_details(request, id):
    try:
        event = Event_Register.objects.get(id=id)
    except Event_Register.DoesNotExist:
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)
    event_serializer = EventRegisterSerializer(event)

    try:
        event_status = EventStatus.objects.filter(event=event).latest('created_at')  # Get the latest status
        status_serializer = EventStatusSerializer(event_status)
    except EventStatus.DoesNotExist:
        status_serializer = None

    collaborators = Collaborators.objects.filter(event=event)
    collaborator_serializer = CollaboratorSerializer(collaborators, many=True)

    response_data = {
        'event': event_serializer.data,
        'status': status_serializer.data if status_serializer else None,
        'collaborators': collaborator_serializer.data
    }
    return Response(response_data, status=status.HTTP_200_OK)


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
        serializer = RoleSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['users']
            department = serializer.validated_data['department']
            role = serializer.validated_data['role']
            
            # Rename the local variable 'status' to 'role_status' to avoid conflict
            role_status = serializer.validated_data.get('status', True)  # Default to True if not provided

            # Create or update the role for the user and department
            Role.objects.create(
                users=user,
                department=department,
                role=role,
                status=role_status  # Use renamed variable
            )

            return Response({'message': 'Role assigned successfully'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_role(request, id):
    try:
        role = Role.objects.get(id=id)
        role.delete()
        return Response({'message': 'Role deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Role.DoesNotExist:
        return Response({'error': 'Role not found'}, status=status.HTTP_404_NOT_FOUND)

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


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_tag(request,id):
    if request.method == 'PUT':
        tag = Tag.objects.get(id = id)
        serializer = TagSerializer(tag, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data,'message':'Updated Successfully'})
        return Response(serializer.errors)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_tag(request, id):
    if request.method == 'DELETE':
        tag = Tag.objects.get(id=id)
        tag.delete()
        return Response('Tag Deleted Successfully')



#_____________EVENT REPORT API_____________


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def event_report_create(request, id):
    if request.method == 'POST':
        try:
            report = EventReport.objects.get(id=id)
            serializer = EventReportSerializer(report, data=request.data, partial=True)
        except EventReport.DoesNotExist:
            data = request.data.copy()
            data['event'] = id 
            serializer = EventReportSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data, 'message': 'Details saved successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_event_report_files(request):
    if request.method == 'POST':
        serializer = EventReportFileUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ____________COLLABORATORS API________

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_collaborators(request, id):
    if request.method == 'DELETE':
        try:
            collaborator = Collaborators.objects.get(id=id)
            collaborator.delete()
            return Response({'message': 'Collaborator deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Collaborators.DoesNotExist:
            return Response({'error': 'Collaborator not found'}, status=status.HTTP_404_NOT_FOUND)




# # ______DEPARTMENT API______

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def department_list(request):
#     if request.method == 'GET':
#         if not request.user.is_superuser and request.user.is_staff:
#             return Response({"error":ff797871-c3e4-486e-bc7e-7bf0f978922e/
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
