import React, { useState, useEffect } from 'react';
import { fetchServer } from '../../store/server';
import {
  addChannel,
  clearChannels,
  fetchChannels,
  removeChannel,
} from '../../store/channel';
import { useSelector, useDispatch } from 'react-redux';
import {
  Navigate,
  NavLink,
  useParams,
  useNavigate,
} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import TagIcon from '@mui/icons-material/Tag';
import './ServerShow.css';
import ServerHeader from './ServerHeader';
import UsersPanel from './UsersPanel';
import ChannelShowPage from '../ChannelShowPage/ChannelShowPage';
import CreateChannelModal from '../ChannelShowPage/CreateChannelModal';
import consumer from '../../consumer';

const ServerShowPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.servers[serverId]);
  const channels = useSelector((state) =>
    Object.values(state.channels)
  );
  const users = useSelector((state) => state.users);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };

  useEffect(() => {
    dispatch(clearChannels());
    dispatch(fetchServer(serverId));
    dispatch(fetchChannels(serverId));

    const subscription = consumer.subscriptions.create(
      { channel: 'ServersChannel', id: serverId },
      {
        received: (channelObj) => {
          switch (channelObj.type) {
            case 'RECEIVE_CHANNEL':
              dispatch(addChannel(channelObj));
              break;
            case 'UPDATE_CHANNEL':
              dispatch(addChannel(channelObj));
              break;
            case 'DESTROY_CHANNEL':
              dispatch(removeChannel(channelObj.id));
              if (+channelId === channelObj.id)
                navigate(
                  `/servers/${serverId}/channels/${server.defaultChannel}`
                );
              break;
            default:
              break;
          }
        },
      }
    );

    return () => subscription?.unsubscribe();
  }, [dispatch, serverId, channelId]);

  if (!sessionUser) return <Navigate to='/login' />;
  if (!channelId)
    return (
      <Navigate
        to={`/servers/${server.id}/channels/${server.defaultChannel}`}
      />
    );

  return users ? (
    <>
      <div>
        {showCreateForm || showEdit ? (
          <div
            className={
              showCreateForm || showEdit ? 'modal-show' : 'modal-hide'
            }
          >
            <CreateChannelModal
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              setShowCreateForm={setShowCreateForm}
              showCreateForm={showCreateForm}
            />
          </div>
        ) : null}
      </div>
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
              <div className='server-panel'>
                <div className='text-channels'>
                  <p>TEXT CHANNELS</p>
                  {server.ownerId === sessionUser.id && (
                    <AddIcon
                      fontSize='small'
                      sx={{ cursor: 'pointer' }}
                      onClick={() => setShowCreateForm(true)}
                    />
                  )}
                </div>
                <ul className='channels-list'>
                  {channels?.map((channel) => (
                    <li key={channel.id}>
                      <NavLink
                        to={`/servers/${server.id}/channels/${channel.id}`}
                        className='channel-item'
                      >
                        <TagIcon
                          sx={{
                            mr: '5px',
                            transform: 'skew(-10deg)',
                          }}
                        />
                        <p className='channel-item-text'>
                          {channel.channelName}
                        </p>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='channels-container'>
                <ChannelShowPage
                  showEdit={showEdit}
                  setShowEdit={setShowEdit}
                />
              </div>

              <div className='users-panel'>
                <UsersPanel />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  ) : null;
};

export default ServerShowPage;
