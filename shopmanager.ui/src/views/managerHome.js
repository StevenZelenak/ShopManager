import '../styles/managerHome.scss';
import React from 'react';
import { Button } from 'react-bootstrap';

/* eslint-disable react/prop-types */

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
        <div className='manager-parent-div'>
          <div className='Grid'>
          <Button className='Grid-item' onClick={() => this.props.changeRoute('create_user')}>Create User</Button>
          <Button className='Grid-item' onClick={() => this.props.changeRoute('create_job')}>Create Job</Button>
          <Button className='Grid-item' onClick={() => this.props.changeRoute('view_user')}>View Users</Button>
          <Button className='Grid-item' onClick={() => this.props.changeRoute('view_jobs')}>View Jobs</Button>
          </div>
        </div>
      </>
    );
  }
}

export default ManagerHome;
