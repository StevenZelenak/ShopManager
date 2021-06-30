import React from 'react';
import ManagerHome from '../views/managerHome';
import EmployeeHome from '../views/employeeHome';

/* eslint-disable react/prop-types */

class LoginHome extends React.Component {
  state = {
    user: JSON.parse(window.localStorage.getItem('user')),
  };

  changeRoute = (link) => {
    const { history } = this.props;
    history.push(`/${link}`);
  }

  render() {
    return (
      <>
        <div className='loginBox'>
          {this.state.user.isManager ? <ManagerHome changeRoute={ this.changeRoute }/> : <EmployeeHome />}
        </div>
      </>
    );
  }
}

export default LoginHome;
