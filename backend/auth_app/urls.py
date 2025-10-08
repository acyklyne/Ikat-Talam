from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('me/', views.me_view, name='me'),
    path('logout/', views.logout_view, name='logout'),
    path('csrf-token/', views.csrf_token_view, name='csrf_token'),
]
