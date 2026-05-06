from rest_framework import serializers
from .models import Users, Category, Contact

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'Name', 'Email', 'Password', 'Token']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'Number', 'email', 'Category', 'userid', 'created_time', 'updated_time']
