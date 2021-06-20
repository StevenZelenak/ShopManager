import React from 'react';
import {
  Form,
  Button,
  Col,
  Row,
} from 'react-bootstrap';
import companyData from '../helpers/data/companyData';
import userData from '../helpers/data/userData';

/* eslint-disable react/prop-types */

// pass user as parameter when user auth is setup
class RegisterUser extends React.Component {
  state = {
    company: [],
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    companyEmail: '',
    isManager: true,
    isEmployee: false,
    companyId: -1,
  }

  componentDidMount = () => {
    this.getASingleCompany();
  }

  // Gets a single part by Id and sets the state part to that data
  getASingleCompany = () => {
    companyData.getLastCompany().then((response) => {
      console.warn('log', response);
      this.setState({
        company: response,
      }, this.fillInCompanyId);
    });
  };

  fillInCompanyId = () => {
    this.setState({
      companyId: this.state.company.id,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    // perform all neccassary validations
    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      // make API call
      userData.addUser(this.state).then(() => {
        this.changeRoute();
      });
    }
  }

  changeRoute = () => {
    const { history } = this.props;
    console.warn('history', history);
    history.push('/login');
  }

  handleCancel = () => {
    // I need to grab the last company and delete it
    companyData.deleteCompany(this.state.companyId).then(() => {
      this.changeRoute();
    });
  }

  render() {
    return (
      <>
      <h1>Register User</h1>
        <Form>
        <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      First Name:
    </Form.Label>
    <Col sm={10}>
      <Form.Control
      type="text"
      name="firstName"
      value={this.state.firstName}
      onChange={this.handleChange}
      required/>
    </Col>
  </Form.Group>
  <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      Last Name:
    </Form.Label>
    <Col sm={10}>
    <Form.Control
      type="text"
      name="lastName"
      value={this.state.lastName}
      onChange={this.handleChange}
      required/>
    </Col>
  </Form.Group>
  <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      Username:
    </Form.Label>
    <Col sm={10}>
    <Form.Control
      type="text"
      name="username"
      value={this.state.username}
      onChange={this.handleChange}
      required/>
    </Col>
  </Form.Group>
  <Form.Group as={Row} controlId="formHorizontalPassword">
    <Form.Label column sm={2}>
      Password:
    </Form.Label>
    <Col sm={10}>
    <Form.Control
      type="password"
      name="password"
      value={this.state.password}
      onChange={this.handleChange}
      required/>
    </Col>
  </Form.Group>
  <Form.Group as={Row} controlId="formHorizontalPassword">
    <Form.Label column sm={2}>
      Confirm Password:
    </Form.Label>
    <Col sm={10}>
    <Form.Control
      type="password"
      name="confirmPassword"
      value={this.state.confirmPassword}
      onChange={this.handleChange}
      required/>
    </Col>
  </Form.Group>
  <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      Email Address:
    </Form.Label>
    <Col sm={10}>
    <Form.Control
      type="text"
      name="companyEmail"
      value={this.state.companyEmail}
      onChange={this.handleChange}
      required/>
    </Col>
  </Form.Group>

  <Form.Group as={Row}>
    <Col sm={{ span: 10, offset: 2 }}>
      <Button type="" onClick={this.handleSubmit}>Submit</Button>
      <Button variant='danger' type="" onClick={this.handleCancel}>Cancel</Button>
    </Col>
  </Form.Group>
</Form>
      </>
    );
  }
}

export default RegisterUser;
