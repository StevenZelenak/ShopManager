import '../styles/login.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import userData from '../helpers/data/userData';

class Login extends React.Component {
  state = {
    userSearch: [],
    user: localStorage.getItem('user'),
    username: '',
    password: '',
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
    loginCallback: PropTypes.func.isRequired
  };

  // I am checking if username and password match the one in the database then setting that user data to localStorage 'user' to be called in other components
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.username === this.state.userSearch[0].username && this.state.password === this.state.userSearch[0].password) {
      // localStorage.setItem('user', JSON.stringify(this.state.userSearch[0]));
      this.setState({
        user: localStorage.setItem('user', JSON.stringify(this.state.userSearch[0])),
      }, this.changeRoute);
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  changeRoute = () => {
    this.props.loginCallback(this.state.user);
    const { history } = this.props;
    history.push('/logged-in');
  }

  populateResults = () => {
    const searchTerm = this.state.username;

    userData.getSearchedUsers(searchTerm.toLowerCase()).then((response) => {
      this.setState({
        userSearch: response,
        searchTerm,
      });
    });
  };

  componentDidUpdate(prevState) {
    if (prevState.searchTerm !== this.state.username) {
      this.populateResults();
    }
  }

  componentDidMount() {
    this.populateResults();
  }

  onRegister = () => {
    const { history } = this.props;
    history.push('/register_company');
  }

  render() {
    return (
      <>
        <div className='parent-div-login'>
          <Form className='form-parent'>
          <h5 className='sign-in'>Sign In</h5>
            <Form.Group>
              <Form.Control
                className='form-boxes'
                type='text'
                name='username'
                value={this.state.username}
                onChange={this.handleChange}
                placeholder='Username'
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className='form-boxes'
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
                placeholder='Password'
              />
            </Form.Group>
            <div>
            <Button className='form-button' onClick={this.handleSubmit}>
              Login
            </Button>
            </div>
            <div>
            <Link to='/register_company' className='form-sign-up' href='#'>
              Not a user? Sign up
            </Link>
            </div>
          </Form>
        </div>
      </>
    );
  }
}

export default Login;
