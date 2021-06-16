import React from 'react';
import {
  Form,
  Col,
  Row,
  Button
} from 'react-bootstrap';
import partData from '../helpers/data/partData';

/* eslint-disable react/prop-types */

// pass user as parameter when user auth is setup
class CreatePartForm extends React.Component {
  state = {
    jobId: -1,
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
  };

  componentDidMount = () => {
    this.setState({
      jobId: parseInt(this.props.match.params.id, 10),
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.type !== 'text' ? parseInt(e.target.value, 10) : e.target.value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    partData.addPart(this.state).then(() => {
      this.changeRoute();
    });
  }

  handleCancel = () => {
    this.changeRoute();
  };

  changeRoute = () => {
    const { history } = this.props;
    history.push(`/single_job/${this.state.jobId}`);
  };

  render() {
    return (
      <>
      <h1>Add Part</h1>
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
              name='MaterialFinish'
              value={this.state.MaterialFinish}
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

export default CreatePartForm;
