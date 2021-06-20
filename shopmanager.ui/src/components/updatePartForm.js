import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Form,
  Col,
  Row,
  Button
} from 'react-bootstrap';
import partData from '../helpers/data/partData';

/* eslint-disable react/prop-types */

// pass user as parameter when user auth is setup
class UpdatePartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      part: [],
      id: -1,
      jobId: -1,
      userId: 0,
      partName: '',
      materialType: '',
      MaterialFinish: '',
      sizeLength: 0,
      sizeWidth: 0,
      sizeHeight: 0,
      isComplete: false,
      price: 0,
      dateStart: null,
      dateEnd: null,
      changeDateStart: new Date(),
      changeDateEnd: new Date(),
      isChecked: false,
    };
    this.dateChangeOne = this.dateChangeOne.bind(this);
    this.dateChangeTwo = this.dateChangeTwo.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  // WE are going to try a nullable int (int?)

  componentDidMount = () => {
    // Assigning the id to a variable grabbing it from props/match/params/id
    const partId = this.props.match.params.id;
    this.getASinglePart(partId);
    this.setState({
      id: parseInt(partId, 10),
    });
  }

  // Gets a single part by Id and sets the state part to that data
  getASinglePart = (partId) => {
    partData.getSinglePart(partId).then((response) => {
      this.setState({
        part: response,
      }, this.fillInJobInfo);
    });
  }

  // Fills in the update form with the part info
  fillInJobInfo = () => {
    if (this.state.isChecked === true && this.state.part.dateStart === null && this.state.part.dateEnd === null) {
      this.setState({
        jobId: this.state.part.jobId,
        partName: this.state.part.partName,
        materialType: this.state.part.materialType,
        materialFinish: this.state.part.materialFinish,
        sizeLength: this.state.part.sizeLength,
        sizeWidth: this.state.part.sizeWidth,
        sizeHeight: this.state.part.sizeHeight,
        price: this.state.part.price,
        isComplete: this.state.part.isComplete,
        dateStart: this.state.part.dateStart,
        dateEnd: this.state.part.dateEnd
      });
    } else if (this.state.isChecked === false && this.state.part.dateStart === null && this.state.part.dateEnd === null) {
      this.setState({
        jobId: this.state.part.jobId,
        partName: this.state.part.partName,
        materialType: this.state.part.materialType,
        materialFinish: this.state.part.materialFinish,
        sizeLength: this.state.part.sizeLength,
        sizeWidth: this.state.part.sizeWidth,
        sizeHeight: this.state.part.sizeHeight,
        price: this.state.part.price,
        isComplete: this.state.part.isComplete,
        dateStart: this.state.part.dateStart,
        dateEnd: this.state.part.dateEnd
      });
    } else if (this.state.isChecked === false && this.state.dateEnd === null) {
      this.setState({
        jobId: this.state.part.jobId,
        partName: this.state.part.partName,
        materialType: this.state.part.materialType,
        materialFinish: this.state.part.materialFinish,
        sizeLength: this.state.part.sizeLength,
        sizeWidth: this.state.part.sizeWidth,
        sizeHeight: this.state.part.sizeHeight,
        price: this.state.part.price,
        isComplete: this.state.part.isComplete,
        dateStart: this.state.part.dateStart,
        dateEnd: this.state.part.dateEnd,
      });
    } else if (this.state.isChecked === true && this.state.dateEnd === null) {
      this.setState({
        jobId: this.state.part.jobId,
        partName: this.state.part.partName,
        materialType: this.state.part.materialType,
        materialFinish: this.state.part.materialFinish,
        sizeLength: this.state.part.sizeLength,
        sizeWidth: this.state.part.sizeWidth,
        sizeHeight: this.state.part.sizeHeight,
        price: this.state.part.price,
        isComplete: this.state.part.isComplete,
        dateStart: this.state.part.dateStart,
        dateEnd: this.state.part.dateEnd,
        changeDateStart: new Date(this.state.part.dateStart),
      });
    } else if (this.state.isChecked === false) {
      this.setState({
        jobId: this.state.part.jobId,
        partName: this.state.part.partName,
        materialType: this.state.part.materialType,
        materialFinish: this.state.part.materialFinish,
        sizeLength: this.state.part.sizeLength,
        sizeWidth: this.state.part.sizeWidth,
        sizeHeight: this.state.part.sizeHeight,
        price: this.state.part.price,
        isComplete: this.state.part.isComplete,
        dateStart: this.state.part.dateStart,
        dateEnd: this.state.part.dateEnd,
      });
    } else {
      this.setState({
        jobId: this.state.part.jobId,
        partName: this.state.part.partName,
        materialType: this.state.part.materialType,
        materialFinish: this.state.part.materialFinish,
        sizeLength: this.state.part.sizeLength,
        sizeWidth: this.state.part.sizeWidth,
        sizeHeight: this.state.part.sizeHeight,
        price: this.state.part.price,
        isComplete: this.state.part.isComplete,
        dateStart: this.state.part.dateStart,
        dateEnd: this.state.part.dateEnd,
        changeDateStart: new Date(this.state.part.dateStart),
        changeDateEnd: new Date(this.state.part.dateEnd),
      });
    }
  }

  dateChangeOne(date) {
    this.setState({
      changeDateStart: date,
    });
  }

  dateChangeTwo(date) {
    this.setState({
      changeDateEnd: date,
    });
  }

  // On changing the information in the form if it is text change the text if it isn't make sure it gets turned into an int
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.type !== 'text' ? parseInt(e.target.value, 10) : e.target.value,
    });
  };

  // on submitting the form change the dates to the correct format for SQL
  onFormSubmit(e) {
    e.preventDefault();
    if (this.state.isChecked) {
      this.setState(
        {
          dateStart: this.state.changeDateStart
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '),
          dateEnd: this.state.changeDateEnd
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '),
        },
        this.submitUpdatedPart
      );
    } else {
      this.submitUpdatedPart();
    }
  }

  // This checks if the checkbox is checked for changing dates, if it isn't set it is considered false and the dates are set to null
  checkChange = () => {
    const { isChecked } = this.state;
    if (isChecked === false) {
      this.setState({
        isChecked: true
      }, this.fillInJobInfo);
    } else if (isChecked === true) {
      this.setState({
        isChecked: false,
        dateStart: null,
        dateEnd: null,
      }, this.fillInJobInfo);
    }
  }

  checkChangeComplete = () => {
    const { isComplete } = this.state;

    if (isComplete === false) {
      this.setState({
        isComplete: true
      });
    } else if (isComplete === true) {
      this.setState({
        isComplete: false,
      });
    }
  }

  // Creates a new object to pass to the post api call
  submitUpdatedPart = () => {
    // make API call
    const {
      jobId,
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
    if (this.state.userId > 0) {
      const updatePartInfoWithUserId = {
        id: this.state.id,
        jobId,
        partName,
        materialType,
        materialFinish,
        sizeLength,
        sizeWidth,
        sizeHeight,
        price,
        userId: this.state.userId,
        isComplete,
        dateStart,
        dateEnd
      };
      partData.updatePart(updatePartInfoWithUserId).then(() => {
        this.changeRoute();
      });
    } else {
      const updatePartInfoWithoutUserId = {
        id: this.state.id,
        jobId,
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
      };
      partData.updatePartWUser(updatePartInfoWithoutUserId).then(() => {
        this.changeRoute();
      });
    }
  };

  // Changes which page you go to after submitting
  changeRoute = () => {
    const { history } = this.props;
    history.push(`/single_job/${this.state.part.jobId}`);
  };

  // Changes the page you go to if you hit cancel
  handleCancel = () => {
    this.changeRoute();
  };

  render() {
    return (
      <>
      <h1>Update Part</h1>
      <Form>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Part Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type='text'
              name='partName'
              value={this.state.partName}
              onChange={this.handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Material Type:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type='text'
              name='materialType'
              value={this.state.materialType}
              onChange={this.handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Material Finish:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type='text'
              name='materialFinish'
              value={this.state.materialFinish}
              onChange={this.handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Length in Inches:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type='number'
              name='sizeLength'
              value={this.state.sizeLength}
              onChange={this.handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Width in Inches:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type='number'
              name='sizeWidth'
              value={this.state.sizeWidth}
              onChange={this.handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Height in Inches:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type='number'
              name='sizeHeight'
              value={this.state.sizeHeight}
              onChange={this.handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Price:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type='number'
              name='price'
              value={this.state.price}
              onChange={this.handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
        <Col sm={{ span: 10, offset: 2 }}>
          <Form.Check type="checkbox" label="The part is Complete" checked={this.state.isComplete === true} onChange={this.checkChangeComplete}/>
          </Col>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
        <Col sm={{ span: 10, offset: 2 }}>
          <Form.Check type="checkbox" label="Do you want to change the dates?" checked={this.state.isChecked === true} onChange={this.checkChange}/>
          </Col>
        </Form.Group>
        { this.state.isChecked
          ? <><Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Date Start:
          </Form.Label>
          <Col sm={10}>
            <DatePicker
              selected={this.state.changeDateStart}
              onChange={this.dateChangeOne}
              name='dateRec'
              dateFormat='MM/dd/yyyy'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Date End:
          </Form.Label>
          <Col sm={10}>
            <DatePicker
              selected={this.state.changeDateEnd}
              onChange={this.dateChangeTwo}
              name='dateDue'
              dateFormat='MM/dd/yyyy'
            />
          </Col>
        </Form.Group> </> : <p></p> }
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

export default UpdatePartForm;
