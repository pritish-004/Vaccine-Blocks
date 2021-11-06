class TransactionPool:
    def __init__(self):
        self.transaction_map = {}

    """
    Add a transaction into transaction pool
    """
    def set_transaction(self, transaction):
        self.transaction_map[transaction.id] = transaction

    """
    retreive transaction data from the transaction pool.
    the tranasaction objects are converted into JSON serialised form
    """
    def transaction_data(self):
        return list(map(
            lambda transaction: transaction.to_json(),
            self.transaction_map.values()
        ))

    """
    Delete the transactions from the transaction pool which are already recorded in blockchain.
    """
    def clear_blockchain_transactions(self, blockchain):
        for block in blockchain.chain:
            for transaction in block.data:
                try:
                    del self.transaction_map[transaction['id']]
                except KeyError:
                    pass