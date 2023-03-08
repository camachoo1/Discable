import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { leaveServer } from '../../store/server';
import { useNavigate, useParams } from 'react-router-dom';
import KeyBoardDownArrowIcon from '@mui/icons-material/KeyboardArrowDown';
import PeopleIcon from '@mui/icons-material/PeopleAlt';
import CreateIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LeaveIcon from '@mui/icons-material/ArrowCircleLeft';
import CloseIcon from '@mui/icons-material/Close';
import './ServerShow.css';
import DeleteConfirmation from '../DeleteConfirmation';
import TagIcon from '@mui/icons-material/Tag';
import { deleteChannel } from '../../store/channel';

const ServerHeader = ({ server, open, setOpen, handleClick }) => {
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);
  const subscriptions = useSelector((state) =>
    Object.values(state.serverSubscriptions)
  );
  const { channelId } = useParams();
  const channel = useSelector((state) => state.channels[channelId]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const keepOpen = (e) => {
    // e.preventDefault()
    e.stopPropagation();
  };
  const handleOtherClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((lastState) => !lastState);
  };

  const deleteAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteChannel(channelId));
    setOpen(false);
    navigate(
      `/servers/${server.id}/channels/${server.defaultChannel}`
    );
  };

  const leaveAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      leaveServer(
        server.id,
        subscriptions.find((sub) => sub.userId === sessionUser.id).id
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
              <ul className='settings' onClick={keepOpen}>
                <li className='settings-item'>
                  <button>
                    Server Info
                    <PeopleIcon
                      fontSize='small'
                      sx={{ mt: 0, pr: 0 }}
                    />
                  </button>
                </li>
                {server.ownerId === sessionUser.id ? (
                  <>
                    <div className='divide-line'></div>

                    <li
                      className='settings-item'
                      // onClick={() => setChannelEdit(true)}
                    >
                      <button>
                        Edit Channel
                        <CreateIcon
                          fontSize='small'
                          sx={{ mt: 0, pr: 0 }}
                        />
                      </button>
                    </li>

                    <div className='divide-line'></div>

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
                        Delete Channel
                        <DeleteIcon
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
                    <div className='divide-line'></div>

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
