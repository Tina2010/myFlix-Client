import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username + "successfully logged in!");
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <div className="login-view">
      <Stack gap={2} className="col-sm-5 col-md-5 mx-auto">
        <h2 style={{ 'textAlign': "center"}}>Login</h2>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label className="mt-3">Username:</Form.Label>
            <Form.Control className="mb-3" type="text" onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control className="mb-3" type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="outline-light" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Stack>
    </div>
  );
}

LoginView.prototype = {
    login: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired
    }).isRequired,
    onLoggedIn: PropTypes.func.isRequired
  };