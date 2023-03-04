import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchServers } from '../../store/server';
import UsersPanel from '../ServerShowPage/UsersPanel';
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
        <div className='friend-panel-container'>
          <div className='text-channels'>
            <p>DIRECT MESSAGES</p>
          </div>
          <UsersPanel />
        </div>
      </div>
    </>
  );
};

export default UserShowPage;
