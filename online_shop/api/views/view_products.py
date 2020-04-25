from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView



from api.models import Product
from api.serializers import ProductSerializer


class AccessoriesDetailsAPIView(APIView):
    def get(self, request):
        product = list(Product.objects.filter(category_id=1))
        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data)



class PhonesDetailsAPIView(APIView):
    def get(self, request):
        product = list(Product.objects.filter(category_id=2))
        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data)


class TabletsDetailsAPIView(APIView):
    def get(self, request):
        product = list(Product.objects.filter(category_id=3))
        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data)


class WatchesDetailsAPIView(APIView):
    def get(self, request):
        product = list(Product.objects.filter(category_id=4))
        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data)


