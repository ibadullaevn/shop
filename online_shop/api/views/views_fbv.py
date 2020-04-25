from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Category, Product
from api.serializers import CategorySerializer2, ProductSerializer


@api_view(['GET', 'POST'])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer2(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CategorySerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT', 'DELETE'])
def category_details(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CategorySerializer2(category)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CategorySerializer2(instance=category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response({'error': serializer.errors}, status=status.HTTP_406_NOT_ACCEPTABLE)
    elif request.method == 'DELETE':
        category.delete()
        return Response({'deleted': True}, status=status.HTTP_202_ACCEPTED)


@api_view(['GET', 'POST'])
def product_list(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT', 'DELETE'])
def product_details(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist as e:
        return Response({'error': str(e)})

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProductSerializer(instance=product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_426_UPGRADE_REQUIRED)
        return Response({'error': serializer.errors}, status=status.HTTP_406_NOT_ACCEPTABLE)

    elif request.method == 'DELETE':
        product.delete()
        return Response({'deleted': True}, status=status.HTTP_426_UPGRADE_REQUIRED)
