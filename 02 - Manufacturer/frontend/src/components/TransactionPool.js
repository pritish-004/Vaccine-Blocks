import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Transaction from './Transaction';
import { API_BASE_URL, SECONDS_JS } from '../config';
import history from '../history';

const POLL_INTERVAL = 10 * SECONDS_JS;

function TransactionPool() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = () => {
    fetch(`${API_BASE_URL}/transactions`)
      .then(response => response.json())
      .then(json => {
        console.log('transactions json', json);

        setTransactions(json);
      });
  }

  useEffect(() => {
    fetchTransactions();

    const intervalId = setInterval(fetchTransactions, POLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const fetchMineBlock = () => {
    fetch(`${API_BASE_URL}/blockchain/mine`)
      .then(() => {
        alert('Success!');

        history.push('/blockchain');
      });
  }

  return (
    <div className="TransactionPool">
      <br />
      <Link to="/">Home</Link>
      <hr />
      <Link to="/product-transaction"> Add more products </Link>
      <hr />
      <h3>Newly arrived packages, Waiting to be added in Blockchain</h3>
      <div>
        {
          transactions.map(transaction => (
            <div key={transaction.id}>
              <hr />
              <Transaction transaction={transaction} />
            </div>
          ))
        }
      </div>
      <Button
        variant="danger"
        onClick={fetchMineBlock}
      >
        Add a block of these transactions into BC
      </Button>
      <br />
      <br />
    </div>
  )
}

export default TransactionPool;