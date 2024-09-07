from authentication.models import CustomUser
from .models import Academic_year, Activity, Collaborators, Department, Event_Register, Event_type, EventStatus, Location, Proposal_Upload, Role
from rest_framework import serializers


class DepartmentSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField()
    location_id = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all(), write_only=True, source='location')

    class Meta:
        model = Department
        fields = ['id', 'name', 'type', 'description', 'is_active', 'created_on', 'updated_at', 'location', 'location_id']

    def get_location(self, obj):
        if obj.location:
            return obj.location.campus  
        return None

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class AcademicyearSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)
    location_id = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all(), write_only=True, source='location')

    class Meta:
        model = Academic_year
        fields = ['id', 'start_date', 'end_date', 'label', 'location', 'location_id']

    def create(self, validated_data):
        # Create an Academic_year instance
        location = validated_data.pop('location')
        academic_year = Academic_year.objects.create(location=location, **validated_data)
        return academic_year


class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Event_type    
        fields = ['id','title','description']


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['activity_title', 'activity_description', 'activity_date', 'venue']

class CollaboratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collaborators
        fields = ['department', 'location', 'staffs']

class UploadProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal_Upload
        fields = ['files']

class EventRegisterSerializer(serializers.ModelSerializer):
    # Read-only nested serializers for returning full details in the response
    location = LocationSerializer(read_only=True)
    department = DepartmentSerializer(read_only=True)
    event_type = EventTypeSerializer(read_only=True)
    academic_year = AcademicyearSerializer(read_only=True)
    activities = ActivitySerializer(many=True, read_only=True)
    collaborators = CollaboratorSerializer(many=True, read_only=True)

    # Write-only fields for accepting primary key values
    location_id = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all(), write_only=True)
    department_id = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), write_only=True)
    event_type_id = serializers.PrimaryKeyRelatedField(queryset=Event_type.objects.all(), write_only=True)
    academic_year_id = serializers.PrimaryKeyRelatedField(queryset=Academic_year.objects.all(), write_only=True)
    
    activities_data = ActivitySerializer(many=True, write_only=True)
    collaborators_data = CollaboratorSerializer(many=True, write_only=True)

    class Meta:
        model = Event_Register
        fields = ['id', 'location', 'department', 'event_title', 'no_of_activities', 
                  'start_date', 'end_date', 'venue', 'academic_year', 
                  'event_type', 'activities', 'collaborators', 
                  'location_id', 'department_id', 'event_type_id', 'academic_year_id', 
                  'activities_data', 'collaborators_data']

    def create(self, validated_data):
        # Extract the nested related data and primary key fields
        activities_data = validated_data.pop('activities_data')
        collaborators_data = validated_data.pop('collaborators_data')
        location = validated_data.pop('location_id')
        department = validated_data.pop('department_id')
        event_type = validated_data.pop('event_type_id')
        academic_year = validated_data.pop('academic_year_id')

        # Set the current user as the creator
        user = self.context['request'].user
        validated_data['created_by'] = user
        validated_data['location'] = location
        validated_data['department'] = department
        validated_data['event_type'] = event_type
        validated_data['academic_year'] = academic_year

        # Create the Event_Register instance
        event = Event_Register.objects.create(**validated_data)

        # Create nested activities with created_by field
        for activity_data in activities_data:
            Activity.objects.create(event=event, created_by=user, **activity_data)

        # Create nested collaborators
        for collaborator_data in collaborators_data:
            Collaborators.objects.create(event=event, **collaborator_data)

        return event

# class RoleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Role
#         fields = '__all__'

class MultiRoleSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), many=True)
    departments = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), many=True)
    role = serializers.ChoiceField(choices=(
        ('viewers', 'Viewers'),
        ('departmentHOD', 'DepartmentHOD'),
        ('departmentIQAC', 'DepartmentIQAC'),
        ('staffs', 'Staffs'),
    ))
    status = serializers.BooleanField(default=True)

    class Meta:
        model = Role
        fields = '__all__'


class EventStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventStatus
        fields = '__all__'


    
    

# class EventRegisterSerializer(serializers.ModelSerializer):
#     location = LocationSerializer(read_only=True)
#     department = DepartmentSerializer(read_only=True)
#     event_type = EventTypeSerializer(read_only=True)
#     academic_year = AcademicyearSerializer(read_only=True)
#     activities = ActivitySerializer(many=True, read_only=True)
#     collaborators = CollaboratorSerializer(many=True, read_only=True)

#     academic_year = serializers.PrimaryKeyRelatedField(queryset=Academic_year.objects.all())

#     activities_data = ActivitySerializer(many=True, write_only=True)
#     collaborators_data = CollaboratorSerializer(many=True, write_only=True)

#     class Meta:
#         model = Event_Register
#         fields = ['id','location', 'department', 'event_title', 'no_of_activities', 
#                   'start_date', 'end_date', 'venue', 'academic_year', 
#                   'event_type', 'activities', 'collaborators','activities_data', 'collaborators_data']

#     def create(self, validated_data):
#         print(validated_data)
#         activities_data = validated_data.pop('activities_data')
#         collaborators_data = validated_data.pop('collaborators_data')

#         # Set the current user as the creator
#         user = self.context['request'].user
#         validated_data['created_by'] = user

#         # Create the Event_Register instance
#         event = Event_Register.objects.create(**validated_data)

#         # Create nested activities with created_by field
#         for activity_data in activities_data:
#             Activity.objects.create(event=event, created_by=user, **activity_data)

#         # Create nested collaborators
#         for collaborator_data in collaborators_data:
#             Collaborators.objects.create(event=event, **collaborator_data)

#         return event

    



    
# class DepartmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Department
#         fields = '__all__'

#         def validate_name(self,value):
#             if Department.objects.filter(Department.department_name == value).exists:
#                 raise serializers.ValidationError("A department with this name already exists.")
#             return value
        
# class Department_headSerializer(serializers.ModelSerializer):
#     department = DepartmentSerializer(read_only=True)
#     class Meta:
#         model = Department_head
#         fields = '__all__'

# class user_department_mapSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User_department_map
#         fields = '__all__'

# class EventSerializer(serializers.ModelSerializer):
#     start_date = serializers.DateField(format="%Y-%m-%d")
#     class Meta:
#         model = Event
#         fields = '__all__'

# class ActivitySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Activity
#         fields = '__all__'

# class EventReportSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = EventReport
#         fields = ['id', 'event', 'external_speakers', 'registration_list', 'list_of_attendees',
#             'details_of_external_attendees', 'list_of_all_participants_and_winners_list',
#             'list_of_students_volunteers', 'sample_certificates_of_participants_or_attendees',
#             'sample_certificates_of_winners', 'proposal_or_planning_documents',
#             'budgets', 'printout_of_email_communication', 'feedback']

#     def get_status(self, obj):
#         # Get the latest status for the report
#         latest_status = ReportStatus.objects.filter(report=obj).order_by('-id').first()
#         if latest_status:
#             return latest_status.status
#         return None
# class BrochureSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Brochure
#         fields = '__all__'

# class ReportStatusSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ReportStatus
#         fields = '__all__'

#     def get_status(self, obj):
#         status_obj = ReportStatus.objects.filter(report=obj).first()
#         if status_obj:
#             return ReportStatusSerializer(status_obj).data
#         return None