import React from 'react';
import { Table } from 'react-bootstrap';
import userData from '../helpers/data/userData';
import UserTableRow from '../components/userTableRow';

/* eslint-disable react/prop-types */

// pass user as parameter when user auth is setup
class ManagerUserView extends React.Component {
  state = {
    user: JSON.parse(window.localStorage.getItem('user')),
    companyUsers: [],
  };

  componentDidMount() {
    this.getAllOfTheUsersByCompany(this.state.user.companyId);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getAllOfTheUsersByCompany = (companyId) => {
    userData.getAllUsersByCompany(companyId).then((response) => {
      this.setState({
        companyUsers: response,
      });
    });
  };

  changeRouteUpdate = (id) => {
    const { history } = this.props;
    history.push(`/update_user/${id}`);
  };

  changeRouteSingleView = (id) => {
    const { history } = this.props;
    history.push(`/single_user/${id}`);
  };

  removeUser = (id) => {
    userData.deleteUser(id).then(() => {
      window.location.reload();
    });
  }

  render() {
    const { companyUsers } = this.state;
    const renderAllUserRows = () => companyUsers.map((user) => <UserTableRow id={user.id} key={user.id} user={user} removeUser={this.removeUser} changeRouteUpdate={this.changeRouteUpdate} changeRouteSingleView={this.changeRouteSingleView}/>);
    return (
      <>
        <div>
          <h1>Manager User View</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Update</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{renderAllUserRows()}</tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default ManagerUserView;
