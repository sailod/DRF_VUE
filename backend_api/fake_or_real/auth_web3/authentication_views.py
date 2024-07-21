from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import login, authenticate
from django.core.cache import cache
from rest_framework_simplejwt.tokens import RefreshToken
import uuid


class Web3AuthView(APIView):
    def post(self, request):
        address = request.data.get("address")
        signature = request.data.get("signature")
        message_id = request.data.get("message_id")

        # Retrieve the stored message
        stored_message = cache.get(f"auth_message_{message_id}")
        if not stored_message:
            return Response(
                {"success": False, "error": "Invalid or expired message"}, status=400
            )

        user = authenticate(
            request, address=address, signature=signature, message=stored_message
        )
        if user:
            login(request, user)
            # Clear the used message
            cache.delete(f"auth_message_{message_id}")
            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "success": True,
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            )
        return Response({"success": False}, status=400)


class GetAuthMessageView(APIView):
    def get(self, request):
        unique_id = str(uuid.uuid4())
        message = f"Login to My App - Nonce: {unique_id}"

        # Store the message with the unique ID as the key
        cache.set(f"auth_message_{unique_id}", message, timeout=300)  # 5 minutes expiry

        return Response({"message": message, "id": unique_id})
