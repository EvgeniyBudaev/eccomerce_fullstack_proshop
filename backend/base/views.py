from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .products import products
from .serailizers import ProductSerializer

# Create your views here.


@api_view(['GET'])
def getRoutes(request):
  routes = [
    '/api/products/',
    '/api/products/create/',

    '/api/products/upload/',

    '/api/products/<id>/reviews/',

    '/api/products/top/',
    '/api/products/<id>/',

    '/api/products/delete/<id>/',
    '/api/products/<update>/<id>/'
  ]
  # return JsonResponse(routes, safe=False)  #  Если safe=False, то можно передать любой объект для преобразования в JSON (иначе – только dict)
  return Response(routes)


@api_view(['GET'])
def getProducts(request):
  products = Product.objects.all()
  serailizer = ProductSerializer(products, many=True)
  # return JsonResponse(products, safe=False)
  return Response(serailizer.data)


@api_view(['GET'])
def getProduct(request, pk):
  product = Product.objects.get(_id=pk)
  serailizer = ProductSerializer(product, many=False)
  return Response(serailizer.data)