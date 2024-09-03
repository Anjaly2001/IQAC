from .models import Academic_year, Activity, Collaborators, Department, Event_Register, Event_type, Location, Proposal_Upload
from rest_framework import serializers



class DepartmentSerializer(serializers.ModelSerializer):
    location = serializers.CharField(source='location.campus', read_only=True)

    class Meta:
        model = Department
        fields =['id', 'name', 'type', 'description', 'is_active', 'created_on', 'updated_at', 'location']

    def get_location(self, obj):
        return obj.location.name  

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
        fields = ['department', 'location', 'users']

class UploadProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal_Upload
        fields = ['files']

class EventRegisterSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True)
    collaborators = CollaboratorSerializer(many=True)
    # files = UploadProposalSerializer(many=True)

    class Meta:
        model = Event_Register
        fields = ['location', 'department', 'event_title', 'no_of_activities', 
                  'start_date', 'end_date', 'venue', 'academic_year', 
                  'event_type', 'activities', 'collaborators', 'files']

    def create(self, validated_data):
        activities_data = validated_data.pop('activities')
        collaborators_data = validated_data.pop('collaborators')
        # files_data = validated_data.pop('files')

        event = Event_Register.objects.create(**validated_data)

        for activity_data in activities_data:
            Activity.objects.create(event=event, **activity_data)

        for collaborator_data in collaborators_data:
            Collaborators.objects.create(event=event, **collaborator_data)

        # for file_data in files_data:
        #     Proposal_Upload.objects.create(event=event, **file_data)

        return event

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