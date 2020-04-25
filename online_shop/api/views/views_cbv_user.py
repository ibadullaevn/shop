from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Client, Admin
from api.serializers import ClientSerializer, AdminSerializer


class ClientListAPIView(APIView):
    def get(self, request):
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # permission_classes = (IsAuthenticated,)


class ClientDetailsAPIView(APIView):
    def get_object(self, id):
        try:
            return Client.objects.get(id=id)
        except Client.DoesNotExist as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, client_id):
        client = self.get_object(client_id)
        serializer = ClientSerializer(client)
        return Response(serializer.data)

    def put(self, request, client_id):
        client = self.get_object(client_id)
        serializer = ClientSerializer(instance=client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_426_UPGRADE_REQUIRED)
        return Response({'error': serializer.errors}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, client_id):
        client = self.get_object(client_id)
        client.delete()
        return Response({'deleted': True})


class AdminListAPIView(APIView):
    def get(self, request):
        admins = Admin.objects.all()
        serializer = AdminSerializer(admins, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AdminSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AdminDetailsAPIView(APIView):
    def get_object(self, id):
        try:
            return Admin.objects.get(id=id)
        except Admin.DoesNotExist as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, admin_id):
        admin = self.get_object(admin_id)
        serializer = AdminSerializer(admin)
        return Response(serializer.data)

    def put(self, request, admin_id):
        admin = self.get_object(admin_id)
        serializer = AdminSerializer(instance=admin, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_426_UPGRADE_REQUIRED)
        return Response({'error': serializer.errors}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, admin_id):
        admin = self.get_object(admin_id)
        admin.delete()
        return Response({'deleted': True})
