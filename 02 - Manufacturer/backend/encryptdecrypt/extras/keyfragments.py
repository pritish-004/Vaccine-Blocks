from cryptography.exceptions import UnsupportedAlgorithm
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa


from umbral import pre, keys, signing, config
config.set_default_curve()


# Generate Umbral keys for Alice.
alices_private_key = keys.UmbralPrivateKey.gen_key()
alices_public_key = alices_private_key.get_pubkey()

alices_signing_key = keys.UmbralPrivateKey.gen_key()
alices_verifying_key = alices_signing_key.get_pubkey()
alices_signer = signing.Signer(private_key=alices_signing_key)

# Generate Umbral keys for Bob.

bobs_private_key = keys.UmbralPrivateKey.gen_key()
bobs_public_key = bobs_private_key.get_pubkey()

print(type(bobs_public_key))
decoded_public_key = keys.UmbralPublicKey.to_bytes(bobs_public_key)
print(decoded_public_key)
bobs_public_key_bytes=bytes(bobs_public_key)
bobs_public_key_str = bobs_public_key.hex()
print(bobs_public_key_str)

def Encrypt_public_key(plaintext,bobs_public_key_str):
  # Encrypt data with Alice's public key.
  plaintext = plaintext.encode('utf8')
  ciphertext, capsule = pre.encrypt(alices_public_key, plaintext)

  # Decrypt data with Alice's private key.
  cleartext = pre.decrypt(ciphertext=ciphertext,
                          capsule=capsule,
                          decrypting_key=alices_private_key)

  # Alice generates "M of N" re-encryption key fragments (or "KFrags") for Bob.
  # In this example, 4 out of 5.
  kfrags = pre.generate_kfrags(delegating_privkey=alices_private_key,
                              signer=alices_signer,
                              receiving_pubkey=bobs_public_key,
                              threshold=4,
                              N=5)
    
  # Several Ursulas perform re-encryption, and Bob collects the resulting `cfrags`.
  # He must gather at least `threshold` `cfrags` in order to activate the capsule.

  bobs_public_key_updated = keys.UmbralPublicKey.from_hex(bobs_public_key_str)

  capsule.set_correctness_keys(delegating=alices_public_key,
                              receiving=bobs_public_key_updated,
                              verifying=alices_verifying_key)

  cfrags = list()           # Bob's cfrag collection
  for kfrag in kfrags[:10]:
    cfrag = pre.reencrypt(kfrag=kfrag, capsule=capsule)
    cfrags.append(cfrag)    # Bob collects a cfrag

  # Bob activates and opens the capsule
  for cfrag in cfrags:
    capsule.attach_cfrag(cfrag)

  bob_cleartext = pre.decrypt(ciphertext=ciphertext,
                              capsule=capsule,
                              decrypting_key=bobs_private_key)
  assert bob_cleartext == plaintext

  print(bob_cleartext)

  print(kfrags)

if __name__ == '__main__':
    # demonstrate method
    Encrypt_public_key("Text that is going to be sent over","0314581b69cb85e8d63b932e0c70aa612e59083e33a3e20e344699067d6479057c")