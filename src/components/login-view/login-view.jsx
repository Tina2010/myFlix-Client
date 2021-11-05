import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://obscure-castle-33842.herokuapp.com/login/', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
      console.log(username + "successfully logged in!");
    })
    .catch(e => {
      console.log('No such user found.');
      alert('Username and or Password are wrong.\nPlease check both values.');
    })
  };

  return (
    <div className="login-view mt-5">
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
        <p className="mt-5">
          New here? Feel free to &nbsp;
          <Link to="/register" className="btn btn-warning">register</Link>
          &nbsp; today!
        </p>
      </Stack>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (username, password) => dispatch(handleSubmit(username, password))
});

export default connect(null, mapDispatchToProps)(LoginView);