from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions

from api.filters import ProductFilter
from api.serializers import UserSerializer
from django_filters.rest_framework import DjangoFilterBackend


from api.models import Category, Product
from api.serializers import CategorySerializer2, ProductSerializer


class CategoryListAPIView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer2(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # permission_classes = (IsAuthenticated,)


class CategoryDetailsAPIView(APIView):
    def get_object(self, id):
        try:
            return Category.objects.get(id=id)
        except Category.DoesNotExist as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, category_id):
        category = self.get_object(category_id)
        serializer = CategorySerializer2(category)
        return Response(serializer.data)

    def put(self, request, category_id):
        category = self.get_object(category_id)
        serializer = CategorySerializer2(instance=category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_426_UPGRADE_REQUIRED)
        return Response({'error': serializer.errors}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, category_id):
        category = self.get_object(category_id)
        category.delete()
        return Response({'deleted': True})


class ProductListAPIView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProductDetailsAPIView(APIView):
    def get_object(self, id):
        try:
            return Product.objects.get(id=id)
        except Product.DoesNotExist as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, product_id):
        product = self.get_object(product_id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, product_id):
        product = self.get_object(product_id)
        serializer = ProductSerializer(instance=product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_426_UPGRADE_REQUIRED)
        return Response({'error': serializer.errors}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, product_id):
        product = self.get_object(product_id)
        product.delete()
        return Response({'deleted': True})




class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProductListAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend,)
    filter_class = ProductFilter
