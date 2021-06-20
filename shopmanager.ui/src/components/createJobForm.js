import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Form,
  Col,
  Row,
  Button
} from 'react-bootstrap';
import jobData from '../helpers/data/jobData';

/* eslint-disable react/prop-types */

// pass user as parameter when user auth is setup
class CreateJobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyId: -1,
      jobName: '',
      customer: '',
      dateRec: new Date(),
      dateDue: new Date(),
      dateFinished: null,
      budget: 0,
      isComplete: false,
      setDateRec: new Date(),
      setDateDue: new Date(),
    };
    this.dateChangeOne = this.dateChangeOne.bind(this);
    this.dateChangeTwo = this.dateChangeTwo.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount = () => {
    if (this.props.user) {
      this.setState({
        companyId: this.props.user.companyId,
      });
    }
  };

  dateChangeOne(date) {
    console.warn('date', date);
    this.setState({
      setDateRec: date,
    });
  }

  dateChangeTwo(date) {
    this.setState({
      setDateDue: date,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.type !== 'text' ? parseInt(e.target.value, 10) : e.target.value,
    });
  };

  onFormSubmit(e) {
    e.preventDefault();
    this.setState(
      {
        dateRec: this.state.setDateRec
          .toISOString()
          .slice(0, 19)
          .replace('T', ' '),
        dateDue: this.state.setDateDue
          .toISOString()
          .slice(0, 19)
          .replace('T', ' '),
      },
      this.submitNewJob
    );
  }

  submitNewJob = () => {
    // make API call
    const {
      companyId,
      jobName,
      customer,
      dateRec,
      dateDue,
      dateFinished,
      budget,
      isComplete,
    } = this.state;
    const newJob = {
      companyId,
      jobName,
      customer,
      dateRec,
      dateDue,
      dateFinished,
      budget,
      isComplete,
    };
    jobData.addJob(newJob).then(() => {
      this.changeRoute();
    });
  };

  changeRoute = () => {
    const { history } = this.props;
    history.push('/logged-in');
  };

  handleCancel = () => {
    this.changeRoute();
  };

  render() {
    return (
      <>
      <h1>Add Job</h1>
      <Form>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Job Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type='text'
              name='jobName'
              value={this.state.jobName}
              onChange={this.handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Customer:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type='text'
              name='customer'
              value={this.state.customer}
              onChange={this.handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Budget:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type='number'
              name='budget'
              value={this.state.budget}
              onChange={this.handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Date Received:
          </Form.Label>
          <Col sm={10}>
            <DatePicker
              selected={this.state.setDateRec}
              onChange={this.dateChangeOne}
              name='dateRec'
              dateFormat='MM/dd/yyyy'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Date Due:
          </Form.Label>
          <Col sm={10}>
            <DatePicker
              selected={this.state.setDateDue}
              onChange={this.dateChangeTwo}
              name='dateDue'
              dateFormat='MM/dd/yyyy'
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type='' onClick={this.onFormSubmit}>
              Submit
            </Button>
            <Button variant='danger' type='' onClick={this.handleCancel}>
              Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
      </>
    );
  }
}

export default CreateJobForm;
