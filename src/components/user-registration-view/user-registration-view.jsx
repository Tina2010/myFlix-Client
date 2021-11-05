import React, { useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'react-router-dom/Link';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import './user-registration-view.scss';

export function RegiView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://obscure-castle-33842.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user');
      alert('Something went wrong. Please check your data and try again.');
    });
  };

  return (
    <div className="mt-5">
      <Stack>
      <h4 className="regi-info">Please fill out the entire form for a registration on this website.</h4>
        <Col className="mx-auto" xs={8} sm={4} lg={3} xl={2}>
          <Form>
              <Form.Group controlId="formUsername">
              <Form.Label className="mt-3">Username:</Form.Label>
              <Form.Control className="mb-3" type="text" minLength='1' onChange={e => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label className="mt-3">Email:</Form.Label>
              <Form.Control className="mb-3" type="email" onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label className="mt-3">Birthday:</Form.Label>
              <Form.Control className="mb-3" type="date" onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control className="mb-3" type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="outline-light" type="submit" onClick={handleSubmit}>
              Register
            </Button>
        </Form>    
      </Col>   
        <p className="mt-5 mx-auto">
          You already have an account? Feel free to &nbsp;
          <Link to="/" className="btn btn-warning">login</Link>
          &nbsp; here!
        </p>
    </Stack>  
    </div>
  );
}


RegiView.prototype = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired
    }).isRequired
  };