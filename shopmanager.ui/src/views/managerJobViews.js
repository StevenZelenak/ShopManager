import React from 'react';
import { Table } from 'react-bootstrap';
import JobTableRow from '../components/jobTableRows';
import jobData from '../helpers/data/jobData';

/* eslint-disable react/prop-types */

// pass user as parameter when user auth is setup
class ManagerJobView extends React.Component {
  state = {
    user: JSON.parse(window.localStorage.getItem('user')),
    companyJobs: [],
  };

  componentDidMount() {
    this.getAllOfTheJobsByCompany(this.state.user.companyId);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getAllOfTheJobsByCompany = (companyId) => {
    jobData.getAllJobsByCompany(companyId).then((response) => {
      this.setState({
        companyJobs: response,
      });
    });
  };

  changeRouteUpdate = (id) => {
    const { history } = this.props;
    history.push(`/update_job/${id}`);
  };

  changeRouteSingleView = (id) => {
    const { history } = this.props;
    history.push(`/single_job/${id}`);
  };

  removeJob = (id) => {
    jobData.deleteJob(id).then(() => {
      window.location.reload();
    });
  }

  render() {
    const { companyJobs } = this.state;
    const renderAllJobRows = () => companyJobs.map((job) => <JobTableRow id={job.id} key={job.id} job={job} removeJob={this.removeJob} changeRouteUpdate={this.changeRouteUpdate} changeRouteSingleView={this.changeRouteSingleView}/>);
    return (
      <>
        <div>
          <h1>Manager Job View</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Job Name</th>
                <th>Customer</th>
                <th>Update</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{renderAllJobRows()}</tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default ManagerJobView;
