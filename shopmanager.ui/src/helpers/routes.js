import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import Login from '../components/login';
import LoggedInHome from '../components/loggedInHome';
import CreateUserView from '../views/createUserView';
import UpdateUserView from '../views/updateUserView';
import ManagerUserView from '../views/managerUserView';
import UpdateUserForm from '../components/updateUserForm';
import SingleUserView from '../components/singleUserView';
import CreateJobForm from '../components/createJobForm';
import ManagerJobView from '../views/managerJobViews';
import UpdateJobForm from '../components/updateJobForm';
/* eslint-disable react/prop-types */

export default function Routes({ user }) {
  return (
        <Switch>
            <PrivateRoute exact component={LoggedInHome} path='/' />
            <PrivateRoute exact component={LoggedInHome} path='/logged-in' />
            <PrivateRoute exact component={(props) => <CreateUserView user={user} {...props}/>} path='/create_user' />
            <PrivateRoute exact component={(props) => <CreateJobForm user={user} {...props}/>} path='/create_job' />
            <PrivateRoute exact component={(props) => <ManagerUserView {...props}/>} path='/view_user' />
            <PrivateRoute exact component={(props) => <ManagerJobView {...props}/>} path='/view_jobs' />
            <PrivateRoute exact component={(props) => <UpdateUserForm {...props}/>} path='/update_user/:id' />
            <PrivateRoute exact component={(props) => <SingleUserView {...props}/>} path='/single_user/:id' />
            <PrivateRoute exact component={(props) => <UpdateJobForm {...props}/>} path='/update_job/:id' />
            {/* <PrivateRoute exact component={(props) => <SingleUserView {...props}/>} path='/single_user/:id' /> */}
            <PrivateRoute exact component={UpdateUserView} path='/update_user' />
            <Route exact path="/" component={Login}/>
            <Route exact path="/login" component={Login} />
        </Switch>
  );
}
