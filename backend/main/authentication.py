from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from .utils.jwt_utils import decode_jwt
from .models import Users


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return None  # or raise error if strict

        parts = auth_header.split()

        if len(parts) != 2:
            raise exceptions.AuthenticationFailed("Invalid Authorization header")

        prefix, token = parts

        if prefix.lower() != "bearer":
            raise exceptions.AuthenticationFailed("Invalid token prefix")

        try:
            decoded = decode_jwt(token)
        except Exception:
            raise exceptions.AuthenticationFailed("Invalid or expired token")

        try:
            user = Users.objects.get(id=decoded["user_id"])
        except Users.DoesNotExist:
            raise exceptions.AuthenticationFailed("User not found")

        return (user, None)