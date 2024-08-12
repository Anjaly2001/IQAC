from django.shortcuts import render
from .models import events
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import EventsSerializers
# Create your views here.

@api_view(['GET'])
def getEvents(request):
    if request.method=='GET':
        dept_obj=events.objects.all()
        serializer=EventsSerializers(dept_obj,many=True)
        return Response(serializer.data)
        
@api_view(['POST'])
def postEvents(request):
    if request.method=="POST":
        data=request.data 
        serializer=EventsSerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

@api_view(['PUT'])
def updateEvents(request):
    if request.method=='PUT':
        data=request.data 
        dept_obj=events.objects.get(id=data['id'])
        serializer=EventsSerializers(dept_obj,data=data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


@api_view(['DELETE'])
def deleteEvents(request):
    if request.method=="DELETE":
        data=request.data 
        dept_obj=events.objects.get(id=data['id'])   
        dept_obj.delete()
        return Response({"message":"successfully deleted"})
    
        




    
    