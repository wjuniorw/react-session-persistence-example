import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hello from './Hello';
import './style.css';

import { Creators as userActions } from './store/ducks/user';
import { Creators as sessionActions } from './store/ducks/session';

const Actions = { ...userActions, ...sessionActions };

function Main({ userLogin, logout }) {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const { name } = useSelector(state => state.user);

  console.log('user prop...', user);
  useEffect(() => {
    dispatch(Actions.loadUser());
  }, []);

  return (
    <div>
      {<Hello name={name} />}
      <p>Login and refresh page to see magic happen :)</p>
      <input
        type="text"
        style={{ height: '30px' }}
        value={userName}
        placeholder="Type user name"
        onChange={({ target }) => setUserName(target.value)}
      />
      <input
        type="button"
        style={{ height: '30px' }}
        value="login"
        onClick={() => dispatch(Actions.userLogin())}
      />
      <input
        type="button"
        style={{ height: '30px' }}
        value="logout"
        onClick={() => dispatch(Actions.logout())}
      />
    </div>
  );
}

export default Main;
