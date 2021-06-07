import React from 'react';

// pass user as parameter when user auth is setup
class UpdateUserView extends React.Component {
  state = {
    user: JSON.parse(window.localStorage.getItem('user')),
  };

  // I need to call the create/update user form from components
  // Create a submit function in this view pass it to the submit button on the create User component

  render() {
    return (
      <>
        <div>
          <h1>Update User View</h1>
        </div>
      </>
    );
  }
}

export default UpdateUserView;
