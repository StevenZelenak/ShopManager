import React from 'react';

// pass user as parameter when user auth is setup
class ManagerHome extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.setState({
      user: JSON.parse(window.localStorage.getItem('user'))
    });
  }

  render() {
    return (
      <div>
        <h1>Manager Home</h1>
      </div>
    );
  }
}

export default ManagerHome;
