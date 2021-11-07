import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import './index.css';
import history from './history';
import App from './components/App';
import Blockchain from './components/Blockchain';
import TransactionPool from './components/TransactionPool';
import Transaction_status from './components/Transaction_status';
import Transaction_display from './components/Transaction_display';
import ConductPackageTransaction from './components/ConductPackageTransaction';

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path='/' exact component={App} />
      <Route path='/blockchain' component={Blockchain} />
      <Route path='/transaction-pool' component={TransactionPool} />
      <Route path='/check-status' component={Transaction_status} />
      <Route path='/transaction-display' component={Transaction_display} />
      <Route path='/conduct-package-transaction' component={ConductPackageTransaction} />
    </Switch>
  </Router>,
  document.getElementById('root')
);