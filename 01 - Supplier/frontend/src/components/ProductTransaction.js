import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, FormControl, FormLabel, Button, } from 'react-bootstrap';
import { API_BASE_URL } from '../config';
import history from '../history';
import uuid from "uuid";

function ProductTransaction() {
  const quantity = 0;
  const [rfid_id, setRfid_id] = useState('');
  const [product_id, setProduct_id] = useState('');
  const [product_name, setProduct_name] = useState('');
  const package_id = 'Unassigned';
  const location = 'Chennai';
  const loc_code = 'CHN-Prod-';
  const status = 'M-Inventory'; 
  const [mfd_date, setMfd_date] = useState('');
  const [exp_date, setExp_date] = useState('');
  const recipient = 'self';
  let prod_id_loc = "";
  const [fixRFID_id, setFix_RFID_id] = useState(false);

  // Fetch generated product-id for each product 
  useEffect(() => {
    fetch(`${API_BASE_URL}/product-id-counter`)
      .then(response => response.json())
      .then(json => setProduct_id(json));
  }, []);

  const updateRfid_id = event => {
    setRfid_id(event.target.value);
  }

  //Generate and assign RFID, product-id for the selected product
  const generateRfid_id = () => {
    prod_id_loc = loc_code+(product_id);
    setProduct_id(prod_id_loc);
    setRfid_id(uuid.v4());
    setFix_RFID_id(true);
    setMfd_date(dateTime.toLocaleDateString())
   }
 
  const updateProduct_id = event => {
    setProduct_id(event.target.value);
  }

  const updateExp_date = event => {
    setExp_date(event.target.value);
  }

  const updateProduct_name = event => {
    setProduct_name(event.target.value);
  }
  
  // set date and time at the top of the portal
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
      const id = setInterval(() => setDateTime(new Date()), 1000);
      return () => {
          clearInterval(id);
      }
  }, []);

  // Submit transaction to the transaction pool
  const submitTransaction = () => {
    fetch(`${API_BASE_URL}/wallet/transact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, rfid_id, product_id, product_name, package_id, location, mfd_date, exp_date, status, quantity })
    }).then(response => response.json())
      .then(json => {
        console.log('submitTransaction json', json);
        alert('Success!');

        history.push('/transaction-pool');
      });
  }

  if (fixRFID_id) { 
    return (
      <div className="ProductTransaction">
        <br />
        <Link to="/">Back to Home</Link>
        <hr />
        <h3>Tag the newly created Product</h3>
        <hr />
        <h4>{`${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`}</h4>
        <hr />
        <Form inline>
          <Button
              variant="danger"
              onClick={generateRfid_id}
              disabled
            >
              Assign RFID ID and Product ID
          </Button>
        </Form>
        <br />
        <Form inline>
          <FormGroup>
            <FormLabel>Enter RFID ID :  </FormLabel>{' '}
            <FormControl
              input="RFID"
              placeholder="rfid_id"
              value={rfid_id}
              onChange={updateRfid_id}
              disabled
            />
          </FormGroup>{' '}
        </Form>
        <br/>
        <Form inline>
          <FormGroup>
            <FormLabel> Enter Prod ID : </FormLabel>{' '}
            <FormControl
              input="text"
              placeholder="Product ID"
              value={product_id}
              onChange={updateProduct_id}
              disabled
            />
          </FormGroup>
        </Form>
        <br/>
        <Form inline>
          <FormGroup>
            <FormLabel>Product name : </FormLabel>{' '}
            <FormControl
              required
              input="text"
              placeholder="Product name"
              value={product_name}
              onChange={updateProduct_name}
            />
          </FormGroup>
        </Form>
        <br />
        <Form inline>
          <FormGroup>
            <FormLabel> Date of Expiry : </FormLabel>{' '}
            <FormControl
              required
              input="text"
              placeholder="Enter Expiry date"
              value={exp_date}
              onChange={updateExp_date}
            />
          </FormGroup>
        </Form>
        <br />
        <div>
          <Button
            variant="danger"
            onClick={submitTransaction}
          >
            Submit
          </Button>
        </div>
      <br />
      </div>
    )
    }
  return (
    <div className="ProductTransaction">
      <br />
      <Link to="/">Back to Home</Link>
      <hr />
      <h3>Tag the newly created Product</h3>
      <hr />
      <h4>{`${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`}</h4>
      <hr />
      <Form inline>
        <Button
            variant="danger"
            onClick={generateRfid_id}
          >{' '}
            Assign RFID ID and Product ID
        </Button>
      </Form>
      <br />
      <Form inline>
        <FormGroup>
          <FormLabel>Enter RFID ID :  </FormLabel>{' '}
          <FormControl
            input="RFID"
            placeholder="rfid_id"
            onChange={updateRfid_id}
          />
        </FormGroup>{' '}
      </Form>
      <br/>
      <Form inline>
        <FormGroup>
          <FormLabel> Enter Prod ID : </FormLabel>{' '}
          <FormControl
            input="text"
            placeholder="Product ID"
            onChange={updateProduct_id}
          />
        </FormGroup>
      </Form>
      <br/>
      <Form inline>
        <FormGroup>
          <FormLabel>Product name : </FormLabel>{' '}
          <FormControl
            input="text"
            placeholder="Product name"
            value={product_name}
            onChange={updateProduct_name}
          />
        </FormGroup>
      </Form>
      <br/>
        <Form inline>
            <FormGroup>
              <FormLabel> Date of Expiry : </FormLabel>{' '}
              <FormControl
                required
                input="text"
                placeholder="Enter Expiry date"
                value={exp_date}
                onChange={updateExp_date}
              />
            </FormGroup>
        </Form>
      <br />
    </div>
  )
}

export default ProductTransaction;