import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* eslint-disable react/prop-types */
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (localStorage.getItem('user') ? <Component {...props} /> : <Redirect to='/login' />)} />
);

export default PrivateRoute;
