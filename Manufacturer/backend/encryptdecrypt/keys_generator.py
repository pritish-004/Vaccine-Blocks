import logging
from random import SystemRandom
import os

from cryptography.exceptions import UnsupportedAlgorithm
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa

# set up logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def KeysGenerator(password,address):
    """
    Example for key storage of a asymmetric key in one method.
    - Random password generation using strong secure random number generator
    - Generation of public and private RSA 4096 bit keypair
    - Serialization of the private key using PEM encoding, PKCS8 format and a password
    - Serialization of the public key using PEM encoding and Subject Public Key Info
    - Writing and loading of the keys
    - Exception handling
    """
    try:
        # GENERATE password - use this incase of system generated random password
        if not password:
            alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            password = "".join(SystemRandom().choice(alphabet) for _ in range(20))
        logger.info(password)
        password_bytes = password.encode('utf-8')

        #remove previously generated public key private key files 
        path = os.getcwd()
        os.chdir("./keypairs")
        for file in os.listdir("."):
            if os.path.isfile(file) and file.startswith("man_p"):
                try:
                    print("Entered inside")
                    os.remove(file)
                except Exception as e:
                    print(e)
        os.chdir("..")
        
        # Generate new key pair files
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
            backend=default_backend()
        )
        public_key = private_key.public_key()

        # Serialisation of public and private keys 
        pem_private = private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.BestAvailableEncryption(password_bytes)
        )
        pem_public = public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        )

        # Write keys into pem files
        with open("./keypairs/man_priv_"+address+".pem", 'wb') as key_file:
            key_file.write(pem_private)
        with open("./keypairs/man_pub_"+address+".pem", 'wb') as key_file:
            key_file.write(pem_public)

        # Following is the verification code to ensure the private and public keys
        # and stored in pem file are successfully generated
        
        # load private key
        with open("./keypairs/man_priv_"+address+".pem", "rb") as key_file:
            private_key_after = serialization.load_pem_private_key(
                data=key_file.read(),
                password=password_bytes,
                backend=default_backend()
            )

        # load public key
        with open("./keypairs/man_pub_"+address+".pem", "rb") as key_file:
            public_key_after = serialization.load_pem_public_key(
                data=key_file.read(),
                backend=default_backend()
            )

        # CHECK whether keys are the same
        private_before = private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption()
        )
        private_after = private_key_after.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption()
        )
        public_before = pem_public
        public_after = public_key_after.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        )

        logger.info("Private Key before and after storage is the same: %s",
                    private_before == private_after)
        logger.info("Public Key before and after storage is the same: %s",
                    public_before == public_after)
    except (UnsupportedAlgorithm, ValueError, TypeError):
        logger.exception("Asymmetric key storage failed")

if __name__ == '__main__':
    # demonstrate method
    KeysGenerator("pritish123","lmnopqir")