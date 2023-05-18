import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import frontLogo from '../assets/OEM-logo.PNG';
import {FormGroup, FormLabel, Table} from 'react-bootstrap';
import {API_BASE_URL} from '../config';

function App() {
    const [walletInfo, setWalletInfo] = useState({});
    const API_ENDPOINT = '/wallet/info';

    //Fetch terminal address
    useEffect(() => {
        fetch(`${API_BASE_URL}${API_ENDPOINT}`)
            .then(response => response.json())
            .then(json => setWalletInfo(json))
            .catch(error => console.error('Error fetching wallet info:', error));
    }, []);

    const {address} = walletInfo;

    return (
        <div className="App">
            <h2>Welcome to Blockchain Supply Chain</h2>
            <div>
                <center><img className="frontLogo" src={frontLogo} alt="application-logo"/></center>
            </div>
            <h3>Terminal 2: Vaccine Manufacturer's Portal</h3>
            <br/>
            <div className="WalletInfo">
                <div>Vaccine Manufacturer's address : {address}</div>
            </div>
            <hr/>
            <Table bordered condensed>
                <thead>
                <tr>
                    <th>Sr. No</th>
                    <th>Tasks</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><FormLabel>1. </FormLabel> {' '}</td>
                    <td>
                        <FormGroup>
                            <Link to="/conduct-package-transaction"><h4> Create Vaccine Package and assign
                                Distributor</h4></Link>
                        </FormGroup>{' '}
                    </td>
                </tr>
                <tr>
                    <td><FormLabel>3. </FormLabel> {' '}</td>
                    <td>
                        <FormGroup>
                            <Link to="/check-status"><h4>Check Vaccine Status</h4></Link>
                        </FormGroup>{' '}
                    </td>
                </tr>
                <tr>
                    <td><FormLabel>4. </FormLabel> {' '}</td>
                    <td>
                        <FormGroup>
                            <Link to="/transaction-display"><h4>Search Vaccine Package table</h4></Link>
                        </FormGroup>{' '}
                    </td>
                </tr>
                <tr>
                    <td><FormLabel>5. </FormLabel> {' '}</td>
                    <td>
                        <FormGroup>
                            <Link to="/transaction-pool"><h4>Check Transaction Pool</h4></Link>
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