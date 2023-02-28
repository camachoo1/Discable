import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServers } from '../../store/server';
import logo from '../../assets/discord-logo.png';
import './ServerNavBar.css';
import ServerFormModal from '../ServerFormPage/ServerFormModal';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import ExploreIcon from '@mui/icons-material/Explore';

const ServerNavBar = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);
  const servers = useSelector((store) => store.servers);

  useEffect(() => {
    if (sessionUser) dispatch(fetchServers());
  }, [dispatch, sessionUser]);

  if (location.pathname === '/') return null;

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
                    <p>
                      <img
                        src={logo}
                        alt='logo'
                        className='logo-icon'
                      />
                    </p>
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
                    className='circle server-circle'
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
                  <p className='redirect-icons'>+</p>
                  <div className='user-action'>
                    <h4 className='user-text'>Add Server</h4>
                  </div>
                </li>
                {/* </NavLink> */}

                <li
                  className='circle circle-button'
                  onClick={() => navigate('/')}
                >
                  <p className='redirect-icons'>
                    <ExploreIcon />
                  </p>
                  <div className='user-action'>
                    <h4 className='user-text'>Homepage</h4>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default ServerNavBar;
