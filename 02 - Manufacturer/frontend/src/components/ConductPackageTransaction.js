import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Dropdown, Form, FormControl, FormGroup, FormLabel, Table} from 'react-bootstrap';
import {API_BASE_URL} from '../config';
import history from '../history';
import logo from '../assets/QR_code.png';

function ConductPackageTransaction() {

    const [packageCounter, setPackageCounter] = useState('');
    const [packageId, setPackageId] = useState('');

    //Details of 1st product selected
    const [rfidId1, setRfidId1] = useState('');
    const [productId1, setProductId1] = useState('');
    const [product_name1, setProduct_name1] = useState('');
    const [mfdDate1, setMfdDate1] = useState('');
    const [expDate1, setExpDate1] = useState('');
    const [quantity1, setQuantity1] = useState();

    //Details of 2nd product selected
    const [rfidId2, setRfidId2] = useState('');
    const [productId2, setProductId2] = useState('');
    const [product_name2, setProduct_name2] = useState('');
    const [mfdDate2, setMfdDate2] = useState('');
    const [expDate2, setExpDate2] = useState('');
    const [quantity2, setQuantity2] = useState();

    //Details of 3rd product selected
    const [rfidId3, setRfidId3] = useState('');
    const [productId3, setProductId3] = useState('');
    const [product_name3, setProduct_name3] = useState('');
    const [mfdDate3, setMfdDate3] = useState('');
    const [expDate3, setExpDate3] = useState('');
    const [quantity3, setQuantity3] = useState();

    //Details of 4th product selected
    const [rfidId4, setRfidId4] = useState('');
    const [productId4, setProductId4] = useState('');
    const [product_name4, setProduct_name4] = useState('');
    const [mfdDate4, setMfdDate4] = useState('');
    const [expDate4, setExpDate4] = useState('');
    const [quantity4, setQuantity4] = useState();

    //Details of 5th product selected
    const [rfidId5, setRfidId5] = useState('');
    const [product_id5, setProductId5] = useState('');
    const [product_name5, setProduct_name5] = useState('');
    const [mfdDate5, setMfdDate5] = useState('');
    const [expDate5, setExpDate5] = useState('');
    const [quantity5, setQuantity5] = useState();

    const location = 'Chennai';
    const loc_code = 'CHN-Pkg-';
    const status = 'M-D Transit';
    let packageIdLoc = "";

    const [recipient, setRecipient] = useState('');
    const [password, setPassword] = useState('');
    const [knownAddresses, setKnownAddresses] = useState([]);
    // fetch previous value of enable submit
    const initialenablecount = 0 || Number(window.localStorage.getItem('enableSubmit'))
    const [enableSubmit, setenableSubmit] = useState(initialenablecount);

    // fetch package number from python backend server
    useEffect(() => {
        fetch(`${API_BASE_URL}/package-id-counter`)
            .then(response => response.json())
            .then(json => setPackageCounter(json));
    }, []);

    // fetch the address of participants in the server
    useEffect(() => {
        fetch(`${API_BASE_URL}/known-addresses`)
            .then(response => response.json())
            .then(json => setKnownAddresses(json));
    }, []);

    // read the value of enable submit from local storage
    useEffect(() => {
        window.localStorage.setItem('enableSubmit', enableSubmit);
    }, [enableSubmit]);

    const [transaction_list, setTransaction_list] = useState([]);

    // fetch the products available from the OEM's warehouse
    useEffect(() => {
        fetch(`${API_BASE_URL}/fetch-products-inv`)
            .then(response => response.json())
            .then(json => setTransaction_list(json));
    }, []);

    // create a unique package id with format: location code + packgae counter value
    const generatePackage_id = () => {
        packageIdLoc = loc_code + (packageCounter);
        setPackageId(packageIdLoc);
    }

    // enable submit boolean
    const EnableSubmit = (input) => {
        setenableSubmit(Number(input));
        window.localStorage.setItem('enableSubmit', enableSubmit);
    }

    // disable submit boolean
    const DisableSubmit = () => {
        setenableSubmit(0);
        window.localStorage.setItem('enableSubmit', enableSubmit);
        history.push('/transaction-pool');
    }

    const updatePackage_id = event => {
        setPackageId(event.target.value);
    }

    const updateRecipient = event => {
        setRecipient(event.target.value);
    }

    const updatePassword = event => {
        setPassword(event.target.value);
    }

    const updateRecipientAddress = (input) => {
        setRecipient(input);
    }

    const updateProduct_details1 = (input, idx) => {
        setProductId1(input.product_id);
        setRfidId1(input.rfidId);
        setProduct_name1(input.product_name);
        setMfdDate1(input.mfdDate);
        setExpDate1(input.expDate);
        setQuantity1(input.quantity);
        delete transaction_list[idx];
    }

    const updateProduct_details2 = (input, idx) => {
        setProductId2(input.product_id);
        setRfidId2(input.rfidId);
        setProduct_name2(input.product_name);
        setMfdDate2(input.mfdDate);
        setExpDate2(input.expDate);
        setQuantity2(input.quantity);
        delete transaction_list[idx];
    }

    const updateProduct_details3 = (input, idx) => {
        setProductId3(input.product_id);
        setRfidId3(input.rfidId);
        setProduct_name3(input.product_name);
        setMfdDate3(input.mfdDate);
        setExpDate3(input.expDate);
        setQuantity3(input.quantity);
        delete transaction_list[idx];
    }

    const updateProduct_details4 = (input, idx) => {
        setProductId4(input.product_id);
        setRfidId4(input.rfidId);
        setProduct_name4(input.product_name);
        setMfdDate4(input.mfdDate);
        setExpDate4(input.expDate);
        setQuantity4(input.quantity);
        delete transaction_list[idx];
    }

    const updateProduct_details5 = (input, idx) => {
        setProductId5(input.product_id);
        setRfidId5(input.rfidId);
        setProduct_name5(input.product_name);
        setMfdDate5(input.mfdDate);
        setExpDate5(input.expDate);
        setQuantity5(input.quantity);
        delete transaction_list[idx];
    }

    const updateProduct_id1 = event => {
        setProductId1(event.target.value);
    }
    const updateProduct_id2 = event => {
        setProductId2(event.target.value);
    }
    const updateProduct_id3 = event => {
        setProductId3(event.target.value);
    }
    const updateProduct_id4 = event => {
        setProductId4(event.target.value);
    }
    const updateProduct_id5 = event => {
        setProductId5(event.target.value);
    }


    const submitTransaction1 = () => {
        fetch(`${API_BASE_URL}/wallet/transact`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                recipient,
                rfidId: rfidId1,
                product_id: productId1,
                product_name: product_name1,
                packageId: packageId,
                location,
                status,
                mfdDate: mfdDate1,
                expDate: expDate1,
                quantity: quantity1
            })
        }).then(response => response.json())
            .then(json => {
                console.log('submitTransaction json', json);
                setTimeout(() => {
                    console.log("World!");
                }, 2000);
                alert('Success!');
            });
    }

    const submitTransaction2 = () => {
        fetch(`${API_BASE_URL}/wallet/transact`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                recipient,
                rfidId: rfidId2,
                product_id: productId2,
                product_name: product_name2,
                packageId: packageId,
                location,
                status,
                mfdDate: mfdDate2,
                expDate: expDate2,
                quantity: quantity2
            })
        }).then(response => response.json())
            .then(json => {
                console.log('submitTransaction json', json);
                setTimeout(() => {
                    console.log("World!");
                }, 2000);
                alert('Success!');
            });
    }

    const submitTransaction3 = () => {
        fetch(`${API_BASE_URL}/wallet/transact`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                recipient,
                rfidId: rfidId3,
                product_id: productId3,
                product_name: product_name3,
                packageId: packageId,
                location,
                status,
                mfdDate: mfdDate3,
                expDate: expDate3,
                quantity: quantity3
            })
        }).then(response => response.json())
            .then(json => {
                console.log('submitTransaction json', json);
                setTimeout(() => {
                    console.log("World!");
                }, 2000);
                alert('Success!');
            });
    }

    const submitTransaction4 = () => {
        fetch(`${API_BASE_URL}/wallet/transact`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                recipient,
                rfidId: rfidId4,
                product_id: productId4,
                product_name: product_name4,
                packageId: packageId,
                location,
                status,
                mfdDate: mfdDate4,
                expDate: expDate4,
                quantity: quantity4
            })
        }).then(response => response.json())
            .then(json => {
                console.log('submitTransaction json', json);
                setTimeout(() => {
                    console.log("World!");
                }, 2000);
                alert('Success!');
            });
    }

    const submitTransaction5 = () => {
        fetch(`${API_BASE_URL}/wallet/transact`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                recipient,
                rfidId: rfidId5,
                product_id: product_id5,
                product_name: product_name5,
                packageId: packageId,
                location,
                status,
                mfdDate: mfdDate5,
                expDate: expDate5,
                quantity: quantity5
            })
        }).then(response => response.json())
            .then(json => {
                console.log('submitTransaction json', json);
                setTimeout(() => {
                    console.log("World!");
                }, 2000);
                alert('Success!');
            });
    }

    const EncryptTransaction = () => {
        fetch(`${API_BASE_URL}/encrypt-package-details`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                recipient,
                productId1,
                productId2,
                productId3,
                productId4,
                productId5,
                packageId,
                password
            })
        }).then(response => response.json())
            .then(json => {
                console.log('encryptTransaction json', json);
                alert('Successfully encrypted transactions and QR code generated!');
            });
    }

    if (enableSubmit == 1) {
        return (
            <div className="ConductPackageTransaction">
                <br/>
                <Link to="/">Back to Home</Link>
                <hr/>
                <div><img className="logo" src={logo} alt="application-logo"/></div>
                <div>
                    <br/>
                    <Button
                        variant="danger"
                        onClick={() => {
                            EnableSubmit(0);
                        }}
                    >
                        Back
                    </Button>
                </div>
                <br/>
            </div>
        )
    }
    return (
        <div className="ConductPackageTransaction">
            <br/>
            <Link to="/">Back to Home</Link>
            <hr/>
            <h3>Add a distributor to the Package </h3>
            <br/>
            <Table bordered condensed>
                <thead>
                <tr>
                    <th>Fields</th>
                    <th>Values</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><FormLabel>Package ID : </FormLabel> {' '}</td>
                    <td>
                        <FormGroup>
                            <FormControl
                                input="text"
                                placeholder="Enter Package id"
                                value={packageId}
                                onChange={updatePackage_id}
                            />
                        </FormGroup>{' '}
                        <Form inline>
                            <Button
                                variant="warning"
                                onClick={generatePackage_id}
                            >{' '}
                                Generate Package ID :
                            </Button>
                        </Form>
                    </td>
                </tr>

                <tr>
                    <td><FormLabel>OEM's Password </FormLabel> {' '}</td>
                    <td>
                        <FormGroup>
                            <FormControl
                                type="password"
                                input="text"
                                placeholder="Enter Password"
                                value={password}
                                onChange={updatePassword}
                            />
                        </FormGroup>{' '}
                    </td>
                </tr>
                <tr>
                    <td><FormLabel>Distributor ID</FormLabel> {' '}</td>
                    <td>
                        <FormGroup>
                            <FormControl
                                input="text"
                                placeholder="Enter distributor ID "
                                value={recipient}
                                onChange={updateRecipient}
                            />
                        </FormGroup>{' '}
                        <div>
                            {
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" caret>
                                        Distributor's List
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            knownAddresses.map((knownAddress, i) => (
                                                <Dropdown.Item><Button color="danger" key={knownAddress}
                                                                       onClick={() => updateRecipientAddress(knownAddress)}><u>Distributor </u>{' '}<u>{i + 1} </u><u> : </u><u>{knownAddress}</u>{' '}{i !== knownAddresses.length - 1 ?
                                                    <br/> : <br/>}</Button>{' '}</Dropdown.Item>))
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><FormLabel>Product-1 ID :</FormLabel>{' '}</td>
                    <td>
                        <FormGroup>
                            <FormControl
                                input="text"
                                placeholder="Enter Product-1 ID"
                                value={productId1}
                                onChange={updateProduct_id1}
                            />
                        </FormGroup>{' '}
                        <div>
                            {
                                <Dropdown>
                                    <Dropdown.Toggle color="primary" variant="success" id="dropdown-basic" caret>
                                        Check Taged Products in Inventory
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="super-colors">
                                        {
                                            transaction_list.map((transaction, i) => (
                                                <Dropdown.Item><Button color="danger" key={transaction.product_id}
                                                                       onClick={() => updateProduct_details1(transaction, i)}><u>Product </u>{' '}<u>{i + 1} </u><u> : </u><u>{transaction.product_id}</u>{' '}{i !== transaction_list.length - 1 ?
                                                    <br/> : <br/>}</Button>{' '}</Dropdown.Item>))
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                        </div>
                        <div>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    submitTransaction1();
                                }}
                            >
                                Confirm product 1
                            </Button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><FormLabel>Product-2 ID : </FormLabel>{' '}</td>
                    <td>
                        <FormGroup>
                            <FormControl
                                input="text"
                                placeholder="Enter Product-2 ID"
                                value={productId2}
                                onChange={updateProduct_id2}
                            />
                        </FormGroup>{' '}
                        <div>
                            {
                                <Dropdown>
                                    <Dropdown.Toggle color="primary" variant="success" id="dropdown-basic" caret>
                                        Check Taged Products in Inventory
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="super-colors">
                                        {
                                            transaction_list.map((transaction, i) => (
                                                <Dropdown.Item><Button color="danger" key={transaction.product_id}
                                                                       onClick={() => updateProduct_details2(transaction, i)}><u>Product </u>{' '}<u>{i + 1} </u><u> : </u><u>{transaction.product_id}</u>{' '}{i !== transaction_list.length - 1 ?
                                                    <br/> : <br/>}</Button>{' '}</Dropdown.Item>))
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                        </div>
                        <div>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    submitTransaction2();
                                }}
                            >
                                Confirm product 2
                            </Button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><FormLabel>Product-3 ID : </FormLabel>{' '}</td>
                    <td>
                        <FormGroup>
                            <FormControl
                                input="text"
                                placeholder="Enter Product-3 ID"
                                value={productId3}
                                onChange={updateProduct_id3}
                            />
                        </FormGroup>{' '}
                        <div>
                            {
                                <Dropdown>
                                    <Dropdown.Toggle color="primary" variant="success" id="dropdown-basic" caret>
                                        Check Taged Products in Inventory
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="super-colors">
                                        {
                                            transaction_list.map((transaction, i) => (
                                                <Dropdown.Item><Button color="danger" key={transaction.product_id}
                                                                       onClick={() => updateProduct_details3(transaction, i)}><u>Product </u>{' '}<u>{i + 1} </u><u> : </u><u>{transaction.product_id}</u>{' '}{i !== transaction_list.length - 1 ?
                                                    <br/> : <br/>}</Button>{' '}</Dropdown.Item>))
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                        </div>
                        <div>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    submitTransaction3();
                                }}
                            >
                                Confirm product 3
                            </Button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><FormLabel>Product-4 ID : </FormLabel>{' '}</td>
                    <td>
                        <FormGroup>
                            <FormControl
                                input="text"
                                placeholder="Enter Product-4 ID"
                                value={productId4}
                                onChange={updateProduct_id4}
                            />
                        </FormGroup>{' '}
                        <div>
                            {
                                <Dropdown>
                                    <Dropdown.Toggle color="primary" variant="success" id="dropdown-basic" caret>
                                        Check Taged Products in Inventory
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="super-colors">
                                        {
                                            transaction_list.map((transaction, i) => (
                                                <Dropdown.Item><Button color="danger" key={transaction.product_id}
                                                                       onClick={() => updateProduct_details4(transaction, i)}><u>Product </u>{' '}<u>{i + 1} </u><u> : </u><u>{transaction.product_id}</u>{' '}{i !== transaction_list.length - 1 ?
                                                    <br/> : <br/>}</Button>{' '}</Dropdown.Item>))
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                        </div>
                        <div>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    submitTransaction4();
                                }}
                            >
                                Confirm product 4
                            </Button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><FormLabel>Product-5 ID : </FormLabel>{' '}</td>
                    <td>
                        <FormGroup>
                            <FormControl
                                input="text"
                                placeholder="Enter Product-5 ID"
                                value={productId5}
                                onChange={updateProduct_id5}
                            />
                        </FormGroup>{' '}
                        <div>
                            {
                                <Dropdown>
                                    <Dropdown.Toggle color="primary" variant="success" id="dropdown-basic" caret>
                                        Check Taged Products in Inventory
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="super-colors">
                                        {
                                            transaction_list.map((transaction, i) => (
                                                <Dropdown.Item><Button color="danger" key={transaction.product_id}
                                                                       onClick={() => updateProduct_details5(transaction, i)}><u>Product </u>{' '}<u>{i + 1} </u><u> : </u><u>{transaction.product_id}</u>{' '}{i !== transaction_list.length - 1 ?
                                                    <br/> : <br/>}</Button>{' '}</Dropdown.Item>))
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                        </div>
                        <div>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    submitTransaction5();
                                }}
                            >
                                Confirm product 5
                            </Button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </Table>
            <div>
                <Button
                    variant="danger"
                    onClick={() => {
                        EncryptTransaction();
                        EnableSubmit(1);
                    }}
                >
                    Generate QR code for the package
                </Button>
            </div>
            <br/>
            <div>
                <Button
                    type="button"
                    variant="primary"
                    onClick={() => {
                        DisableSubmit();
                    }}
                >
                    Go to transaction pool
                </Button>
            </div>
            <br/>
        </div>
    )

}

export default ConductPackageTransaction;