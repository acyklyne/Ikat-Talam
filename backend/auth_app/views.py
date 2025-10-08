from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token
import json
import jwt
from datetime import datetime, timedelta

JWT_SECRET = 'your-secret-key'  # Should match frontend

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # Find user by email
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)

            # Authenticate user
            user_obj = authenticate(username=user.username, password=password)
            if user_obj is None:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)

            # Create JWT token
            token = jwt.encode({
                'userId': user.id,
                'email': user.email,
                'exp': datetime.utcnow() + timedelta(days=7)
            }, JWT_SECRET, algorithm='HS256')

            user_response = {
                'id': user.id,
                'name': user.first_name + ' ' + user.last_name,
                'email': user.email,
                'role': 'admin' if user.is_staff else 'user',
                'emailVerified': True,  # Assuming email verification is handled elsewhere
                'createdAt': user.date_joined.isoformat(),
            }

            response = JsonResponse({'user': user_response, 'token': token})
            response.set_cookie('auth-token', token, httponly=True, secure=False, samesite='strict', max_age=60*60*24*7)
            return response

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name', '')
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return JsonResponse({'error': 'Email and password are required'}, status=400)

            # Check if user already exists
            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'User already exists'}, status=400)

            # Split name into first and last name
            name_parts = name.split(' ', 1)
            first_name = name_parts[0]
            last_name = name_parts[1] if len(name_parts) > 1 else ''

            # Create user
            user = User.objects.create_user(
                username=email,  # Use email as username
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )

            user_response = {
                'id': user.id,
                'name': user.first_name + ' ' + user.last_name,
                'email': user.email,
                'role': 'user',
                'emailVerified': True,
                'createdAt': user.date_joined.isoformat(),
            }

            return JsonResponse({'user': user_response}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

def me_view(request):
    auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    if not auth_header.startswith('Bearer '):
        # Check cookie
        token = request.COOKIES.get('auth-token')
    else:
        token = auth_header[7:]

    if not token:
        return JsonResponse({'error': 'No token provided'}, status=401)

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        user = User.objects.get(id=payload['userId'])

        user_response = {
            'id': user.id,
            'name': user.first_name + ' ' + user.last_name,
            'email': user.email,
            'role': 'admin' if user.is_staff else 'user',
            'emailVerified': True,
            'createdAt': user.date_joined.isoformat(),
        }

        return JsonResponse({'user': user_response})

    except jwt.ExpiredSignatureError:
        return JsonResponse({'error': 'Token expired'}, status=401)
    except jwt.InvalidTokenError:
        return JsonResponse({'error': 'Invalid token'}, status=401)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        response = JsonResponse({'message': 'Logged out successfully'})
        response.delete_cookie('auth-token')
        return response

    return JsonResponse({'error': 'Method not allowed'}, status=405)

def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})
