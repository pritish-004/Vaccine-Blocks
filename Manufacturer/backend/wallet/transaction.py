import time
import uuid
import random

from backend.wallet.wallet import Wallet

class Transaction:
    def __init__(
        self,
        sender_wallet=None,
        recipient=None,
        rfid_id=None,
        product_id=None,
        product_name=None,
        package_id=None, 
        location=None,
        status=None,
        mfd_date=None,
        exp_date=None,
        quantity=0,
        id=None,
        output=None,
        input=None
    ):
        self.id = id or str(uuid.uuid4())[0:8]
        self.recipient = recipient or None
        self.rfid_id = rfid_id or random.randint(10000,90000)
        self.product_id = product_id or random.randint(10000,90000)
        self.product_name = product_name or 'Unknown'
        self.package_id = package_id or 'Unassigned'
        self.location = location or 'Unspecifed'
        self.status = status or 'Unknown'
        self.mfd_date = mfd_date or 'Unknown'
        self.exp_date = exp_date or 'Unknown'
        self.quantity = 0
        self.output = output or self.create_output(
            sender_wallet,
            recipient,
            quantity
        )
        self.input = input or self.create_input(sender_wallet, self.output)

    def create_output(self, sender_wallet, recipient, quantity):
        """
        The structure of output data for the transaction.
        """
        output = {}
        output[recipient] = quantity
        output[sender_wallet.address] = sender_wallet.balance - quantity

        return output

    def create_input(self, sender_wallet, output):
        """
        The structure of input data for the transaction.
        Includes transaction signature, sender_wallet address and the public key
        """
        return {
            'timestamp': time.time_ns(),
            'quantity': sender_wallet.balance,
            'address': sender_wallet.address,
            'public_key': sender_wallet.public_key,
            'signature': sender_wallet.sign(output)
        }

    def to_json(self):
        """
        Convert the transaction object into dictionary representation (JSON)
        """
        return self.__dict__

    @staticmethod
    def from_json(transaction_json):
        """
        Convert the transaction data in JSON format into transaction object
        """
        return Transaction(**transaction_json)

    @staticmethod
    def is_valid_transaction(transaction):
        """
        Validate an incoming transaction.
        If the transaction is invalid, raise an exception
        """
        output_total = sum(transaction.output.values())

        if transaction.input['quantity'] != output_total:
            raise Exception('Invalid product quantity')

        if not Wallet.verify(
            transaction.input['public_key'],
            transaction.output,
            transaction.input['signature']
        ):
            raise Exception('Invalid signature')