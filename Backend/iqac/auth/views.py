from django.contrib.auth import login
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from auth.serializer import UserSerializer, UserLoginSerializer


@api_view(['POST'])
def user_login(request):
    """
    Authenticate a user with a username and password.
    :param request: NA
    :request body: {"username": "username", "password": "password"}
    :return: {"data":{"access_token":"","refresh_token":""}, "user":"","role":""}
    """
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            refresh = RefreshToken.for_user(user)
            if user.is_superuser or user.is_staff:
                role = "Admin"
            else:
                role = "User"
            return Response({
                "data": {
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                },
                'user': user.username,
                'role': role,
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_token_refresh(request):
    if request.method == 'POST':
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({"error": "Refresh token is missing"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            return Response({"access_token": access_token}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated,IsAdminUser])
def user_register(request):
    if not request.user.is_superuser:
        return Response({"error": "Only admin users can perform user registration."},
                        status=status.HTTP_403_FORBIDDEN)

    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data, "message": "registration successful"},
                            status=status.HTTP_201_CREATED)
        return Response({"data": serializer.errors, "message": "Some error occurred"},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({"error": "Refresh token is missing"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            refresh = RefreshToken(refresh_token)
            refresh.blacklist()
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
