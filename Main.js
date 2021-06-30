import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hello from './Hello';
import './style.css';

import { Creators as userActions } from './store/ducks/user';
import { Creators as sessionActions } from './store/ducks/session';

const Actions = { ...userActions, ...sessionActions };

function Main({ loadUser, userLogin, logout }) {
  const dispatch = useDispatch();

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
        type="button"
        style={{ height: '30px' }}
        value="login"
        onClick={() => userLogin()}
      />
      <input
        type="button"
        style={{ height: '30px' }}
        value="logout"
        onClick={() => logout()}
      />
    </div>
  );
}

export default connect(
  state => ({
    user: state.user,
    session: state.session
  }),
  Actions
)(Main);
