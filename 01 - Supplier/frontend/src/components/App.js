import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import frontlogo from '../assets/Man-logo.PNG';
import { Table, FormGroup, FormLabel } from 'react-bootstrap';
import { API_BASE_URL } from '../config';

function App() {
  const [walletInfo, setWalletInfo] = useState({});

  //fetch the terminal address
  useEffect(() => {
    fetch(`${API_BASE_URL}/wallet/info`)
      .then(response => response.json())
      .then(json => setWalletInfo(json));
  }, []);

  const { address } = walletInfo;

  return (
    <div className="App">
      <h2>Welcome to Blockchain Supply Chain</h2>
      <div><center><img className="frontlogo" src={frontlogo} alt="application-logo" /></center></div>
      <h3>Terminal 1: Supplier's Portal</h3>
      <br />
      <div className="WalletInfo">
        <div>Supplier's address : {address}</div>
      </div>
      <hr />
      <Table bordered condensed>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Tasks</th>
          </tr>
        </thead>    
        <tbody>
          <tr>  
            <td><FormLabel>1.  </FormLabel> {' '}</td>
            <td>
              <FormGroup>
              <Link to="/product-transaction"><h4>Register New Vaccine</h4></Link>
              </FormGroup>{' '}
            </td>
          </tr>
          <tr>  
            <td><FormLabel>2.   </FormLabel> {' '}</td>
            <td>
              <FormGroup>
                <Link to="/check-status"><h4>Vaccine Status Chart</h4></Link>
              </FormGroup>{' '}
            </td>
          </tr>
          <tr>  
            <td><FormLabel>3.   </FormLabel> {' '}</td>
            <td>
              <FormGroup>
                <Link to="/transaction-display"><h4>Search for a Vaccine</h4></Link>
              </FormGroup>{' '}
            </td>
          </tr>
        </tbody>
      </Table>
      <Link to="/blockchain"><h4>Explore Blockchain</h4></Link>
      <br/>
    </div>
  );
}

export default App;