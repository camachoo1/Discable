import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { fetchServers } from '../../store/server';
import { logout } from '../../store/session';
import './UserShowPage.css';

const UserShowPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);
  const servers = useSelector((store) => store.servers);

  useEffect(() => {
    if (sessionUser) dispatch(fetchServers());
  }, [dispatch, sessionUser]);

  if (!sessionUser) return <Navigate to='/login' />;

  return (
    <>
      {/* {!sessionUser && <Navigate to='/login' />} */}
      {sessionUser && (
        <div className='user-show'>
          <h2>Welcome {sessionUser.username}!</h2>
          <button onClick={() => dispatch(logout())}>Logout</button>

          <h1>Servers</h1>
          <ul className='servers-list'>
            {Object.values(servers)?.map((server) => (
              <li key={server.id}>
                <Link to={`/servers/${server.id}`}>
                  {server.serverName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default UserShowPage;
