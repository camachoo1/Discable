import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { leaveServer } from '../../store/server';
import { useNavigate, useParams } from 'react-router-dom';
import KeyBoardDownArrowIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LeaveIcon from '@mui/icons-material/ArrowCircleLeft';
import CloseIcon from '@mui/icons-material/Close';
import './ServerShow.css';
import DeleteConfirmation from '../DeleteConfirmation';
import TagIcon from '@mui/icons-material/Tag';

const ServerHeader = ({
  server,
  open,
  setOpen,
  handleClick,
  isUpdate,
  setIsUpdate,
}) => {
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);
  const { channelId } = useParams();
  const channel = useSelector((state) => state.channels[channelId]);
  // const server = useSelector((state) => state.servers[serverId]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const keepOpen = (e) => {
    e.stopPropagation();
  };
  const handleOtherClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((lastState) => !lastState);
  };

  const leaveAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      leaveServer(
        server.id,
        server.users[sessionUser.id].subscriptionId
      )
    );
    setOpen(false);
    navigate('/@me');
  };

  return (
    <>
      {showDeleteForm ? (
        <div
          className={
            showDeleteForm
              ? 'delete-modal modal-show'
              : 'delete-modal modal-hide'
          }
        >
          <DeleteConfirmation setShowDeleteForm={setShowDeleteForm} />
        </div>
      ) : null}
      <div className='server-header' onClick={handleClick}>
        <div className='server-header-left'>
          <h4 className='shorten'>{server.serverName}</h4>

          <div onClick={handleOtherClick}>
            {open ? (
              <CloseIcon className='svg' fontSize='small' />
            ) : (
              <KeyBoardDownArrowIcon
                className='svg'
                fontSize='small'
              />
            )}
          </div>

          {open ? (
            <div className='settings-menu'>
              <ul className='settings' onClick={keepOpen}>
                {server.ownerId === sessionUser.id ? (
                  <>
                    <li className='settings-item'>
                      <button
                        onClick={() => {
                          setIsUpdate(true);
                          setOpen(false);
                        }}
                      >
                        Edit Server
                        <EditIcon
                          fontSize='small'
                          sx={{ mt: 0, pr: 0 }}
                        />
                      </button>
                    </li>

                    <div className='divide-line'></div>

                    <li
                      className='settings-item'
                      style={{ color: 'red' }}
                    >
                      <button
                        className='delete-button'
                        onClick={() => setShowDeleteForm(true)}
                      >
                        Delete Server
                        <DeleteIcon
                          fontSize='small'
                          sx={{ mt: 0, pr: 0 }}
                        />
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className='settings-item'
                      style={{ color: 'red' }}
                    >
                      <button
                        className='delete-button'
                        onClick={leaveAction}
                      >
                        Leave Server
                        <LeaveIcon
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
        <div className='remainder-of-page'>
          <div className='channel-name'>
            {channel && (
              <>
                <TagIcon
                  sx={{
                    mr: '5px',
                    mb: '100px',
                    transform: 'skew(-20deg)',
                    opcaity: '0.5',
                  }}
                />
                <h4>{channel.channelName}</h4>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServerHeader;
