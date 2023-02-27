import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import './LoginForm.css';
import { login } from '../../store/session';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to='/@me' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(login({ credential, password })).catch(
      async (res) => {
        let data;

        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }

        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };

  return (
    <div className='page-container'>
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='login-form'>
          <div className='top-container'>
            <center>
              <h1 className='top-header'>Welcome back!</h1>
            </center>
            <center>
              <p className='top-header form-text'>
                We're so excited to see you again!
              </p>
            </center>
          </div>

          <label htmlFor='credential' className='form-text'>
            USERNAME OR EMAIL{' '}
            <span>{errors.length ? ` - ${errors[0]}` : '*'}</span>
          </label>
          <input
            type='text'
            name='credentials'
            className='form-text'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            autoFocus
            autoComplete='off'
          />

          <label htmlFor='password' className='form-text'>
            PASSWORD{' '}
            <span>{errors.length ? `- ${errors[0]}` : '*'}</span>
          </label>
          <input
            type='password'
            name='password'
            className='form-text'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='off'
          />

          <button type='submit'>Log In</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                login({ credential: 'Demo', password: 'password' })
              );
            }}
          >
            Login as Demo User
          </button>
          <p className='registration-link-p-tag form-text'>
            Need an account?{' '}
            <Link
              to='/register'
              className='registration-link form-text'
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginFormPage;
