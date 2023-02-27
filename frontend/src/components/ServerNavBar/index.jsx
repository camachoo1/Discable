import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import { fetchServers } from '../../store/server';
import './ServerNavBar.css';
import ServerFormModal from '../ServerFormPage/ServerFormModal';
import { NavLink } from 'react-router-dom';

const ServerNavBar = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);
  const servers = useSelector((store) => store.servers);

  useEffect(() => {
    if (sessionUser) dispatch(fetchServers());
  }, [dispatch, sessionUser]);

  return (
    <>
      {sessionUser && (
        <>
          <div>
            {showForm ? (
              <div className={showForm ? 'modal-show' : 'modal-hide'}>
                <ServerFormModal
                  sessionUser={sessionUser}
                  setShowForm={setShowForm}
                  showForm={showForm}
                />
              </div>
            ) : null}
          </div>
          <div className='navbar'>
            <nav>
              <ul className='circles'>
                <NavLink to='/@me'>
                  <li className='circle server-circle'>
                    <p>X</p>
                    <div className='user-action'>
                      <h4 className='user-text'>Home</h4>
                    </div>
                  </li>
                </NavLink>

                <li className='divider'></li>

                {Object.values(servers)?.map((server) => (
                  <NavLink
                    to={`/servers/${server.id}`}
                    key={server.id}
                  >
                    <li className='circle server-circle'>
                      <p>{server.serverName[0]}</p>
                      <div className='user-action'>
                        <h4 className='user-text'>
                          {server.serverName}
                        </h4>
                      </div>
                    </li>
                  </NavLink>
                ))}

                {/* <NavLink to='/servers/new'> */}
                <li
                  className='circle circle-button'
                  onClick={() => setShowForm(true)}
                >
                  <p>+</p>
                  <div className='user-action'>
                    <h4 className='user-text'>Add Server</h4>
                  </div>
                </li>
                {/* </NavLink> */}

                <li
                  className='circle circle-button'
                  onClick={() => dispatch(logout())}
                >
                  <p>-</p>
                  <div className='user-action'>
                    <h4 className='user-text'>Logout</h4>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </>

        // <div className='users-info'>
        //   <div className='servers-list'>
        //     <div>
        //       <span onClick={() => navigate('/@me')}>
        //         <NavLink to={'@me'} className='circles'>
        //           X
        //         </NavLink>
        //       </span>
        //     </div>

        //     <div className='servers-split'></div>

        //     {Object.values(servers)?.map((server) => (
        //       <div key={server.id}>
        //         <span
        //           onClick={() => navigate(`/servers/${server.id}`)}
        //         >
        //           <NavLink
        //             to={`/servers/${server.id}`}
        //             className='circles'
        //           >
        //             {server.serverName[0]}
        //           </NavLink>
        //         </span>
        //       </div>
        //     ))}

        //     <div>
        //       <span
        //         onClick={(e) => {
        //           e.stopPropagation();
        //           navigate('/servers/new');
        //         }}
        //         className='circles'
        //       >
        //         +
        //       </span>
        //     </div>

        //     <div>
        //       <span
        //         onClick={(e) => {
        //           e.stopPropagation();
        //           dispatch(logout());
        //         }}
        //         className='circles'
        //       >
        //         -
        //       </span>
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default ServerNavBar;
