import '../styles/createJob.scss';
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
      <div className='job-parent-div'>
      <Form className='job-form-parent'>
      <h5 className='job-sign-in'>Create Job</h5>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm="3">
            Job name:
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              className='job-form-boxes'
              type='text'
              name='jobName'
              value={this.state.jobName}
              onChange={this.handleChange}
              placeholder='Job Name'
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
        <Form.Label column sm="3">
            Customer:
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              className='job-form-boxes'
              type='text'
              name='customer'
              value={this.state.customer}
              onChange={this.handleChange}
              placeholder='Customer'
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
        <Form.Label column sm="3">
            Budget:
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              className='job-form-boxes'
              type='number'
              name='budget'
              value={this.state.budget}
              onChange={this.handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={4}>
            Date Received:
          </Form.Label>
          <Col sm={6}>
            <DatePicker
              selected={this.state.setDateRec}
              onChange={this.dateChangeOne}
              name='dateRec'
              dateFormat='MM/dd/yyyy'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={4}>
            Date Due:
          </Form.Label>
          <Col sm={6}>
            <DatePicker
              selected={this.state.setDateDue}
              onChange={this.dateChangeTwo}
              name='dateDue'
              dateFormat='MM/dd/yyyy'
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col>
            <Button className='job-form-button' onClick={this.onFormSubmit}>
              Submit
            </Button>
            <Button className='job-form-cancel-button' onClick={this.handleCancel}>
              Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
      </div>
      </>
    );
  }
}

export default CreateJobForm;
