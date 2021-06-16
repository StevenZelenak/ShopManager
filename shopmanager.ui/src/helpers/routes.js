import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import Login from '../components/login';
import LoggedInHome from '../components/loggedInHome';
// create route
import CreateUserView from '../views/createUserView';
import CreateJobForm from '../components/createJobForm';
import CreatePartForm from '../components/createPartForm';
// update route
import UpdateUserView from '../views/updateUserView';
import UpdateUserForm from '../components/updateUserForm';
import UpdateJobForm from '../components/updateJobForm';
// singleView routes
import SingleUserView from '../components/singleUserView';
import SingleJobView from '../components/singleJobView';
import SinglePartView from '../components/singlePartView';
// all of specific data view
import ManagerUserView from '../views/managerUserView';
import ManagerJobView from '../views/managerJobViews';

/* eslint-disable react/prop-types */

export default function Routes({ user }) {
  return (
        <Switch>
            <PrivateRoute exact component={LoggedInHome} path='/' />
            <PrivateRoute exact component={LoggedInHome} path='/logged-in' />
            <PrivateRoute exact component={(props) => <CreateUserView user={user} {...props}/>} path='/create_user' />
            <PrivateRoute exact component={(props) => <CreateJobForm user={user} {...props}/>} path='/create_job' />
            <PrivateRoute exact component={(props) => <CreatePartForm user={user} {...props}/>} path='/create_part/:id' />
            <PrivateRoute exact component={(props) => <ManagerUserView {...props}/>} path='/view_user' />
            <PrivateRoute exact component={(props) => <ManagerJobView {...props}/>} path='/view_jobs' />
            <PrivateRoute exact component={(props) => <UpdateUserForm {...props}/>} path='/update_user/:id' />
            <PrivateRoute exact component={(props) => <SingleUserView {...props}/>} path='/single_user/:id' />
            <PrivateRoute exact component={(props) => <UpdateJobForm {...props}/>} path='/update_job/:id' />
            <PrivateRoute exact component={(props) => <SingleJobView {...props}/>} path='/single_job/:id' />
            <PrivateRoute exact component={(props) => <SinglePartView user={user} {...props}/>} path='/single_part/:id' />
            <PrivateRoute exact component={UpdateUserView} path='/update_user' />
            <Route exact path="/" component={Login}/>
            <Route exact path="/login" component={Login} />
        </Switch>
  );
}
