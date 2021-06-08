import React from 'react';
import { Link } from 'react-router-dom';

// pass user as parameter when user auth is setup
class ManagerHome extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.setState({
      user: JSON.parse(window.localStorage.getItem('user')),
    });
  }

  render() {
    return (
      <>
        <div>
          <h1>Manager Home</h1>
          <Link to='/create_user' href='#'>
              Create User
            </Link>
            <Link to='/' className='nav-link' href='#'>
              Create Job
            </Link>
            <Link to='/view_user' href='#'>
              View Users
            </Link>
            <Link to='/' className='nav-link' href='#'>
              View Jobs
            </Link>
        </div>
      </>
    );
  }
}

export default ManagerHome;
