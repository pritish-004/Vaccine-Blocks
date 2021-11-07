import base64
import logging
import qrcode 
import png 
import json 
import cv2

from cryptography.exceptions import UnsupportedAlgorithm
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, serialization 
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.asymmetric import rsa

# set up logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
from qrcode import QRCode 

def encrypt_package_data(sender_address,recipient,product_id1,product_id2,product_id3,product_id4,product_id5,package_id,password):
    """
    Asymmetric encryption of transaction data.
    - Generation of public and private RSA 2048
     bit keypair.(4096/8192 bits can be used)
    - 
    """
    plain_text_list = []
    password_bytes = password.encode('utf-8')
    plain_text_list.append(sender_address)
    plain_text_list.append(recipient)
    plain_text_list.append(product_id1)
    plain_text_list.append(product_id2)
    plain_text_list.append(product_id3)
    plain_text_list.append(product_id4)
    plain_text_list.append(product_id5)

    try:
        # LOAD KEYS
        with open("/home/pritish/Documents/python-blockchain/backend/encryptdecrypt/private_Dist.pem", "rb") as key_file:
            private_key_OEM = serialization.load_pem_private_key(
                data=key_file.read(),
                password=password_bytes,
                backend=default_backend()
            )
                
        with open("/home/pritish/Documents/python-blockchain/backend/encryptdecrypt/public_Dist.pem", "rb") as key_file:
            public_key_distributor = serialization.load_pem_public_key(
                data=key_file.read(),
                backend=default_backend()
            )

        # convert input of JSON type into string
        plain_text = json.dumps(str(plain_text_list))

        # SIGN DATA/STRING of the OEM
        signature = private_key_OEM.sign(
            data=plain_text.encode('utf-8'),
            padding=padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            algorithm=hashes.SHA256()
        )

        # ENCRYPTION of OEM's data
        cipher_text_bytes = public_key_distributor.encrypt(
            plaintext=plain_text.encode('utf-8'),
            padding=padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA512(),
                label=None
            )
        )

        # Conversion of raw bytes to BASE64 representation
        cipher_text = base64.urlsafe_b64encode(cipher_text_bytes)
        # write the encrypted data into QRcode
        url = qrcode.make(cipher_text)
        url.save('/home/pritish/Desktop/MF-QR-codes/packages/'+package_id+".png")
        url.save('/home/pritish/Documents/python-blockchain/frontend/src/assets/QR_code.png')

        return "Successful"

    except UnsupportedAlgorithm:
        logger.exception("Asymmetric encryption failed")

if __name__ == '__main__':
    encrypt_package_data(
        "Hello there, Pritish Here"
        )