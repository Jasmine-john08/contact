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

    # ✅ Generate JWT
    token = generate_jwt(user.id)

    # ✅ Save token in DB
    user.Token = token
    user.save()

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
    category_name = request.data.get("category")

    if not name or not number:
        return Response(
            {"error": "Name and Number required"},
            status=400
        )

    # ✅ CATEGORY LOGIC
    category = None

    if category_name:

        # remove spaces + make lowercase
        category_name = category_name.strip().title()

        # get existing or create new
        category, created = Category.objects.get_or_create(
            name=category_name
        )

    # ✅ CREATE CONTACT
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

@api_view(['GET'])
def get_contacts(request):
    user, error = get_user_from_token(request)

    if error:
        return error

    contacts = Contact.objects.filter(userid=user)
    data = ContactSerializer(contacts, many=True).data

    return Response(data, status=200)

@api_view(['DELETE'])
def delete_contact(request, id):

    user, error = get_user_from_token(request)

    if error:
        return error

    try:
        # ✅ only owner's contact
        contact = Contact.objects.get(id=id, userid=user)

    except Contact.DoesNotExist:
        return Response(
            {"error": "Contact not found"},
            status=404
        )

    contact.delete()

    return Response({
        "message": "Contact deleted successfully"
    }, status=200)

@api_view(['PUT'])
def update_contact(request,id):
    user, error=get_user_from_token(request)

    if error:
        return error
    
    try:
        contact=Contact.objects.get(id=id,userid=user)
    
    except Contact.DoesNotExist:
        return Response(
            {"error": "Contact not found"},
            status=404
        )
    
    contact.name=request.data.get("name")
    contact.Number=request.data.get("number")
    contact.email=request.data.get("email")

    contact.save()

    return Response({
        'message':"contact updated"
    })

@api_view(["PUT"])
def update_user(request):
    user,error=get_user_from_token(request)

    if error:
        return error
    try:

        name = request.data.get("name")
        email = request.data.get("email")
        password = request.data.get("password")

        # ✅ Update only if value exists
        if name:
            user.Name = name

        if email:
            user.Email = email

        if password:
            user.Password = make_password(password)

        user.save()

        return Response({
            "message": "User updated successfully",
            "user": {
                "id": user.id,
                "name": user.Name,
                "email": user.Email
            }
        }, status=200)

    except Exception as e:

        return Response({
            "error": str(e)
        }, status=500)
    
@api_view(["POST"])
def add_category(request):

    # ✅ Check user token
    user, error = get_user_from_token(request)

    if error:
        return error

    
    name = request.data.get("name")

    if not name:
        return Response(
            {"error": "Category name is required"},
            status=400
        )

    # ✅ Check already exists
    if Category.objects.filter(name=name).exists():
        return Response(
            {"error": "Category already exists"},
            status=400
        )

    # ✅ Create category
    category = Category.objects.create(
        name=name
    )

    # ✅ Response
    return Response({
        "message": "Category added successfully",
        "category": {
            "id": category.id,
            "name": category.name
        }
    }, status=201)

@api_view(['DELETE'])
def delete_category(request, id):
    user, error = get_user_from_token(request)

    if error:
        return error

    try:
        category = Category.objects.get(id=id)

    except Category.DoesNotExist:
        return Response(
            {"error": "Category not found"},
            status=404
        )

    category.delete()

    return Response(
        {"message": "Category deleted successfully"},
        status=200
    )

@api_view(["PUT"])
def update_category(request, id):

    user, error = get_user_from_token(request)

    if error:
        return error

    try:
        category = Category.objects.get(id=id)

    except Category.DoesNotExist:

        return Response(
            {"error": "Category not found"},
            status=404
        )

    # ✅ get new name
    new_name = request.data.get("name")

    if not new_name:

        return Response(
            {"error": "Category name required"},
            status=400
        )

    # ✅ update
    category.name = new_name

    # ✅ save
    category.save()

    return Response({

        "message": "Category updated successfully",

        "Category": {
            "id": category.id,
            "name": category.name
        }

    }, status=200)