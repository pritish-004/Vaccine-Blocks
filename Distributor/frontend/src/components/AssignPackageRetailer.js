import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Dropdown, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import { API_BASE_URL } from '../config';
import history from '../history';

function AssignPackageRetailer() {
  const [package_id, setPackage_id] = useState('');
  const location = 'Bengaluru';
  const status = 'D-R Transit'; 
  const [password, setPassword] = useState('');
  const [recipient, setRecipient] = useState('');
  const [packagesreceived, setPackagesreceived] = useState([]); 
  const [knownAddresses, setKnownAddresses] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/fetch-packages-received`)
      .then(response => response.json())
      .then(json => setPackagesreceived(json));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/known-addresses`)
      .then(response => response.json())
      .then(json => setKnownAddresses(json));
  }, []);

  const updatePackageValue = (input) => {
    setPackage_id(input);
  }

  const updatePackage_id = event => {
    setPackage_id(event.target.value);
  }

  const updatePassword = event => {
    setPassword(event.target.value);
  }

  const updateRecipient = event => {
    setRecipient(event.target.value);
  }

  const updateRecipientAddress = (input) => {
    setRecipient(input);
  }
  const AssignRetailer = () => {
    fetch(`${API_BASE_URL}/assign-package-retailer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ package_id,recipient,location,status,password })
    }).then(response => response.json())
      .then(json => {
        console.log('AssignRetailerPackage json', json);
        alert('Successfully assigned retailer to the package ');
        history.push('/transaction-pool');
      });
  }

  return (
    <div className="AssignRetailer">
      <Link to="/">Back to Home</Link>
      <hr />
      <h3>Receive Package</h3>
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
            <td><FormLabel>Package ID </FormLabel> {' '}</td>
            <td>
              <FormGroup>
                <FormControl
                  input="text"
                  placeholder="package_id"
                  value={package_id}
                  onChange={updatePackage_id}
                />
              </FormGroup>{' '}
              <div>
                {
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" caret>
                      Select Arrived Packages
                    </Dropdown.Toggle>
                    <Dropdown.Menu>                  
                      {
                        packagesreceived.map((pkg, i) => (
                        <Dropdown.Item ><Button color="danger" key={pkg} onClick={() => updatePackageValue(pkg)}  ><u>Package </u>{' '}<u>{ i+1 } </u><u> : </u><u>{pkg}</u>{' '}{i !== packagesreceived.length - 1 ? <br/>  : <br/>}</Button>{' '}</Dropdown.Item>))
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                }
              </div>
            </td>
          </tr>
          <tr>  
            <td><FormLabel>Retailer's ID</FormLabel> {' '}</td>
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
                    Retailer's List
                  </Dropdown.Toggle>
                  <Dropdown.Menu>                  
                    {
                      knownAddresses.map((knownAddress, i) => (
                      <Dropdown.Item ><Button color="danger" key={knownAddress} onClick={() => updateRecipientAddress(knownAddress)}  ><u>Retailer </u>{' '}<u>{ i+1 } </u><u> : </u><u>{knownAddress}</u>{' '}{i !== knownAddresses.length - 1 ? <br/>  : <br/>}</Button>{' '}</Dropdown.Item>))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              }
              </div>
            </td>
          </tr>
          <tr>  
            <td><FormLabel>Password</FormLabel> {' '}</td>
            <td>
              <FormGroup>
                <FormControl
                  type="password"
                  input="text"
                  placeholder="Password"
                  value={password}
                  onChange={updatePassword}
                />
              </FormGroup>
            </td>
          </tr>
        </tbody>
      </Table>        
      <div>
        <Button
          variant="danger"
          onClick={AssignRetailer}
        >
          Decrypt QRcode | Log the Package 
        </Button>
      </div>
      <br />
    </div>
  )
}

export default AssignPackageRetailer;