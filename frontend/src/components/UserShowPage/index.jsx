import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchServers } from '../../store/server';
import './UserShowPage.css';

const UserShowPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  // const servers = useSelector((state) => state.servers);

  useEffect(() => {
    if (sessionUser) dispatch(fetchServers());
  }, [dispatch, sessionUser]);

  if (!sessionUser) return <Navigate to='/login' />;

  return (
    <>
      <div className='user-show'>
        {sessionUser ? (
          <h1>{sessionUser.username}</h1>
        ) : (
          <Navigate to='/login' />
        )}
      </div>
    </>
  );
};

export default UserShowPage;
