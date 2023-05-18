import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Transaction from './Transaction';
import {API_BASE_URL, SECONDS_JS} from '../config';
import history from '../history';

const POLL_INTERVAL = 10 * SECONDS_JS;

function TransactionPool() {
    const [transactionList, setTransactionList] = useState([]);

    const fetchTransactions = () => {
        fetch(`${API_BASE_URL}/transactions`)
            .then(response => response.json())
            .then(json => {
                console.log('transactions json', json);

                setTransactionList(json);
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
            <br/>
            <Link to="/">Home</Link>
            <hr/>
            <Link to="/product-transaction"> Add more products </Link>
            <hr/>
            <h3>Newly arrived packages, Waiting to be added in Blockchain</h3>
            <div>
                {
                    transactionList.map(transaction => (
                        <div key={transaction.id}>
                            <hr/>
                            <Transaction transaction={transaction}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TransactionPool;