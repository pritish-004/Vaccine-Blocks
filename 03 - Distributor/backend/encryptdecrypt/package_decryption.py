import base64
import logging
import qrcode 
import png 
import json 
import cv2
from pyzbar.pyzbar import decode, ZBarSymbol

from cryptography.exceptions import UnsupportedAlgorithm
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, serialization 
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.asymmetric import rsa

# set up logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
from qrcode import QRCode 

def decrypt_package_data(plain_text_json):

    password2 = plain_text_json['password']
    package_id = plain_text_json['package_id']
    del plain_text_json['password']
    password_bytes2 = password2.encode('utf-8')

    try:
        # LOAD KEYS
        with open("/home/pritish/Documents/python-blockchain/backend/encryptdecrypt/private_Dist.pem", "rb") as key_file:
            private_key_distributor = serialization.load_pem_private_key(
                data=key_file.read(),
                password=password_bytes2,
                backend=default_backend()
            )
        
        with open("/home/pritish/Documents/python-blockchain/backend/encryptdecrypt/public_OEM.pem", "rb") as key_file:
            public_key_distributor = serialization.load_pem_public_key(
                data=key_file.read(),
                backend=default_backend()
            )

        # read the QRCODE image
        qr_read_data = cv2.imread("/home/pritish/Documents/python-blockchain/MF-QR-codes/packages/"+package_id+".png")
        # initialize the cv2 QRCode detector
        codes = decode(qr_read_data)
        cipher_text = codes[0][0]

        # DECRYPTION process
        decrypted_cipher_text_bytes = private_key_distributor.decrypt(
            ciphertext=base64.urlsafe_b64decode(cipher_text),
            padding=padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA512(),
                label=None
            )
        )
        result = decrypted_cipher_text_bytes.decode('utf-8')

        # convert input list in string format into python list
        unnecessary_chars = ['\'','\"','\\', '[', ']',' '] 
        for char in unnecessary_chars :
            res = result.replace(char, '')
        res2 = ''.join(i for i in result if not i in unnecessary_chars)

        res2_list = list(res2.split(","))
        return res2_list
    except UnsupportedAlgorithm:
        logger.exception("Asymmetric encryption failed")
        return('Asymmetric encryption failed')

if __name__ == '__main__':
    # demonstrate method
    encrypt_transaction_data(
        "Text that is going to be sent over"
        )