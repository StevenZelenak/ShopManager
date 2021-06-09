import '../styles/singleUserView.scss';
import React from 'react';
import userData from '../helpers/data/userData';

/* eslint-disable react/prop-types */

// pass user as parameter when user auth is setup
class SingleUserView extends React.Component {
  state = {
    user: [],
  };

  componentDidMount = () => {
    // Assigning the id to a variable grabbing it from props/match/params/id
    const userId = this.props.match.params.id;
    this.getASingleUser(userId);
  };

  // Gets a single user by Id and sets the state user to that data
  getASingleUser = (userId) => {
    userData.getSingleUser(userId).then((response) => {
      this.setState({
        user: response,
      });
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  changeRoute = () => {
    const { history } = this.props;
    history.push('/logged-in');
  };

  handleCancel = () => {
    this.changeRoute();
  };

  render() {
    const { user } = this.state;
    return (
      <>
        <div className='container'>
          <div className='item'>
            <h2>Employee Info</h2>
            <h3>
              Employee Name: {user.firstName} {user.lastName}
            </h3>
            <h3>Employee Email: {user.companyEmail}</h3>
            <h3>
              Employee Status:{' '}
              {user.isManager ? <p>Manager</p> : <p>Employee</p>}
            </h3>
          </div>
          <div className='item'>
            <h2>Assigned Task</h2>
          </div>
          <div className='item'>
            <h2>Completed Task</h2>
          </div>
        </div>
      </>
    );
  }
}

export default SingleUserView;
