import React from 'react';
import {  Table } from 'react-bootstrap';

function Transaction({ transaction }) {
  const { input } = transaction;

  return (
    <div className="Transaction">
      <Table bordered condensed>
        <thead>
          <tr>
            <th>Fields</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Terminal ID: </td>
            <td>{input.address} </td>
          </tr>
          <tr>
            <td>Transaction id: </td>
            <td>{transaction.id} </td>
          </tr>
          <tr>
            <td>RFID ID: </td>
            <td>{transaction.rfid_id} </td>
          </tr>
          <tr>
            <td>Product ID: </td>
            <td>{transaction.product_id} </td>
          </tr>
          <tr>
            <td>Product name: </td>
            <td>{transaction.product_name} </td>
          </tr>
          <tr>
            <td>Package ID :</td>
            <td>{transaction.package_id} </td>
          </tr>
          <tr>
            <td>Maufactured Date </td>
            <td>{transaction.mfd_date} </td>
          </tr>
          <tr>
            <td>Expiry Date </td>
            <td>{transaction.exp_date} </td>
          </tr>
          <tr>
            <td>Last processed location: </td>
            <td>{transaction.location} </td>
          </tr>
          <tr>
            <td>Product status: </td>
            <td>{transaction.status} </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Transaction;