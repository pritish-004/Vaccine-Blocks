import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import {API_BASE_URL} from '../config';

function TransactionStatus() {

    const [transaction_list, setTransaction_list] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/check-status`)
            .then(response => response.json())
            .then(json => setTransaction_list(json));
    }, []);

    return (
        <div className="TransactionStatus">
            <center><h3>Check Transaction status</h3></center>
            <br/>
            <br/>
            <Link to="/">
                <center>Back to Home</center>
            </Link>
            <div class="alert alert-primary" role="alert">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Status terms-</strong>
                <hr/>
                <strong>M-Inventory-</strong> At Manufacturer's Inventory
                <br/>
                <strong>M-D Transit-</strong> In Transit from Manufaturer to Distributor
                <br/>
                <strong>D-Inventory-</strong> At Distributor's Inventory
                <br/>
                <strong>D-R Transit-</strong> In Transit from Distributor to Retailer
                <br/>
                <strong>R-Inventory-</strong> At Retailers Inventory
                <br/>
                <strong>R-Customer -</strong> Bought by Customer
                <hr/>
            </div>
            <Table bordered responsive>
                <thead>
                <tr>
                    <th rowSpan="2">RFID</th>
                    <th rowSpan="2">Prod ID</th>
                    <th rowSpan="2">Prod Name</th>
                    <th rowSpan="2">Package ID</th>
                    <th rowSpan="2">Last location</th>
                    <th rowSpan="2">MFD Date</th>
                    <th rowSpan="2">EXP Date</th>
                    <th colSpan="6">
                        <center>status</center>
                    </th>
                </tr>
                <tr>
                    <th>MNF Inv</th>
                    <th>Transit</th>
                    <th>Dist Recv</th>
                    <th>Transit</th>
                    <th>Ret Recv</th>
                    <th>Customer</th>
                </tr>

                </thead>
                <tbody>
                {
                    transaction_list.map((transaction) => (
                        <tr key={transaction.product_id}>
                            <td>{transaction.rfid_id} </td>
                            <td>{transaction.product_id} </td>
                            <td>{transaction.product_name} </td>
                            <td>{transaction.package_id} </td>
                            <td>{transaction.location} </td>
                            <td>{transaction.mfd_date} </td>
                            <td>{transaction.exp_date} </td>
                            <td>{transaction.S1} </td>
                            <td>{transaction.S2} </td>
                            <td>{transaction.S3} </td>
                            <td>{transaction.S4} </td>
                            <td>{transaction.S5} </td>
                            <td>{transaction.S6} </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>
    )
}

export default TransactionStatus;