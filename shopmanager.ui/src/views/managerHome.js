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
            <button>
            <Link to='/create_user' href='#'>
              Create User
            </Link>
            </button>
            <button>
            <Link to='/create_job' href='#'>
              Create Job
            </Link>
            </button>
            <button>
            <Link to='/view_user' href='#'>
              View Users
            </Link>
            </button>
            <button>
            <Link to='/view_jobs' href='#'>
              View Jobs
            </Link>
            </button>
        </div>
      </>
    );
  }
}

export default ManagerHome;
