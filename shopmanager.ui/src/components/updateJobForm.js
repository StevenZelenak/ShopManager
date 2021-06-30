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
class UpdateJobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: [],
      id: -1,
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
      setFinishDate: new Date(),
    };
    this.dateChangeOne = this.dateChangeOne.bind(this);
    this.dateChangeTwo = this.dateChangeTwo.bind(this);
    this.dateChangeThree = this.dateChangeThree.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount = () => {
    // Assigning the id to a variable grabbing it from props/match/params/id
    const jobId = this.props.match.params.id;
    this.getASingleJob(jobId);
  }

  // Gets a single job by Id and sets the state job to that data
  getASingleJob = (jobId) => {
    jobData.getSingleJob(jobId).then((response) => {
      this.setState({
        job: response,
      }, this.fillInJobInfo);
    });
  }

  fillInJobInfo = () => {
    if (this.state.job.isComplete === true) {
      this.setState({
        id: this.state.job.id,
        companyId: this.state.job.companyId,
        setDateRec: new Date(this.state.job.dateRec),
        setDateDue: new Date(this.state.job.dateDue),
        setFinishDate: new Date(this.state.job.dateFinished),
        dateRec: this.state.job.dateRec,
        jobName: this.state.job.jobName,
        customer: this.state.job.customer,
        budget: this.state.job.budget,
        isComplete: this.state.job.isComplete,
        dateFinished: this.state.job.dateFinished,
      });
    }
    this.setState({
      id: this.state.job.id,
      companyId: this.state.job.companyId,
      setDateRec: new Date(this.state.job.dateRec),
      setDateDue: new Date(this.state.job.dateDue),
      dateRec: this.state.job.dateRec,
      dateDue: this.state.job.dateDue,
      jobName: this.state.job.jobName,
      customer: this.state.job.customer,
      budget: this.state.job.budget,
      isComplete: this.state.job.isComplete,
      dateFinished: null,
    });
  }

  dateChangeOne(date) {
    this.setState({
      setDateRec: date,
    });
  }

  dateChangeTwo(date) {
    this.setState({
      setDateDue: date,
    });
  }

  dateChangeThree(date) {
    this.setState({
      setFinishDate: date,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.type !== 'text' ? parseInt(e.target.value, 10) : e.target.value,
    });
  };

  onFormSubmit(e) {
    e.preventDefault();
    if (this.state.isComplete) {
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
          dateFinished: this.state.setFinishDate
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '),
        },
        this.submitNewJob
      );
    }
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

  checkChange = () => {
    const { isComplete } = this.state;

    if (isComplete === false) {
      this.setState({
        isComplete: true
      });
    } else if (isComplete === true) {
      this.setState({
        isComplete: false,
        dateFinished: null,
      });
    }
  }

  submitNewJob = () => {
    // make API call
    const {
      id,
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
      id,
      companyId,
      jobName,
      customer,
      dateRec,
      dateDue,
      dateFinished,
      budget,
      isComplete,
    };
    jobData.updateJob(newJob).then(() => {
      this.changeRoute();
    });
  };

  changeRoute = () => {
    const { history } = this.props;
    history.push('/logged-in');
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push('/view_jobs');
  };

  render() {
    return (
      <>
      <div className='job-parent-div'>
      <Form className='job-form-parent'>
      <h5 className='job-sign-in'>Update Job</h5>
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
        { this.state.isComplete
          ? <Form.Group as={Row}>
          <Form.Label column sm={4}>
            Date Finished:
          </Form.Label>
          <Col sm={6}>
            <DatePicker
              selected={this.state.setFinishDate}
              onChange={this.dateChangeThree}
              name='dateFinished'
              dateFormat='MM/dd/yyyy'
            />
          </Col>
        </Form.Group>
          : <p></p>}
        <Form.Group controlId="formBasicCheckbox">
        <Col sm={{ span: 10, offset: 2 }}>
          <Form.Check type="checkbox" label="Complete" checked={this.state.isComplete === true} onChange={this.checkChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
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

export default UpdateJobForm;
