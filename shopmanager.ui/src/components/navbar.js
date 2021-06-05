import React from 'react';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import { Link } from 'react-router-dom';
/* eslint-disable react/prop-types */

// pass user as parameter when user auth is setup
class MyNavbar extends React.Component {
  state = {
    isOpen: false,
  };

  logoutEvent = () => {
    localStorage.clear();
    window.location.reload();
  }

  render() {
    return (
      <div>
        <Navbar color='dark' expand='lg'>
          <NavbarBrand className='gradient-text'>
            <Link to='/' className='nav-link' href='#'>
              Shop Manager
            </Link>
          </NavbarBrand>
            {localStorage.key('user') && (<Link className='ml-auto' to='/' type='submit' onClick={this.logoutEvent}>Logout</Link>)}
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
