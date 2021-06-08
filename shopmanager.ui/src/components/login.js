import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import userData from '../helpers/data/userData';

class Login extends React.Component {
  state = {
    userSearch: [],
    user: [],
    username: '',
    password: '',
  };

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  // I am checking if username and password match the one in the database then setting that user data to localStorage 'user' to be called in other components
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.username === this.state.userSearch[0].username && this.state.password === this.state.userSearch[0].password) {
      localStorage.setItem('user', JSON.stringify(this.state.userSearch[0]));
      this.setState({
        user: this.state.userSearch,
      }, this.changeRoute);
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  changeRoute = () => {
    const { history } = this.props;
    console.warn('history', history);
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

  render() {
    return (
      <>
        <div className='col-lg-6 offset-lg-3'>
          <Form className=''>
            <Form.Group>
              <Form.Label>Username: </Form.Label>
              <Form.Control
                type='text'
                name='username'
                value={this.state.username}
                onChange={this.handleChange}
                placeholder='Enter username'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
                placeholder='Password'
              />
            </Form.Group>
            <Button variant='primary' type='' onClick={this.handleSubmit}>
              Login
            </Button>
            <Button variant='danger' type=''>
              Register
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

export default Login;
