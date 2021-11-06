import time

from backend.util.crypto_hash import crypto_hash
from backend.util.hex_to_binary import hex_to_binary
from backend.config import MINE_RATE

# Genesis block in dictionary format
GENESIS_BLOCK = {
    'timestamp': 1,
    'last_hash': 'genesis_last_hash',
    'hash': 'genesis_hash',
    'data': [],
    'difficulty': 3,
    'nonce': 'genesis_nonce'
}

class Block:
    def __init__(self, timestamp, last_hash, hash, data, difficulty, nonce):
        self.timestamp = timestamp
        self.last_hash = last_hash
        self.hash = hash
        self.data = data
        self.difficulty = difficulty
        self.nonce = nonce

    def __repr__(self):
        return (
            'Block('
            f'timestamp: {self.timestamp}, '
            f'last_hash: {self.last_hash}, '
            f'hash: {self.hash}, '
            f'data: {self.data}, '
            f'difficulty: {self.difficulty}, '
            f'nonce: {self.nonce})'
        )

    # Compare two block instances
    def __eq__(self, other):
        return self.__dict__ == other.__dict__

    # Convert block instance into JSON format
    def to_json(self):
        return self.__dict__

    # create a block having timestamp, last_hash, current hash, difficulty, nonce
    @staticmethod
    def mine_block(last_block, data):
        timestamp = time.time_ns()
        last_hash = last_block.hash
        difficulty = Block.adjust_difficulty(last_block, timestamp)
        nonce = 0
        hash = crypto_hash(timestamp, last_hash, data, difficulty, nonce)

        while hex_to_binary(hash)[0:difficulty] != '0' * difficulty:
            nonce += 1
            timestamp = time.time_ns()
            difficulty = Block.adjust_difficulty(last_block, timestamp)
            hash = crypto_hash(timestamp, last_hash, data, difficulty, nonce)

        return Block(timestamp, last_hash, hash, data, difficulty, nonce)

    # create a block instance of genesis data stored in JSON format
    @staticmethod
    def genesis():
        return Block(**GENESIS_BLOCK)

    # convert genesis block instance into JSON format
    @staticmethod
    def from_json(block_json):
        return Block(**block_json)

    """
    Adjust difficulty of the block, 
    if block was mined too fast, increase the difficulty by 1
    if block was mined too slow, reduce the difficulty by 1
    """
    @staticmethod
    def adjust_difficulty(last_block, new_timestamp):
        if (new_timestamp - last_block.timestamp) < MINE_RATE:
            return last_block.difficulty + 1

        if (last_block.difficulty - 1) > 0:
            return last_block.difficulty - 1

        return 1

    """
    Check whether received block is valid or not. Following checks are performed
    1. Check hash of the last block in the local blockhain is same as last_hash value of the received block
    2. check the received block has exact leading number of zeroes as specified in difficulty field
    3. Check the difficulty value is adjusted by atmost 1
    4. Validate the hash value the incoming block by reconstructing the block hash
    """
    @staticmethod
    def is_valid_block(last_block, block):
        print(f'block.last_hash : {block.last_hash}')
        print(f'last_block.hash : {last_block.hash}')

        if block.last_hash != last_block.hash:
            raise Exception('The block last_hash must be correct')

        if hex_to_binary(block.hash)[0:block.difficulty] != '0' * block.difficulty:
            raise Exception('The proof of work requirement was not met')

        if abs(last_block.difficulty - block.difficulty) > 1:
            raise Exception('The block difficulty must only adjust by 1')

        # reconstruct the block hash to verify the hash of the received block is valid
        reconstructed_hash = crypto_hash(
            block.timestamp,
            block.last_hash,
            block.data,
            block.nonce,
            block.difficulty
        )

        if block.hash != reconstructed_hash:
            raise Exception('The block hash must be correct')
