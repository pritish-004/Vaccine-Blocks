import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import './index.css';
import history from './history';
import App from './components/App';
import Blockchain from './components/Blockchain';
import ProductTransaction from './components/ProductTransaction';
import TransactionPool from './components/TransactionPool';
import TransactionStatus from './components/TransactionStatus';
import TransactionDisplay from './components/TransactionDisplay';

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route path='/' exact component={App}/>
            <Route path='/blockchain' component={Blockchain}/>
            <Route path='/product-transaction' component={ProductTransaction}/>
            <Route path='/transaction-pool' component={TransactionPool}/>
            <Route path='/check-status' component={TransactionStatus}/>
            <Route path='/transaction-display' component={TransactionDisplay}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);