from rest_framework import serializers
from .models import events


class EventsSerializers(serializers.ModelSerializer):
    class Meta:
        model=events
        fields='__all__'
