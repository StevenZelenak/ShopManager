import React from 'react';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import { Link } from 'react-router-dom';
/* eslint-disable react/prop-types */

// pass user as parameter when user auth is setup
class MyNavbar extends React.Component {
  logoutEvent = () => {
    localStorage.clear();
    window.location.reload();
  }

  render() {
    console.warn('props', this.props);
    return (
      <div>
        <Navbar color='dark' expand='lg'>
          <NavbarBrand className='gradient-text'>
            <Link to='/' className='nav-link' href='#'>
              Shop Manager
            </Link>
          </NavbarBrand>
            {localStorage.getItem('user') && (<Link className='ml-auto' to='/' type='submit' onClick={this.logoutEvent}>Logout</Link>)}
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
