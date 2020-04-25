from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Cart
from api.serializers import CartSerializer


class CartListAPIView(APIView):
    def get(self, request):
        products = Cart.objects.all()
        serializer = CartSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CartItemAPIView(APIView):
    def get_object(self, id):
        try:
            return Cart.objects.get(id=id)
        except Cart.DoesNotExist as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
    def delete(self, request, item_id):
        product = self.get_object(item_id)
        product.delete()
        return Response({'deleted': True})

class CartItemCount(APIView):
        def get(self, request):
            return Response(Cart.counts.all())

