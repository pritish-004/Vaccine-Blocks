import base64
import logging

import qrcode 
import png 


from cryptography.exceptions import UnsupportedAlgorithm
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, serialization 
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.asymmetric import rsa

# set up logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
from qrcode import QRCode 

def demonstrate_asymmetric_string_encryption(plain_text):
    """
    Example for asymmetric encryption and decryption of a string in one method.
    - Generation of public and private RSA 4096 bit keypair
    - RSA encryption and decryption of text using OAEP and MGF1 padding
    - BASE64 encoding as representation for the byte-arrays
    - UTF-8 encoding of Strings
    - Exception handling
    """
    
    password = "RXiia2LmRZZnppNZp8Hq"
    password_bytes = password.encode('utf-8')

    password2 = "LeYWfiI6VoSXVZif4o6v"
    password_bytes2 = password2.encode('utf-8')

    try:
        # LOAD KEYS
        with open("private_manufacturer.pem", "rb") as key_file:
            private_key_manufacturer = serialization.load_pem_private_key(
                data=key_file.read(),
                password=password_bytes,
                backend=default_backend()
            )
        
        with open("public_manufacturer.pem", "rb") as key_file:
            public_key_manufacturer = serialization.load_pem_public_key(
                data=key_file.read(),
                backend=default_backend()
            )

        with open("private_supplier.pem", "rb") as key_file:
            private_key_supplier = serialization.load_pem_private_key(
                data=key_file.read(),
                password=password_bytes2,
                backend=default_backend()
            )
        
        with open("public_supplier.pem", "rb") as key_file:
            public_key_supplier = serialization.load_pem_public_key(
                data=key_file.read(),
                backend=default_backend()
            )

        # SIGN DATA/STRING
        signature = private_key_manufacturer.sign(
            data=plain_text.encode('utf-8'),
            padding=padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            algorithm=hashes.SHA256()

        )
        #logger.info("Signature: %s", base64.urlsafe_b64encode(signature))

        # ENCRYPTION
        cipher_text_bytes = public_key_supplier.encrypt(
            plaintext=plain_text.encode('utf-8'),
            padding=padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA512(),
                label=None
            )
        )
        # CONVERSION of raw bytes to BASE64 representation
        cipher_text = base64.urlsafe_b64encode(cipher_text_bytes)

        print(type(cipher_text))
        url = qrcode.make(str(cipher_text))
        url.save('myQRcode.png')

        # DECRYPTION
        decrypted_cipher_text_bytes = private_key_supplier.decrypt(
            ciphertext=base64.urlsafe_b64decode(cipher_text),
            padding=padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA512(),
                label=None
            )
        )

        print(decrypted_cipher_text_bytes)

                # VERIFY JUST CREATED SIGNATURE USING PUBLIC KEY
        try:
            public_key_manufacturer.verify(
                signature=signature,
                data=plain_text.encode('utf-8'),
                padding=padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                algorithm=hashes.SHA256()
            )
            is_signature_correct = True
        except InvalidSignature:
            is_signature_correct = False

        logger.info("Signature is correct: %s", is_signature_correct)

        decrypted_cipher_text = decrypted_cipher_text_bytes.decode('utf-8')

        logger.info("Decrypted and original plain text are the same: %s",
                    decrypted_cipher_text == plain_text)
    
    except UnsupportedAlgorithm:
        logger.exception("Asymmetric encryption failed")


if __name__ == '__main__':
    # demonstrate method
    demonstrate_asymmetric_string_encryption(
        "Text that is going to be sent over an insecure channel and must be "
        "encrypted at all costs!"
        "encrypted at all costs!"
        "encrypted at all costs!"
        "encrypted at all costs!"
        "encrypted at all costs!"
        "encrypted at all costs!"
        "encrypted at all costs!"
        )