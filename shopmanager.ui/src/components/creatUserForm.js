import '../styles/createUser.scss';
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
      <div className='user-parent-div'>
        <Form className='user-form-parent'>
        <h5 className='user-sign-in'>Create User</h5>
        <Form.Row>
        <Form.Group as={Col}>
    <Col sm={10}>
      <Form.Control
      className='user-form-boxes'
      type="text"
      name="firstName"
      value={this.state.firstName}
      onChange={this.handleChange}
      placeholder='First Name'
      required/>
    </Col>
  </Form.Group>
  <Form.Group as={Col} >
    <Col sm={10}>
    <Form.Control
      className='user-form-boxes'
      type="text"
      name="lastName"
      value={this.state.lastName}
      onChange={this.handleChange}
      placeholder='Last Name'
      required/>
    </Col>
  </Form.Group>
  </Form.Row>
  <Form.Group >
    <Col sm={10}>
    <Form.Control
      className='user-form-boxes'
      type="text"
      name="username"
      value={this.state.username}
      onChange={this.handleChange}
      placeholder='Username'
      required/>
    </Col>
  </Form.Group>
  <Form.Group >
    <Col sm={10}>
    <Form.Control
      className='user-form-boxes'
      type="password"
      name="password"
      value={this.state.password}
      onChange={this.handleChange}
      placeholder='Password'
      required/>
    </Col>
  </Form.Group>
  <Form.Group >
    <Col sm={10}>
    <Form.Control
      className='user-form-boxes'
      type="password"
      name="confirmPassword"
      value={this.state.confirmPassword}
      onChange={this.handleChange}
      placeholder='Confirm Password'
      required/>
    </Col>
  </Form.Group>
  <Form.Group >
    <Col sm={10}>
    <Form.Control
      className='user-form-boxes'
      type="text"
      name="companyEmail"
      value={this.state.companyEmail}
      onChange={this.handleChange}
      placeholder='Email'
      required/>
    </Col>
  </Form.Group>
  <fieldset>
    <Form.Group as={Row}>
      <Col sm={11}>
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
    <Col>
      <Button className='user-form-button' onClick={this.handleSubmit}>Submit</Button>
      <Button className='user-form-cancel-button' onClick={this.handleCancel}>Cancel</Button>
    </Col>
  </Form.Group>
</Form>
</div>
      </>
    );
  }
}

export default CreateUserForm;
