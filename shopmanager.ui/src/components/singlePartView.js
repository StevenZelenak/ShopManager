import '../styles/singleJobView.scss';
import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import partData from '../helpers/data/partData';
import userData from '../helpers/data/userData';

/* eslint-disable react/prop-types */

// pass user as parameter when user auth is setup
class SinglePartView extends React.Component {
  state = {
    part: [],
    users: [],
    id: -1,
    userId: 0,
    userName: 'Select User',
  };

  componentDidMount = () => {
    // Assigning the id to a variable grabbing it from props/match/params/id
    const partId = this.props.match.params.id;
    const company = this.props.user.companyId;
    this.getASinglePart(partId);
    this.getUsersInfoByCompany(company);
    this.setState({
      id: parseInt(partId, 10),
    });
  }

  // Gets a single part by Id and sets the state part to that data
  getASinglePart = (partId) => {
    partData.getSinglePart(partId).then((response) => {
      this.setState({
        part: response,
      });
    });
  };

  getUsersInfoByCompany = (companyId) => {
    userData.getAllUsersByCompany(companyId).then((response) => {
      this.setState({
        users: response,
      });
    });
  }

  changeRoute = () => {
    const { history } = this.props;
    history.push('/logged-in');
  };

  getUserId = (e) => {
    const foundUser = this.state.users.find((user) => parseInt(user.id, 10) === parseInt(e, 10));
    this.setState({ userId: parseInt(e, 10), userName: foundUser.firstName });
  }

  onSubmit = () => {
    // update just the userId on this part and navigate back to singleJob/view all parts
    partData.updatePartUser(this.state).then(() => {
      this.changeRoute();
    });
  }

  render() {
    const { part } = this.state;
    // const foundEmployee = this.state.users.find((user) => parseInt(user.id, 10) === parseInt(this.state.part.userId, 10));
    // console.warn('userId', this.state.part.userId, typeof this.state.part.userId);
    return (
      <>
        <div className=''>
          <h1>{part.partName}</h1>
          <h3>Material Ordered: {part.materialType}</h3>
          <h3>Material Finish: {part.materialFinish}</h3>
          <h3>Material Length: {part.sizeLength} Inches</h3>
          <h3>Material Width: {part.sizeWidth} Inches</h3>
          <h3>Material Height: {part.sizeHeight} Inches</h3>
          <h3>Price: ${part.price}</h3>
          {/* <h3>Currently assigned to: { this.state.part.userId > 0 ? foundEmployee.firstName : 'No one' } </h3> */}
        </div>
        <h3>Assign Employee: </h3>
        <Dropdown>
          <Dropdown.Toggle variant='primary' id='dropdown-basic'>
          {this.state.userName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {this.state.users.map((user) => <Dropdown.Item key={user.id} eventKey={user.id} id={user.id} onSelect={this.getUserId}>
              { user.firstName }
            </Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
        <Button onClick={ this.onSubmit }>Assign</Button>
      </>
    );
  }
}

export default SinglePartView;
