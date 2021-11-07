import base64
import logging
import qrcode 
import png 
import json 
import cv2

from qrcode import QRCode

def product_qrcode_generation(plain_text_json):

    #print(plain_text_json)

    #Fetch recipient from input data
    product_id = plain_text_json['product_id']
    #Remove obvious fields from input to ensure successful encryption and decryption(2048 bits restricts size) 
    del plain_text_json['recipient']
    del plain_text_json['package_id']
    del plain_text_json['id']
    del plain_text_json['status']
    del plain_text_json['quantity']
    del plain_text_json['input']
    del plain_text_json['output']
    
    #print(plain_text_json)

    # convert input of JSON type into string
    #plain_text = json.dumps(str(plain_text_json_values))

    # write the encrypted data into QRcode
    url = qrcode.make(plain_text_json)

    url.save('/home/pritish/Desktop/MF-QR-codes/products/'+product_id+".png")
    #url.save('/home/pritish/Documents/python-blockchain/frontend/src/assets/QR_code.png')

if __name__ == '__main__':
    product_qrcode_generation(
        "Hello there, Pritish Here"
        )