from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CategoryViewSet, ContactViewSet,signup,signin,add_contact,get_contacts,delete_contact
from .views import update_contact,update_user,add_category,delete_category,update_category

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'contacts', ContactViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', signup),
    path('signin/',signin),
    path('add_contact/',add_contact),
    path('get_contacts/',get_contacts),
    path('delete_contacts/<int:id>/',delete_contact),
    path('update_contact/<int:id>/',update_contact),
    path('update_user/',update_user),
    path('add_category/',add_category), 
    path('delete_category/<int:id>/',delete_category),
    path('update_category/<int:id>/',update_category)
]
