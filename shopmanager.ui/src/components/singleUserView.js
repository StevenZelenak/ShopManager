import '../styles/singleUserView.scss';
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import PartTableRowUser from './partTabelRowUser';
import userData from '../helpers/data/userData';
import partData from '../helpers/data/partData';

/* eslint-disable react/prop-types */

// pass user as parameter when user auth is setup
class SingleUserView extends React.Component {
  state = {
    user: [],
    parts: [],
  };

  componentDidMount = () => {
    // Assigning the id to a variable grabbing it from props/match/params/id
    const userId = this.props.match.params.id;
    this.getASingleUser(userId);
    this.getAllPartsForUser(userId);
  };

  // Gets a single user by Id and sets the state user to that data
  getASingleUser = (userId) => {
    userData.getSingleUser(userId).then((response) => {
      this.setState({
        user: response,
      });
    });
  };

  // get all the jobs by userId that match this user
  getAllPartsForUser = (userId) => {
    partData.getAllPartsByUser(userId).then((response) => {
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

  handleCancel = () => {
    this.changeRoute();
  };

  goBack = () => {
    const { history } = this.props;
    history.push('/view_user');
  }

  render() {
    const { user, parts } = this.state;
    const renderAllPartRows = () => parts.map((part) => <PartTableRowUser id={part.id} key={part.id} part={part} />);
    return (
      <>
        <div className='container'>
          <div className='item'>
            <h2>Employee Info</h2>
            <h3>
              Employee Name: {user.firstName} {user.lastName}
            </h3>
            <h3>Employee Email: {user.companyEmail}</h3>
            <h3>
              Employee Status:{' '}
              {user.isManager ? <p>Manager</p> : <p>Employee</p>}
            </h3>
            <div>
          <Button onClick={this.goBack}>Back</Button>
        </div>
          </div>
          { user.isManager ? <p></p>
            : <div className='item'>
            <h2>Assigned Task</h2>
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>Part Name</th>
                <th>Material</th>
              </tr>
            </thead>
            <tbody>{renderAllPartRows()}</tbody>
          </Table>
          </div> }
        </div>
      </>
    );
  }
}

export default SingleUserView;
