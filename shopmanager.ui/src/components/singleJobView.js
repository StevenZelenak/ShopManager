import '../styles/singleJobView.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import PartTableRow from './partTableRow';
import jobData from '../helpers/data/jobData';
import partData from '../helpers/data/partData';

/* eslint-disable react/prop-types */

// pass user as parameter when user auth is setup
class SingleJobView extends React.Component {
  state = {
    job: [],
    parts: [],
  };

  componentDidMount = () => {
    // Assigning the id to a variable grabbing it from props/match/params/id
    const jobId = this.props.match.params.id;
    this.getASingleJob(jobId);
    this.getAllPartsForJob(jobId);
  }

  // Gets a single user by Id and sets the state user to that data
  getASingleJob = (jobId) => {
    jobData.getSingleJob(jobId).then((response) => {
      this.setState({
        job: response,
      });
    });
  };

  getAllPartsForJob = (jobId) => {
    partData.getAllPartsByJob(jobId).then((response) => {
      this.setState({
        parts: response,
      });
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  changeRoute = () => {
    const { history } = this.props;
    history.push('/logged-in');
  };

  changeRouteUpdate = (id) => {
    const { history } = this.props;
    history.push(`/update_part/${id}`);
  };

  changeRouteSingleView = (id) => {
    const { history } = this.props;
    history.push(`/single_part/${id}`);
  };

  removePart = (id) => {
    partData.deletePart(id).then(() => {
      window.location.reload();
    });
  }

  render() {
    const { job, parts } = this.state;
    const renderAllPartRows = () => parts.map((part) => <PartTableRow id={part.id} key={part.id} part={part} removePart={this.removePart} changeRouteUpdate={this.changeRouteUpdate} changeRouteSingleView={this.changeRouteSingleView}/>);
    return (
      <>
        <div className='container'>
          <div className='item'>
            <h2>{job.jobName}</h2>
            <button><Link to={`/create_part/${job.id}`} href='#'>
              Add Part +
            </Link></button>
          </div>
          <div className='item'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Part Name</th>
                <th>Update</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{renderAllPartRows()}</tbody>
          </Table>
          </div>
        </div>
      </>
    );
  }
}

export default SingleJobView;
