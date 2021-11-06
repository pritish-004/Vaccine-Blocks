import os
import requests
import random
import uuid
import time

from flask import Flask, jsonify, request
from flask_cors import CORS

from backend.blockchain.blockchain import Blockchain
from backend.wallet.wallet import Wallet
from backend.wallet.transaction import Transaction
from backend.wallet.transaction_pool import TransactionPool
from backend.encryptdecrypt.keys_generator import KeysGenerator
from backend.encryptdecrypt.package_encryption import encrypt_package_data
from backend.pubsub import PubSub

from collections import defaultdict 

counter = 1000
package_counter = 100
app = Flask(__name__)
# Disable temporary CORS policy to allow front end to access resources at backend
CORS(app, resources={ r'/*': { 'origins': 'http://localhost:3000' } })
blockchain = Blockchain()
wallet = Wallet(blockchain)
transaction_pool = TransactionPool()
pubsub = PubSub(blockchain, transaction_pool)
KeysGenerator(password="pritish123",address=wallet.address)

# Default route
@app.route('/')
def route_default():
    return 'Blockchain SupplyChain'

# Blockchain route
@app.route('/blockchain')
def route_blockchain():
    return jsonify(blockchain.to_json())

# Fetch blockchain data from start value to a end value 
@app.route('/blockchain/range')
def route_blockchain_range():
    # http://localhost:5000/blockchain/range?start=2&end=5
    start = int(request.args.get('start'))
    end = int(request.args.get('end'))

    return jsonify(blockchain.to_json()[::-1][start:end])

# Calculate length of blockchain data
@app.route('/blockchain/length')
def route_blockchain_length():
    return jsonify(len(blockchain.chain))

# Calculate length of blockchain data
@app.route('/package-id-counter')
def package_id_counter():
    global package_counter
    package_counter = package_counter + 1
    return jsonify(package_counter)

# Add block into the blockchain 
@app.route('/blockchain/mine')
def route_blockchain_mine():
    transaction_data = transaction_pool.transaction_data()
    blockchain.add_block(transaction_data)
    block = blockchain.chain[-1]
    pubsub.broadcast_block(block)
    transaction_pool.clear_blockchain_transactions(blockchain)

    return jsonify(block.to_json())

# Create transaction and broacast it among the peer nodes
@app.route('/wallet/transact', methods=['POST'])
def route_wallet_transact():
    transaction_data = request.get_json()
    transaction = Transaction(
        wallet,
        transaction_data['recipient'],
        transaction_data['rfid_id'],
        transaction_data['product_id'],
        transaction_data['product_name'],
        transaction_data['package_id'],
        transaction_data['location'],
        transaction_data['status'],
        transaction_data['mfd_date'],
        transaction_data['exp_date'],
        transaction_data['quantity']
    )

    pubsub.broadcast_transaction(transaction)
    time.sleep(1)

    return jsonify(transaction.to_json())

# Fetch the terminal address and quantity of products in inventory
@app.route('/wallet/info')
def route_wallet_info():
    return jsonify({ 'address': wallet.address, 'balance': wallet.balance })

# Fetch the addresses of the participants in blockchain network
@app.route('/known-addresses')
def route_known_addresses():
    known_addresses = set()

    for block in blockchain.chain:
        for transaction in block.data:
            known_addresses.update(transaction['output'].keys())

    if str(wallet.address) in known_addresses:
        known_addresses.remove(str(wallet.address))

    if "self" in known_addresses:
        known_addresses.remove("self")

    return jsonify(list(known_addresses))

# Fetch the products available in the inventory/storage
@app.route('/fetch-products-inv')
def fetch_products_inv():
    transaction_list = []
    product_id_list = {}
    
    for block in blockchain.chain:
        for transaction in block.data:
            if(transaction.get("product_id") in product_id_list):
                product_id_list[transaction.get("product_id")] += 1 
            else:
                product_id_list[transaction.get("product_id")] = 1
    for block in blockchain.chain:
        for transaction in block.data:
            transaction_fetch = transaction
            if (transaction.get("recipient") == "self" and transaction.get("status") == "M-Inventory"):
                if (product_id_list[transaction.get("product_id")] == 1):
                    transaction_list.append(transaction_fetch)       
    transaction_list_sorted = sorted(transaction_list, key = lambda t : t['product_id'])
    return jsonify(transaction_list_sorted)
    
