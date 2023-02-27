import React, { useState, useEffect } from 'react';
import { fetchServer } from '../../store/server';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import './ServerShow.css';
import ServerHeader from './ServerHeader';

const ServerShowPage = () => {
  const [open, setOpen] = useState(false);
  const { serverId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);
  const server = useSelector((store) => store.servers[serverId]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };
  useEffect(() => {
    dispatch(fetchServer(serverId));
  }, [dispatch, serverId]);

  if (!sessionUser) return <Navigate to='/login' />;

  return (
    <>
      <div className='server-show' onClick={handleClick}>
        {server && (
          <div className='server-container'>
            <ServerHeader
              server={server}
              open={open}
              setOpen={setOpen}
              handleClick={handleClick}
            />
            <div className='panels-container'>
              <div className='panel'>
                <p># general</p>
                <p># coding</p>
                <p># testchannel</p>
              </div>

              <div className='channels-container'>
                <h4>Channels Component</h4>
              </div>

              <div className='users-panel'>
                <ul>
                  {Object.values(server.users).map((user) => (
                    <li key={user.id}>
                      <strong>{user.username}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ServerShowPage;
