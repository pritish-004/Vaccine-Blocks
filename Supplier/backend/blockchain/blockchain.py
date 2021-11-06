from backend.blockchain.block import Block
from backend.wallet.transaction import Transaction
from backend.wallet.wallet import Wallet

class Blockchain:
    # Initialise blockchain with genesis block
    def __init__(self):
        self.chain = [Block.genesis()]

    # Add new block into blockchain
    def add_block(self, data):
        self.chain.append(Block.mine_block(self.chain[-1], data))

    # Representation of Blockchain on console
    def __repr__(self):
        return f'Blockchain: {self.chain}'

    # Replace local chain with incoming chain
    def replace_chain(self, chain):

        if len(chain) <= len(self.chain):
            raise Exception(' The replacement of incoming is unsucessful.')

        try:
            Blockchain.is_valid_chain(chain)
        except Exception as e:
            raise Exception(f'Cannot replace. The incoming chain is invalid: {e}')

        self.chain = chain

    # Convert Blockchain instance into JSON serialized format
    def to_json(self):
        return list(map(lambda block: block.to_json(), self.chain))

    # Convert Blockchain JSON serialised format into Blockchain instance
    @staticmethod
    def from_json(chain_json):
        blockchain = Blockchain()
        blockchain.chain = list(
            map(lambda block_json: Block.from_json(block_json), chain_json)
        )

        return blockchain

    #check if Blockchain is valid or not
    @staticmethod
    def is_valid_chain(chain):
        if chain[0] != Block.genesis():
            raise Exception('The genesis block must be valid')

        for i in range(1, len(chain)):
            block = chain[i]
            last_block = chain[i-1]
            Block.is_valid_block(last_block, block)

        Blockchain.is_valid_transaction_chain(chain)

    #Check if transactions within blocks of blockchain are valid or not.
    @staticmethod
    def is_valid_transaction_chain(chain):
        transaction_ids = set()

        for i in range(len(chain)):
            block = chain[i]

            for transaction_json in block.data:
                transaction = Transaction.from_json(transaction_json)

                if transaction.id in transaction_ids:
                    raise Exception(f'Transaction {transaction.id} is not unique')

                transaction_ids.add(transaction.id)

                historic_blockchain = Blockchain()
                historic_blockchain.chain = chain[0:i]
                historic_balance = Wallet.calculate_balance(
                    historic_blockchain,
                    transaction.input['address']
                )

                if historic_balance != transaction.input['quantity']:
                    raise Exception(
                        f'Transaction {transaction.id} has an invalid '\
                        'input quantity'
                    )

                Transaction.is_valid_transaction(transaction)