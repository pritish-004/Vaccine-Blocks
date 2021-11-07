import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Table, Dropdown, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import { API_BASE_URL } from '../config';
import history from '../history';
import logo from '../assets/QR_code.png';

function ConductPackageTransaction() {

  const [package_counter, setPackage_counter] = useState('');
  const [package_id, setPackage_id] = useState('');

  //Details of 1st product selected 
  const [rfid_id1, setRfid_id1] = useState('');
  const [product_id1, setProduct_id1] = useState('');
  const [product_name1, setProduct_name1] = useState('');
  const [mfd_date1, setMfd_date1] = useState('');
  const [exp_date1, setExp_date1] = useState('');
  const [quantity1, setQuantity1] = useState();

  //Details of 2nd product selected
  const [rfid_id2, setRfid_id2] = useState('');
  const [product_id2, setProduct_id2] = useState('');
  const [product_name2, setProduct_name2] = useState('');
  const [mfd_date2, setMfd_date2] = useState('');
  const [exp_date2, setExp_date2] = useState('');
  const [quantity2, setQuantity2] = useState();

  //Details of 3rd product selected
  const [rfid_id3, setRfid_id3] = useState('');
  const [product_id3, setProduct_id3] = useState('');
  const [product_name3, setProduct_name3] = useState('');
  const [mfd_date3, setMfd_date3] = useState('');
  const [exp_date3, setExp_date3] = useState('');
  const [quantity3, setQuantity3] = useState();

  //Details of 4th product selected
  const [rfid_id4, setRfid_id4] = useState('');
  const [product_id4, setProduct_id4] = useState('');
  const [product_name4, setProduct_name4] = useState('');
  const [mfd_date4, setMfd_date4] = useState('');
  const [exp_date4, setExp_date4] = useState('');
  const [quantity4, setQuantity4] = useState();

  //Details of 5th product selected
  const [rfid_id5, setRfid_id5] = useState('');
  const [product_id5, setProduct_id5] = useState('');
  const [product_name5, setProduct_name5] = useState('');
  const [mfd_date5, setMfd_date5] = useState('');
  const [exp_date5, setExp_date5] = useState('');
  const [quantity5, setQuantity5] = useState();

  const location = 'Chennai';
  const loc_code = 'CHN-Pkg-';
  const status = 'M-D Transit'; 
  let package_id_loc = "";
  
  const [recipient, setRecipient] = useState('');
  const [password, setPassword] = useState('');
  const [knownAddresses, setKnownAddresses] = useState([]);
  // fetch previous value of enable submit
  const initialenablecount =  0 || Number(window.localStorage.getItem('enableSubmit')) 
  const [enableSubmit, setenableSubmit] = useState(initialenablecount);

  // fetch package number from python backend server
  useEffect(() => {
    fetch(`${API_BASE_URL}/package-id-counter`)
      .then(response => response.json())
      .then(json => setPackage_counter(json));
  }, []);

  // fetch the address of participants in the server
  useEffect(() => {
    fetch(`${API_BASE_URL}/known-addresses`)
      .then(response => response.json())
      .then(json => setKnownAddresses(json));
  }, []);

  // read the value of enable submit from local storage
  useEffect(() => {
    window.localStorage.setItem('enableSubmit',enableSubmit);
  },[enableSubmit]);

  const [transaction_list, setTransaction_list] = useState([]);

  // fetch the products available from the OEM's warehouse
  useEffect(() => {
    fetch(`${API_BASE_URL}/fetch-products-inv`)
      .then(response => response.json())
      .then(json => setTransaction_list(json));
  }, []);

  // create a unique package id with format: location code + packgae counter value
  const generatePackage_id = () => {
    package_id_loc = loc_code+(package_counter);
    setPackage_id(package_id_loc);
   }
  
  // enable submit boolean
  const EnableSubmit = (input) => {
    setenableSubmit(Number(input));
    window.localStorage.setItem('enableSubmit',enableSubmit);
  }
  
  // disable submit boolean
  const DisableSubmit = () => {
    setenableSubmit(0);
    window.localStorage.setItem('enableSubmit',enableSubmit);
    history.push('/transaction-pool');
  }

  const updatePackage_id = event => {
    setPackage_id(event.target.value);
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

  const updateProduct_details1 = (input,idx) => {
    setProduct_id1(input.product_id);
    setRfid_id1(input.rfid_id);
    setProduct_name1(input.product_name);
    setMfd_date1(input.mfd_date);
    setExp_date1(input.exp_date);
    setQuantity1(input.quantity);
    delete transaction_list[idx];
  }

  const updateProduct_details2 = (input,idx) => {
    setProduct_id2(input.product_id);
    setRfid_id2(input.rfid_id);
    setProduct_name2(input.product_name);
    setMfd_date2(input.mfd_date);
    setExp_date2(input.exp_date);
    setQuantity2(input.quantity);
    delete transaction_list[idx];
  }

  const updateProduct_details3 = (input,idx) => {
    setProduct_id3(input.product_id);
    setRfid_id3(input.rfid_id);
    setProduct_name3(input.product_name);
    setMfd_date3(input.mfd_date);
    setExp_date3(input.exp_date);
    setQuantity3(input.quantity);
    delete transaction_list[idx];
  }

  const updateProduct_details4 = (input,idx) => {
    setProduct_id4(input.product_id);
    setRfid_id4(input.rfid_id);
    setProduct_name4(input.product_name);
    setMfd_date4(input.mfd_date);
    setExp_date4(input.exp_date);
    setQuantity4(input.quantity);
    delete transaction_list[idx];
  }

  const updateProduct_details5 = (input,idx) => {
    setProduct_id5(input.product_id);
    setRfid_id5(input.rfid_id);
    setProduct_name5(input.product_name);
    setMfd_date5(input.mfd_date);
    setExp_date5(input.exp_date);
    setQuantity5(input.quantity);
    delete transaction_list[idx];
  }

  const updateProduct_id1 = event => {
    setProduct_id1(event.target.value);
  }
  const updateProduct_id2 = event => {
    setProduct_id2(event.target.value);
  }
  const updateProduct_id3 = event => {
    setProduct_id3(event.target.value);
  }
  const updateProduct_id4 = event => {
    setProduct_id4(event.target.value);
  }
  const updateProduct_id5 = event => {
    setProduct_id5(event.target.value);
  }


  const submitTransaction1 = () => {
    fetch(`${API_BASE_URL}/wallet/transact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, rfid_id: rfid_id1, product_id: product_id1, product_name: product_name1, package_id:package_id, location, status, mfd_date: mfd_date1, exp_date: exp_date1, quantity: quantity1 })
    }).then(response => response.json())
      .then(json => {
        console.log('submitTransaction json', json);
        setTimeout(() => { console.log("World!"); }, 2000);
        alert('Success!');
      });
  }

  const submitTransaction2 = () => {
    fetch(`${API_BASE_URL}/wallet/transact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, rfid_id: rfid_id2, product_id: product_id2, product_name: product_name2, package_id:package_id, location, status, mfd_date: mfd_date2, exp_date: exp_date2, quantity: quantity2 })
    }).then(response => response.json())
      .then(json => {
        console.log('submitTransaction json', json);
        setTimeout(() => { console.log("World!"); }, 2000);
        alert('Success!');
      });
  }

  const submitTransaction3 = () => {
    fetch(`${API_BASE_URL}/wallet/transact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, rfid_id: rfid_id3, product_id: product_id3, product_name: product_name3, package_id:package_id, location, status, mfd_date: mfd_date3, exp_date: exp_date3, quantity: quantity3 })
    }).then(response => response.json())
      .then(json => {
        console.log('submitTransaction json', json);
        setTimeout(() => { console.log("World!"); }, 2000);
        alert('Success!');
      });
  }

  const submitTransaction4 = () => {
    fetch(`${API_BASE_URL}/wallet/transact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, rfid_id: rfid_id4, product_id: product_id4, product_name: product_name4, package_id:package_id, location, status, mfd_date: mfd_date4, exp_date: exp_date4, quantity: quantity4 })
    }).then(response => response.json())
      .then(json => {
        console.log('submitTransaction json', json);
        setTimeout(() => { console.log("World!"); }, 2000);
        alert('Success!');
      });
  }

  const submitTransaction5 = () => {
    fetch(`${API_BASE_URL}/wallet/transact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, rfid_id: rfid_id5, product_id: product_id5, product_name: product_name5, package_id:package_id, location, status, mfd_date: mfd_date5, exp_date: exp_date5, quantity: quantity5 })
    }).then(response => response.json())
      .then(json => {
        console.log('submitTransaction json', json);
        setTimeout(() => { console.log("World!"); }, 2000);
        alert('Success!');
      });
  }

  const EncryptTransaction = () => {
    fetch(`${API_BASE_URL}/encrypt-package-details`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, product_id1, product_id2, product_id3, product_id4, product_id5, package_id, password })
    }).then(response => response.json())
      .then(json => {
        console.log('encryptTransaction json', json);
        alert('Successfully encrypted transactions and QR code generated!');
      });
  }

  if (enableSubmit == 1) {
    return (
      <div className="ConductPackageTransaction">
      <br />
      <Link to="/">Back to Home</Link>
      <hr />
      <div><img className="logo" src={logo} alt="application-logo" /></div>
      <div>
        <br />
        <Button
          variant="danger"
          onClick={ () => {
            EnableSubmit(0);
          }}
        >
          Back
        </Button>
      </div>
      <br />
    </div>
    )
  }
  return (
    <div className="ConductPackageTransaction">
      <br />
      <Link to="/">Back to Home</Link>
      <hr />
      <h3>Add a distributor to the Package </h3>
      <br />      
      <Table bordered condensed>
        <thead>
          <tr>
            <th>Fields</th>
            <th>Values</th>
          </tr>
        </thead>    
        <tbody>
        <tr>  
            <td><FormLabel>Package ID :  </FormLabel> {' '}</td>
            <td>
              <FormGroup>        
                <FormControl
                  input="text"
                  placeholder="Enter Package id"
                  value={package_id}
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
            <td><FormLabel>OEM's Password  </FormLabel> {' '}</td>
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
                      <Dropdown.Item ><Button color="danger" key={knownAddress} onClick={() => updateRecipientAddress(knownAddress)}  ><u>Distributor </u>{' '}<u>{ i+1 } </u><u> : </u><u>{knownAddress}</u>{' '}{i !== knownAddresses.length - 1 ? <br/>  : <br/>}</Button>{' '}</Dropdown.Item>))
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
                value={product_id1}
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
                        <Dropdown.Item ><Button color="danger" key={transaction.product_id} onClick={() => updateProduct_details1(transaction,i)} ><u>Product </u>{' '}<u>{ i+1 } </u><u> : </u><u>{transaction.product_id}</u>{' '}{i !== transaction_list.length - 1 ? <br/>  : <br/>}</Button>{' '}</Dropdown.Item>))
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                }
                </div>
                <div>
                  <Button
                    variant="danger"
                    onClick={ () => {
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
                value={product_id2}
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
                        <Dropdown.Item ><Button color="danger" key={transaction.product_id} onClick={() => updateProduct_details2(transaction,i)} ><u>Product </u>{' '}<u>{ i+1 } </u><u> : </u><u>{transaction.product_id}</u>{' '}{i !== transaction_list.length - 1 ? <br/>  : <br/>}</Button>{' '}</Dropdown.Item>))
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                }
              </div>
              <div>
                <Button
                  variant="danger"
                  onClick={ () => {
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
                value={product_id3}
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
                        <Dropdown.Item ><Button color="danger" key={transaction.product_id} onClick={() => updateProduct_details3(transaction,i)} ><u>Product </u>{' '}<u>{ i+1 } </u><u> : </u><u>{transaction.product_id}</u>{' '}{i !== transaction_list.length - 1 ? <br/>  : <br/>}</Button>{' '}</Dropdown.Item>))
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                }
                </div>
                <div>
                  <Button
                    variant="danger"
                    onClick={ () => {
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
                value={product_id4}
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
                        <Dropdown.Item ><Button color="danger" key={transaction.product_id} onClick={() => updateProduct_details4(transaction,i)} ><u>Product </u>{' '}<u>{ i+1 } </u><u> : </u><u>{transaction.product_id}</u>{' '}{i !== transaction_list.length - 1 ? <br/>  : <br/>}</Button>{' '}</Dropdown.Item>))
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                }
              </div>
              <div>
                  <Button
                    variant="danger"
                    onClick={ () => {
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
                value={product_id5}
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
                        <Dropdown.Item ><Button color="danger" key={transaction.product_id} onClick={() => updateProduct_details5(transaction,i)} ><u>Product </u>{' '}<u>{ i+1 } </u><u> : </u><u>{transaction.product_id}</u>{' '}{i !== transaction_list.length - 1 ? <br/>  : <br/>}</Button>{' '}</Dropdown.Item>))
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                }
              </div>
              <div>
                <Button
                  variant="danger"
                  onClick={ () => {
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
          onClick={ () => {
            EncryptTransaction();
            EnableSubmit(1);
          }}
        >
          Generate QR code for the package
        </Button>
      </div>
      <br />
      <div>
        <Button
          type="button"
          variant="primary"
          onClick={ () => {
            DisableSubmit();
          }}
        >
          Go to transaction pool
        </Button>
      </div>
      <br />
    </div>
  )
  
}

export default ConductPackageTransaction;