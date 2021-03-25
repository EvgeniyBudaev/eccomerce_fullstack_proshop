from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from .models import Product, Order, OrderItem, ShippingAddress
from .products import products
from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, OrderSerializer


# Create your views here.


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  def validate(self, attrs):
    data = super().validate(attrs)

    serializer = UserSerializerWithToken(self.user).data
    for k, v in serializer.items():
      data[k] = v

    return data


class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
  data = request.data
  try:
    user = User.objects.create(
      first_name=data['name'],
      username=data['email'],
      email=data['email'],
      password=make_password(data['password'])
    )
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)
  except:
    message = {'detail': 'User with this email already exists'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
  user = request.user
  serializer = UserSerializerWithToken(user, many=False)
  data = request.data
  user.first_name = data['name']
  user.username = data['email']
  user.email = data['email']
  if data['password'] != '':
    user.password = make_password(data['password'])
  user.save()
  return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
  user = request.user
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
  users = User.objects.all()
  serializer = UserSerializer(users, many=True)
  # return JsonResponse(products, safe=False)
  return Response(serializer.data)


@api_view(['GET'])
def getProducts(request):
  products = Product.objects.all()
  serializer = ProductSerializer(products, many=True)
  # return JsonResponse(products, safe=False)
  return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
  product = Product.objects.get(_id=pk)
  serializer = ProductSerializer(product, many=False)
  return Response(serializer.data)


@api_view(['POST'])
@permission_classes(['IsAuthenticated'])
def addOrderItems(request):
  user = request.user
  data = request.data
  orderItems = data['orderItems']
  if orderItems and len(orderItems) == 0:
    return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
  else:
    # (1) Create order
    order = Order.objects.create(
      user=user,
      paymentMethod=data['paymentMethod'],
      taxPrice=data['taxPrice'],
      shippingPrice=data['shippingPrice'],
      totalPrice=data['totalPrice']
    )

    # (2) Create shipping address
    shipping = ShippingAddress.objects.create(
      order=order,
      address=data['shippingAddress']['address'],
      city=data['shippingAddress']['address'],
      postalCode=data['shippingAddress']['postalCode'],
      country=data['shippingAddress']['country'],
    )

    # (3) Create order items add set order to orderItem relationship
    for i in orderItems:
      product = Product.objects.get(_id=i['product'])

      item = OrderItem.objects.create(
        product=product,
        order=order,
        name=product.name,
        qty=i['qty'],
        price=i['price'],
        image=product.image.url,
      )

      # (4) Update stock

      product.countInStock -= item.qty
      product.save()

  serializer = OrderSerializer(order, many=True)
  return Response(serializer.data)
