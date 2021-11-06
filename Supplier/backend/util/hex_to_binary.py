from backend.util.crypto_hash import crypto_hash

hexadecimal_to_binary = { 
    '0': '0000', '1': '0001', '2': '0010', '3': '0011', 
    '4': '0100','5': '0101', '6': '0110','7': '0111', 
    '8': '1000','9': '1001', 'a': '1010', 'b': '1011',
    'c': '1100', 'd': '1101', 'e': '1110', 'f': '1111'
}

def hex_to_binary(hex_string):
    binary_string = ''

    for character in hex_string:
        binary_string += hexadecimal_to_binary[character]

    return binary_string
