import React from 'react';
import {
  Form,
  Button,
  Col,
  Row,
} from 'react-bootstrap';
import userData from '../helpers/data/userData';

/* eslint-disable react/prop-types */

// pass user as parameter when user auth is setup
class CreateUserForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    companyEmail: '',
    isManager: false,
    isEmployee: false,
    companyId: -1,
  }

  componentDidMount = () => {
    if (this.props.user) {
      this.setState({
        companyId: this.props.user.companyId,
      });
    }
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
        this.props.changeRoute();
      });
    }
  }

  handleCancel = () => {
    this.props.changeRoute();
  }

  radioChange = (e) => {
    const { isManager, isEmployee } = this.state;

    if (isManager === false && isEmployee === false) {
      this.setState({
        [e.target.name]: true
      });
    } else if (isManager === true && isEmployee === false) {
      this.setState({
        isEmployee: true,
        isManager: false
      });
    } else if (isManager === false && isEmployee === true) {
      this.setState({
        isManager: true,
        isEmployee: false
      });
    }
  }

  render() {
    return (
      <>
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
  <fieldset>
    <Form.Group as={Row}>
      <Form.Label as="legend" column sm={2}>
        Employment Status:
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Manager"
          name="isManager"
          checked={this.state.isManager === true}
          value={this.state.isManager}
          onChange={this.radioChange}
        />
        <Form.Check
          type="radio"
          label="Employee"
          name="isEmployee"
          checked={this.state.isEmployee === true}
          value={this.state.isEmployee}
          onChange={this.radioChange}
        />
      </Col>
    </Form.Group>
  </fieldset>

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

export default CreateUserForm;
