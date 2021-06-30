import React from 'react';
import CreateUserForm from '../components/creatUserForm';

/* eslint-disable react/prop-types */

// pass user as parameter when user auth is setup
class CreateUserView extends React.Component {
  state = {
    user: JSON.parse(window.localStorage.getItem('user')),
  };

  changeRoute = () => {
    const { history } = this.props;
    console.warn('history', history);
    history.push('/logged-in');
  };

  render() {
    return (
      <>
        <CreateUserForm user={this.state.user} changeRoute={this.changeRoute} />
      </>
    );
  }
}

export default CreateUserView;
