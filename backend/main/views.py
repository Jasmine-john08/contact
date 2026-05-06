from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny

from .models import Users, Category, Contact
from .Serializer import UserSerializer, CategorySerializer, ContactSerializer
from .utils.jwt_utils import generate_jwt, decode_jwt


# -------------------- VIEWSETS --------------------

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


# -------------------- AUTH --------------------

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    name = request.data.get("name")   # ✅ consistent naming
    email = request.data.get("email")
    password = request.data.get("password")

    if not name or not email or not password:
        return Response({"error": "All fields are required"}, status=400)

    if Users.objects.filter(Email=email).exists():
        return Response({"error": "Email already exists"}, status=400)

    Users.objects.create(
        Name=name,
        Email=email,
        Password=make_password(password)
    )

    return Response({"message": "User created successfully"}, status=201)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def signin(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email and Password required"}, status=400)

    try:
        user = Users.objects.get(Email=email)
    except Users.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=400)

    if not check_password(password, user.Password):
        return Response({"error": "Invalid credentials"}, status=400)

    token = generate_jwt(user.id)

    return Response({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.Name,
            "email": user.Email
        }
    }, status=200)


# -------------------- HELPER --------------------

def get_user_from_token(request):
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return None, Response({"error": "Token missing"}, status=401)

    try:
        token = auth_header.split(" ")[1]
        payload = decode_jwt(token)

        if not payload:
            return None, Response({"error": "Invalid or expired token"}, status=401)

        user_id = payload.get("user_id")
        user = Users.objects.get(id=user_id)

        return user, None

    except Exception as e:
        return None, Response({"error": str(e)}, status=401)


# -------------------- CONTACT APIs --------------------

@api_view(['POST'])
def add_contact(request):
    user, error = get_user_from_token(request)

    if error:
        return error

    name = request.data.get("name")
    number = request.data.get("number")
    email = request.data.get("email")
    category_id = request.data.get("category")

    if not name or not number:
        return Response({"error": "Name and Number required"}, status=400)

    # ✅ Handle category
    category = None
    if category_id:
        try:
            category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            return Response({"error": "Invalid category"}, status=400)

    try:
        contact = Contact.objects.create(
            name=name,
            Number=number,
            email=email,
            userid=user,
            Category=category
        )

        return Response({
            "message": "Contact added successfully",
            "contact": ContactSerializer(contact).data
        }, status=201)

    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(['GET'])
def get_contacts(request):
    user, error = get_user_from_token(request)

    if error:
        return error

    contacts = Contact.objects.filter(userid=user)
    data = ContactSerializer(contacts, many=True).data

    return Response(data, status=200)