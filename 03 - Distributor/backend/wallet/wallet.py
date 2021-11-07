import json
import uuid

from backend.config import STARTING_BALANCE
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.asymmetric.utils import (
    encode_dss_signature,
    decode_dss_signature
)
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.exceptions import InvalidSignature

class Wallet:
    """
    An individual wallet for every ssupplychain party.
    keeps track of quntity of products available in the inventory/storage.
    """
    def __init__(self, blockchain=None):
        self.blockchain = blockchain
        self.address = str(uuid.uuid4())[0:8]
        self.private_key = ec.generate_private_key(
            ec.SECP256K1(),
            default_backend()
        )
        self.public_key = self.private_key.public_key()
        self.serialize_public_key()

    # return the quantity of products in the inventory
    @property
    def balance(self):
        return Wallet.calculate_balance(self.blockchain, self.address)

    """
    create a signature of the transaction data using the local private key.
    """
    def sign(self, data):
        return decode_dss_signature(self.private_key.sign(
            json.dumps(data).encode('utf-8'),
            ec.ECDSA(hashes.SHA256())
        ))

    """
    convert public key in bytes into serialised format 
    """
    def serialize_public_key(self):
        self.public_key = self.public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        ).decode('utf-8')
        
    """
    verify a signature using the public key and the transaction data 
    """
    @staticmethod
    def verify(public_key, data, signature):
        deserialized_public_key = serialization.load_pem_public_key(
            public_key.encode('utf-8'),
            default_backend()
        )

        (r, s) = signature

        try:
            deserialized_public_key.verify(
                encode_dss_signature(r, s),
                json.dumps(data).encode('utf-8'),
                ec.ECDSA(hashes.SHA256())    
            )
            return True
        except InvalidSignature:
            return False

    """
    Calculate the balance of products in the inventory of the given terminal address 
    using the transaction data within the blockchain. The balance is found by adding 
    the output values that belong to the address since the most recent transaction by that address.
    """
    @staticmethod
    def calculate_balance(blockchain, address):
        balance = STARTING_BALANCE

        if not blockchain:
            return balance

        for block in blockchain.chain:
            for transaction in block.data:
                if transaction['input']['address'] == address:
                    # Any time the address conducts a new transaction it resets
                    # its balance
                    balance = transaction['output'][address]
                elif address in transaction['output']:
                    balance += transaction['output'][address]

        return balance
