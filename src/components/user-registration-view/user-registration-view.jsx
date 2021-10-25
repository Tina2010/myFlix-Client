import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
      <span className="info">Please fill out the entire form for a registration on this website.</span>
      <form className="registration">
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Birthday:
          <input type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
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