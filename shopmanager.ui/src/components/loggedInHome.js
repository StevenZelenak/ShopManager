import React from 'react';
import ManagerHome from '../views/managerHome';
import EmployeeHome from '../views/employeeHome';

class LoginHome extends React.Component {
  state = {
    user: JSON.parse(window.localStorage.getItem('user')),
  };

  render() {
    return (
      <>
        <div className='loginBox'>
          {this.state.user.isManager ? <ManagerHome /> : <EmployeeHome />}
        </div>
      </>
    );
  }
}

export default LoginHome;
