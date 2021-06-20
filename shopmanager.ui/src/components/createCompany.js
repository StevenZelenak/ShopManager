import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import companyData from '../helpers/data/companyData';

class CreateCompany extends React.Component {
  state = {
    companyName: '',
  };

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  // On submit call an add company api
  handleSubmit = (e) => {
    e.preventDefault();
    companyData.addCompany(this.state).then(() => {
      this.changeRoute();
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  changeRoute = () => {
    const { history } = this.props;
    console.warn('history', history);
    history.push('/register_user');
  }

  render() {
    return (
      <>
      <h1>Create Company</h1>
        <div className='col-lg-6 offset-lg-3'>
          <Form className=''>
            <Form.Group>
              <Form.Label>Company name: </Form.Label>
              <Form.Control
                type='text'
                name='companyName'
                value={this.state.companyName}
                onChange={this.handleChange}
                placeholder='Enter company'
              />
            </Form.Group>
            <Button variant='primary' type='' onClick={this.handleSubmit}>
              Continue
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

export default CreateCompany;
