import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, Switch} from 'react-router-dom';
import './index.css';
import history from './history';
import App from './components/App';
import Blockchain from './components/Blockchain';
import TransactionPool from './components/TransactionPool';
import TransactionStatus from './components/TransactionStatus';
import TransactionDisplay from './components/TransactionDisplay';
import ConductPackageTransaction from './components/ConductPackageTransaction';

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route path='/' exact component={App}/>
            <Route path='/blockchain' component={Blockchain}/>
            <Route path='/transaction-pool' component={TransactionPool}/>
            <Route path='/check-status' component={TransactionStatus}/>
            <Route path='/transaction-display' component={TransactionDisplay}/>
            <Route path='/conduct-package-transaction' component={ConductPackageTransaction}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);