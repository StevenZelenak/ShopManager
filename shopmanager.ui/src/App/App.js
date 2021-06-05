import './App.scss';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../helpers/routes';
import Navbar from '../components/navbar';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Navbar logoutEvent={this.logoutEvent}/>
          <Routes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
