import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to='/@me' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.signUpUser({ email, username, password })
    ).catch(async (res) => {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if the server is down
      }
      debugger;
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  };

  return (
    <div className='page-container'>
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='reg-form'>
          <center>
            <h1 className='reg-header'>Create an account</h1>
          </center>

          <label htmlFor='email' className='form-text'>
            EMAIL{' '}
            <span>{errors.length ? `- ${errors[0]}` : '*'}</span>
          </label>
          <input
            type='email'
            name='email'
            className='form-text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor='username' className='form-text'>
            USERNAME{' '}
            <span>{errors.length ? `- ${errors[0]}` : '*'}</span>
          </label>
          <input
            type='text'
            name='username'
            className='form-text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor='password' className='form-text'>
            PASSWORD
            <span>{errors.length ? `- ${errors[0]}` : '*'}</span>
          </label>
          <input
            type='password'
            name='password'
            className='form-text'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type='submit'>Continue</button>

          <Link to='/login' className='reg-link form-text'>
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignupFormPage;
