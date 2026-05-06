from django.db import models

# Create your models here.
class Users(models.Model):
    Name=models.CharField(max_length=30)
    Email=models.EmailField(max_length=250)
    Password=models.CharField(max_length=50)
    Token=models.CharField(max_length=500)

class Category(models.Model):
    name=models.CharField(max_length=50)

class Contact(models.Model):
    name=models.CharField( max_length=50)
    Number=models.CharField(max_length=15)
    email=models.EmailField(max_length=254)
    Category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    userid=models.ForeignKey(Users, on_delete=models.SET_NULL, null=True, blank=True)
    created_time=models.DateTimeField(auto_now_add=True)
    updated_time=models.DateTimeField(auto_now=True)
