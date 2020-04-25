import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.models import Category, Admin
from api.serializers import CategorySerializer1, AdminSerializer


@csrf_exempt
def category_list_ser(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer1(categories, many=True)

        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        request_body = json.loads(request.body)

        serializer = CategorySerializer1(data=request_body)
        if serializer.is_valid():  # Validate data from client
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse({'error': serializer.errors})


@csrf_exempt
def category_detail_ser(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist as e:
        return JsonResponse({'error': str(e)})

    if request.method == 'GET':
        serializer = CategorySerializer1(category)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        request_body = json.loads(request.body)

        serializer = CategorySerializer1(instance=category, data=request_body)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse({'error': serializer.errors})

    # Delete selected object
    elif request.method == 'DELETE':
        category.delete()

        return JsonResponse({'deleted': True})


def admin_list_ser(request):
    if request.method == 'GET':
        admins = Admin.objects.all()
        serializer = AdminSerializer(admins, many=True)

        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        request_body = json.loads(request.body)

        serializer = AdminSerializer(data=request_body)
        if serializer.is_valid():  # Validate data from client
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse({'error': serializer.errors})


@csrf_exempt
def admin_detail_ser(request, admin_id):
    try:
        admin = Admin.objects.get(id=admin_id)
    except Admin.DoesNotExist as e:
        return JsonResponse({'error': str(e)})

    if request.method == 'GET':
        serializer = AdminSerializer(admin)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        request_body = json.loads(request.body)

        serializer = AdminSerializer(instance=admin, data=request_body)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse({'error': serializer.errors})

    # Delete selected object
    elif request.method == 'DELETE':
        admin.delete()

        return JsonResponse({'deleted': True})
