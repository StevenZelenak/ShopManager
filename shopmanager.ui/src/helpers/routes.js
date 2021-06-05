import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import Login from '../components/login';
import LoggedInHome from '../components/loggedInHome';

export default function Routes() {
  return (
        <Switch>
            <PrivateRoute exact component={LoggedInHome} path='/' />
            <PrivateRoute exact component={LoggedInHome} path='/logged-in' />
            <Route exact path="/" component={Login}/>
            <Route exact path="/login" component={Login} />
        </Switch>
  );
}
