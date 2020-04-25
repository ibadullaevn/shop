from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Category, Product, Cart

from api.models import Category, Product, Client


class CategorySerializer1(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class ClientSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()

    def create(self, validated_data):
        return Client.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class CategorySerializer2(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer2(read_only=True)
    category_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'description', 'category', 'category_id',)




class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class AdminSerializer(serializers.ModelSerializer):
    client = CategorySerializer2(read_only=True)
    client_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'client', 'client_id',)

class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = ('id', 'name', 'price',)
