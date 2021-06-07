import './App.scss';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../helpers/routes';
import Navbar from '../components/navbar';

class App extends React.Component {
  state = {
    user: JSON.parse(window.localStorage.getItem('user')),
  };

  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Navbar />
          <Routes user={this.state.user}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
