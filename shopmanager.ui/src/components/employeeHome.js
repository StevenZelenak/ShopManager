import React from 'react';

// pass user as parameter when user auth is setup
class EmployeeHome extends React.Component {
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
        <h1>Employee Home</h1>
      </div>
    );
  }
}

export default EmployeeHome;
