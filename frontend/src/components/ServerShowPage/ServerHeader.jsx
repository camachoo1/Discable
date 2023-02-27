import { useDispatch, useSelector } from 'react-redux';
import { deleteServer } from '../../store/server';
import { useNavigate } from 'react-router-dom';
import KeyBoardDownArrowIcon from '@mui/icons-material/KeyboardArrowDown';
import PeopleIcon from '@mui/icons-material/PeopleAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import './ServerShow.css';

const ServerHeader = ({ server, open, setOpen, handleClick }) => {
  const sessionUser = useSelector((store) => store.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOtherClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((last) => !last);
  };

  const deleteAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteServer(server.id));
    navigate('/@me');
  };

  return (
    <div className='server-header' onClick={handleClick}>
      <div className='server-header-left'>
        <h4>{server.serverName}</h4>

        <div onClick={handleOtherClick}>
          {open ? (
            <CloseIcon fontSize='small' />
          ) : (
            <KeyBoardDownArrowIcon fontSize='small' />
          )}
        </div>

        {open ? (
          <div className='settings-menu'>
            <ul className='settings'>
              <li className='settings-item'>
                <button>
                  Server Information
                  <PeopleIcon
                    fontSize='small'
                    sx={{ mt: 0, pr: 0 }}
                  />
                </button>
              </li>
              {server.ownerId === sessionUser.id && (
                <>
                  <li className='settings-item'>
                    <button>
                      Edit Server
                      <EditIcon
                        fontSize='small'
                        sx={{ mt: 0, pr: 0 }}
                      />
                    </button>
                  </li>

                  <div className='divide-line'></div>

                  <li className='settings-item'>
                    <button
                      className='delete-button'
                      onClick={deleteAction}
                    >
                      Delete Server
                      <DeleteIcon
                        fontSize='small'
                        sx={{ mt: 0, pr: 0 }}
                      />
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        ) : null}
      </div>
      <div className='remainder-of-page'></div>
    </div>
  );
};

export default ServerHeader;
