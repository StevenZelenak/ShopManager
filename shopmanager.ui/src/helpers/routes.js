import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import Login from '../components/login';
import LoggedInHome from '../components/loggedInHome';
import CreateUserView from '../views/createUserView';
import UpdateUserView from '../views/updateUserView';
import ManagerUserView from '../views/managerUserView';

/* eslint-disable react/prop-types */

export default function Routes({ user }) {
  return (
        <Switch>
            <PrivateRoute exact component={LoggedInHome} path='/' />
            <PrivateRoute exact component={LoggedInHome} path='/logged-in' />
            <PrivateRoute exact component={(props) => <CreateUserView user={user} {...props}/>} path='/create_user' />
            <PrivateRoute exact component={(props) => <ManagerUserView {...props}/>} path='/view_user' />
            <PrivateRoute exact component={UpdateUserView} path='/update_user' />
            <Route exact path="/" component={Login}/>
            <Route exact path="/login" component={Login} />
        </Switch>
  );
}
