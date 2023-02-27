import React from 'react';
import './ServerShow.css';

const ServerHeader = ({ server }) => {
  return (
    <div className='server-header'>
      <h4>{server.serverName}</h4>
      <div className='remainder-of-page'></div>
    </div>
  );
};

export default ServerHeader;
