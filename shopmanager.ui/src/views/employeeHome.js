import React from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import partData from '../helpers/data/partData';

// pass user as parameter when user auth is setup
class EmployeeHome extends React.Component {
  state = {
    user: JSON.parse(window.localStorage.getItem('user')),
    dQuot: '"',
    parts: [],
    id: -1,
    jobId: -1,
    partName: '',
    materialType: '',
    materialFinish: '',
    sizeLength: -1,
    sizeWidth: -1,
    sizeHeight: -1,
    price: -1,
    isComplete: 0,
    dateStart: new Date(),
    dateEnd: new Date(),
  };

  componentDidMount = () => {
    // Assigning the id to a variable grabbing it from props/match/params/id
    this.getAllPartsForJob(this.state.user.id);
  }

  // get all the jobs by userId that match this user
  getAllPartsForJob = (userId) => {
    partData.getAllPartsByUser(userId).then((response) => {
      console.warn(response.length);
      if (response.length > 0) {
        this.setState({
          parts: response,
        }, this.fillInPartInfo);
      } else {
        this.setState({
          parts: [],
        });
      }
    });
  }

  fillInPartInfo = () => {
    this.setState({
      id: this.state.parts[0].id,
      jobId: this.state.parts[0].jobId,
      userId: this.state.parts[0].userId,
      partName: this.state.parts[0].partName,
      materialType: this.state.parts[0].materialType,
      materialFinish: this.state.parts[0].materialFinish,
      sizeLength: this.state.parts[0].sizeLength,
      sizeWidth: this.state.parts[0].sizeWidth,
      sizeHeight: this.state.parts[0].sizeHeight,
      price: this.state.parts[0].price,
      isComplete: this.state.parts[0].isComplete,
      dateStart: this.state.parts[0].dateStart,
      dateEnd: this.state.parts[0].dateEnd,
    });
  }

  // Creates a new object to pass to the post api call
  submitUpdatedPart = () => {
    // make API call
    const {
      id,
      jobId,
      userId,
      partName,
      materialType,
      materialFinish,
      sizeLength,
      sizeWidth,
      sizeHeight,
      price,
      isComplete,
      dateStart,
      dateEnd
    } = this.state;
    const updatePartInfoWithUserId = {
      id,
      jobId,
      partName,
      materialType,
      materialFinish,
      sizeLength,
      sizeWidth,
      sizeHeight,
      price,
      userId,
      isComplete,
      dateStart,
      dateEnd
    };
    partData.updatePart(updatePartInfoWithUserId).then(() => {
      window.location.reload();
    });
  }

  // I need a start button on the table-row that when pressed updates the part in the dateStart column with current date/time(When pressed the start button should vanish)
  onStart = () => {
    this.setState({
      dateStart: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    }, this.submitUpdatedPart);
  }

  // I need a stop button on the table-row that when pressed updates the part in the dateEnd column withe the current date/time and unassigns the user from the part also the part should be marked as complete
  onFinish = () => {
    this.setState({
      dateEnd: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      isComplete: true,
      userId: null
    }, this.submitUpdatedPart);
  }

  render() {
    return (
      <>
      {this.state.parts.length > 0 ? <div>
        <h1>Assigned Parts</h1>
        <h3>Part name: {this.state.partName}</h3>
        <h3>Material: {this.state.materialType}</h3>
        <h3> Length: {this.state.sizeLength}{this.state.dQuot} Width: {this.state.sizeWidth}{this.state.dQuot} Height: {this.state.sizeHeight}{this.state.dQuot}</h3>
        { this.state.dateStart === null
          ? <Button type='' onClick={this.onStart}>
              Start
            </Button> : <Button variant='danger' type='' onClick={this.onFinish}>
              Finish
            </Button>
        }
      </div> : <h3>You have no assigned parts</h3>
  }
      </>
    );
  }
}

export default EmployeeHome;