# Encrypt the package details into an encrypyted QRcode
@app.route('/encrypt-package-details', methods=['POST'])
def encrypt_package_details():
    package_data = request.get_json()
    message = encrypt_package_data(wallet.address,package_data['recipient'],package_data['product_id1'],\
    package_data['product_id2'],package_data['product_id3'],package_data['product_id4'],\
    package_data['product_id5'],package_data['package_id'], package_data['password'])
    if(message == "Successful"):
        return jsonify("Package Encryption Successful")
    else:
        return jsonify("Package Encryption Failed")

# Fetch the product details to display on product status chart
@app.route('/check-status')
def check_transaction_status():
    transaction_list = []
    product_id_list = {}

    for block in blockchain.chain:
        for transaction in block.data:
            if(transaction.get("product_id") in product_id_list):
                product_id_list[transaction.get("product_id")] += 1 
            else:
                product_id_list[transaction.get("product_id")] = 1

    for block in blockchain.chain:
        for transaction in block.data:
            transaction_display = transaction
            if (transaction.get("status") == "M-Inventory" and product_id_list[transaction.get("product_id")] == 1):
                transaction_display["S1"] = "##>"
                transaction_display["S2"] = " "
                transaction_display["S3"] = " "
                transaction_display["S4"] = " "
                transaction_display["S5"] = " "
                transaction_display["S5"] = " "
                transaction_display["S6"] = " "
                transaction_list.append(transaction_display) 
            elif (transaction.get("status") =="M-D Transit" and product_id_list[transaction.get("product_id")] == 2):
                transaction_display["S1"] = "## "
                transaction_display["S2"] = "##>"
                transaction_display["S3"] = " "
                transaction_display["S4"] = " "
                transaction_display["S5"] = " "
                transaction_display["S6"] = " "
                transaction_list.append(transaction_display) 
            elif (transaction.get("status") =="D-Inventory" and product_id_list[transaction.get("product_id")] == 3):
                transaction_display["S1"] = "##"
                transaction_display["S2"] = "##"
                transaction_display["S3"] = "##>"
                transaction_display["S4"] = " "
                transaction_display["S5"] = " "
                transaction_display["S6"] = " "
                transaction_list.append(transaction_display)       
    transaction_list_sorted = sorted(transaction_list, key = lambda t : t['product_id'])
    return jsonify(transaction_list_sorted)


@app.route('/transactions')
def route_transactions():
    return jsonify(transaction_pool.transaction_data())

ROOT_PORT = 5000
PORT = ROOT_PORT

# Set PEER environment variable to TRUE If you want to run multiple instances of the backend.
if os.environ.get('PEER') == 'True':
    # romdomly select port number
    PORT = random.randint(5001, 6000)

    # fetch blockchain data from ROOT node
    result = requests.get(f'http://localhost:{ROOT_PORT}/blockchain')
    result_blockchain = Blockchain.from_json(result.json())

    try:
        blockchain.replace_chain(result_blockchain.chain)
        print('\n -- Successfully synchronized the local chain')
    except Exception as e:
        print(f'\n -- Error synchronizing: {e}')

products_list = ["Cheese", "Biscuits" , "Ketchup"]
city_list = ["Bengaluru", "Pune" , "Mumbai"]

# Set SEED_DATA environment variable to TRUE to plug in initial data for initiation 

if os.environ.get('SEED_DATA') == 'True':
    for i in range(2):
        blockchain.add_block([
            Transaction(wallet, Wallet().address,str(uuid.uuid4()), "MUM-100"+str(i),random.choice(products_list),'MUM-PKG-100'+str(i),"Mumbai",'M-Inventory','8/22/2020','8/22/2030', 0).to_json(),
            Transaction(wallet, Wallet().address,str(uuid.uuid4()), "PUN-100"+str(i),random.choice(products_list),'PUN-PKG-100'+str(i),"Pune",'M-D Transit','8/22/2020','8/22/2030', 0).to_json()
        ])
app.run(port=PORT)