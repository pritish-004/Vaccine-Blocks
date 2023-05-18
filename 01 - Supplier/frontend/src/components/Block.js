import React, {useState} from 'react';
import {Button} from 'react-bootstrap/Button';
import {MILLISECONDS_PY} from '../config';
import Transaction from './Transaction';

function ToggleTransactionDisplay({block}) {
    const [displayTransaction, setDisplayTransaction] = useState(false);
    const {data} = block;

    // toggle display transaction to maximise and minimise the bloack data
    const toggleDisplayTransaction = () => {
        setDisplayTransaction(!displayTransaction);
    }

    if (displayTransaction) {
        return (
            <div>
                {
                    data.map(transaction => (
                        <div key={transaction.id}>
                            <hr/>
                            <Transaction transaction={transaction}/>
                        </div>
                    ))
                }
                <br/>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={toggleDisplayTransaction}
                >
                    Show Less
                </Button>
            </div>
        )
    }

    return (
        <div>
            <br/>
            <Button
                variant="danger"
                size="sm"
                onClick={toggleDisplayTransaction}
            >
                Show More
            </Button>
        </div>
    )
}

// Display block data
function Block({ block }) {
    const {timestamp, hash} = block;
    const truncatedHash = `${hash.substring(0, 15)}...`;
    const formattedTimestamp = new Date(timestamp / MILLISECONDS_PY).toLocaleString();

    return (
        <div className="Block">
            <div>Hash: {truncatedHash}</div>
            <div>Timestamp: {formattedTimestamp}</div>
            <ToggleTransactionDisplay block={block}/>
        </div>
    )
}

export default Block;