class TransactionPool:
    def __init__(self):
        self.transaction_map = {}

    def set_transaction(self, transaction):
        """
        Add a transaction into transaction pool
        """
        self.transaction_map[transaction.id] = transaction

    def transaction_data(self):
        """
        retreive transaction data from the transaction pool.
        the tranasaction objects are converted into JSON serialised form
        """
        return list(map(
            lambda transaction: transaction.to_json(),
            self.transaction_map.values()
        ))

    def clear_blockchain_transactions(self, blockchain):
        """
        Delete the transactions from the transaction pool which are already recorded in blockchain.
        """
        for block in blockchain.chain:
            for transaction in block.data:
                try:
                    del self.transaction_map[transaction['id']]
                except KeyError:
                    pass