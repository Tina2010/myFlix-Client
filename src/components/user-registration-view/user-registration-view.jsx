import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './user-registration-view.scss';

export function RegiView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username + "successfully registered!");
    /* Send a request to the server for authentication */
    /* then call props */
    props.onRegister(username);
  };

  return (
    <div>
      <h4 className="regi-info">Please fill out the entire form for a registration on this website.</h4>
      <Form className="col-sm-5 col-md-5 mx-auto">
          <Form.Group controlId="formUsername">
          <Form.Label className="mt-3">Username:</Form.Label>
          <Form.Control className="mb-3" type="text" onChange={e => setUsername(e.target.value)} />
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
          Submit
        </Button>
      </Form>
    </div>
  );
}


RegiView.prototype = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired
    }).isRequired,
    onRegister: PropTypes.func.isRequired
  };