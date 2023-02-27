import './ErrorPage.css';

import React from 'react';

const ErrorPage = () => {
  return (
    <>
      <div className='error-page'>
        <div className='error-container'>
          <h1>WRONG TURN?</h1>
          <p>
            You look lost, stranger. You know what helps when you’re
            lost? A piping hot bowl of noodles. Take a seat, we’re
            frantically at work here cooking up something good. Oh,
            you need something to read? These might help you:
          </p>

          <ul className='error-links'>
            <li>
              <a
                href='https://github.com/camachoo1/Disclone'
                target='_blank'
                rel='noreferrer'
              >
                GitHub
              </a>
            </li>

            <li>
              <a
                href='https://linkedin.com/in/omar-camacho-aa01b3133'
                target='_blank'
                rel='noreferrer'
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
