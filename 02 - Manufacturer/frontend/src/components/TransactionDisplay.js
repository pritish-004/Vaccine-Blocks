import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {API_BASE_URL} from '../config';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';

function TransactionDisplay() {

    const [product_list, setProduct_list] = useState([]);

    let nameFilter = 'CHN-';

    useEffect(() => {
        fetch(`${API_BASE_URL}/check-status`)
            .then(response => response.json())
            .then(json => setProduct_list(json));
    }, []);

    const columns = [{
        dataField: 'rfid_id',
        text: 'RFID ID',
        sort: true
    }, {
        dataField: 'product_id',
        text: 'Product ID',
        sort: true,
        filter: textFilter({
            getFilter: (filter) => {
                // nameFilter was assigned once the component has been mounted.
                nameFilter = filter;
            }
        })
    }, {
        dataField: 'product_name',
        text: 'Product Name',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'package_id',
        text: 'Package ID',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'location',
        text: 'Last location',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'mfd_date',
        text: 'MFD Date',
        sort: true
    }, {
        dataField: 'exp_date',
        text: 'EXP Date',
        sort: true
    }, {
        dataField: 'status',
        text: 'status',
        sort: true,
        filter: textFilter()
    }];

    const handleClick = () => {
        nameFilter = 'CHN-';
    };

    return (
        <div className="TransactionDisplay">
            <center><h3>Check Specific Transaction status</h3></center>
            <br/>
            <br/>
            <Link to="/">
                <center>Back to Home</center>
            </Link>
            <br/>
            <br/>
            <div class="alert alert-primary alert-dismissible" role="alert">
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
            <div className="container" style={{marginTop: 30}}>
                <button className="btn btn-lg btn-primary" onClick={handleClick}> Check my products</button>
                <hr/>
                <BootstrapTable keyField='product_id' data={product_list} columns={columns} filter={filterFactory()}/>
            </div>
            <br/>
        </div>
    )
}

export default TransactionDisplay;