from django.contrib.auth.backends import BaseBackend
from web3 import Web3
from eth_account.messages import encode_defunct
from django.contrib.auth.models import User

class Web3AuthBackend(BaseBackend):
    def authenticate(self, request, address=None, signature=None, message=None):
        if not all([address, signature, message]):
            return None
        
        w3 = Web3()
        message_hash = encode_defunct(text=message)
        recovered_address = w3.eth.account.recover_message(message_hash, signature=signature)
        
        # We use email placeholder cause for web3 auth there's no email and we need to have one
        # Remove '0x' prefix if present and ensure lowercase
        email_placeholder = address.lower().replace('0x', '')
    
        # Take the first 4 and last 6 characters
        email_placeholder = address[:4] + address[-6:]

        if recovered_address.lower() == address.lower():
            # Create or get user
            user, created = User.objects.get_or_create(username=address, email=email_placeholder)
            return user
        return None