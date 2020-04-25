from django.db import models


class PublishedManager(models.Manager):
    def get_queryset(self):
        return super(PublishedManager, self).get_queryset().filter(active=True)  # Model Manager


class PublishedA(models.Manager):
    def get_queryset(self):
        return super(PublishedA, self).get_queryset().filter(role='A')


class Category(models.Model):
    name = models.CharField(max_length=100)
    objects = models.Manager()
    published = PublishedManager()
    filterA = PublishedA()

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
        }


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField(default=1000)
    description = models.TextField(default='')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return f'Product id={self.id}, ' \
               f'name= {self.name}, ' \
               f'description= {self.description}'

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'category': self.category,
        }


class Client(models.Model):
    name = models.CharField(max_length=100)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
        }


class Admin(models.Model):
    name = models.CharField(max_length=100)
    client = models.ForeignKey(Client, default=13, on_delete=models.CASCADE, related_name='products')

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'client': self.client,
        }


class CountManager(models.Manager):
    def get_queryset(self):
        return super(CountManager, self).get_queryset().count()


class Cart(models.Model):
    name = models.CharField(max_length=100, default="Product")
    price = models.FloatField(default=1000)
    objects = models.Manager()
    counts = CountManager()


    def str(self):
        return f'Product id={self.id}, ' \
               f'name= {self.name}, '

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,

        }
