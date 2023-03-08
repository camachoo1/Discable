import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchChannel } from '../../store/channel';
import {
  createMessage,
  fetchMessages,
  clearMessages,
  addMessage,
  removeMessage,
} from '../../store/message';
import logo from '../../assets/discord-logo.png';
import TagIcon from '@mui/icons-material/Tag';
import EditIcon from '@mui/icons-material/Edit';
import './ChannelShowPage.css';
// import CreateChannelModal from './CreateChannelModal';
import MessageItem from '../MessageItem/MessageItem';
import consumer from '../../consumer';

const useScroll = (toggle) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [toggle]);
  return ref;
};

const ChannelShowPage = ({ showEdit, setShowEdit }) => {
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const channel = useSelector((state) => state.channels[channelId]);
  const messages = useSelector((state) =>
    Object.values(state.messages)
  );
  const sessionUser = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.servers[serverId]);
  // const users = useSelector((state) => state.users);
  const ref = useScroll(messages);
  const dmUser = channel?.dmUser;
  // const [showEdit, setShowEdit] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEdit(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const messageInfo = {
      author_id: sessionUser.id,
      channel_id: channel.id,
      body,
    };
    createMessage(messageInfo);
    setBody('');
  };

  const colors = [
    'red',
    'fuchsia',
    'yellow',
    'green',
    'blurple',
    'black',
    'gray',
  ];
  const generateColor = (id) => colors[id % 7];

  useEffect(() => {
    dispatch(clearMessages());
    dispatch(fetchMessages(serverId, channelId));
    dispatch(fetchChannel(channelId));

    const subscription = consumer.subscriptions.create(
      { channel: 'ChannelsChannel', id: channelId },
      {
        received: (messageObj) => {
          switch (messageObj.type) {
            case 'RECEIVE_MESSAGE':
              dispatch(addMessage(messageObj));
              break;
            case 'UPDATE_MESSAGE':
              dispatch(addMessage(messageObj));
              break;
            case 'DESTROY_MESSAGE':
              dispatch(removeMessage(messageObj.id));
              break;
            default:
              break;
          }
        },
      }
    );

    return () => subscription?.unsubscribe();
  }, [dispatch, channelId, serverId]);

  return (
    <div className={serverId ? undefined : 'dms-wrapper'}>
      {channel && (
        <div className='channel-wrapper' ref={ref}>
          <div className='channel-show'>
            {serverId ? (
              <>
                <div className='channel-icon'>
                  <TagIcon
                    sx={{
                      transform: 'skew(-10deg)',
                      fontSize: '54px',
                    }}
                  />
                </div>

                <h1>Welcome to #{channel.channelName}!</h1>
                <p>
                  This is the start of the #{channel.channelName}{' '}
                  channel!
                </p>

                <div
                  className='edit-channel'
                  onClick={() => setShowEdit(true)}
                >
                  <EditIcon sx={{ mr: '5px', fontSize: '16px' }} />
                  Edit Channel
                </div>
              </>
            ) : (
              <>
                {/* {console.log(channel?.dmUser)} */}
                <div
                  className='large-channel-icon'
                  id={generateColor(dmUser.id)}
                >
                  <img src={logo} alt='logo' className='user-logo' />
                </div>

                <h1>{dmUser.username}</h1>
                <p className='dm-first-message'>
                  This is the beginning of your direct message history
                  with <strong>@{dmUser.username}</strong>
                </p>
              </>
            )}
          </div>

          <div className='messages-container'>
            {console.log(messages)}
            {messages?.map((message, idx) => (
              <MessageItem
                key={idx}
                server={server}
                message={message}
              />
            ))}
          </div>

          <form className='messages' onSubmit={handleSubmit}>
            <input
              type='text'
              name='message-content'
              id='message'
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={
                serverId
                  ? `Message #${channel.channelName}`
                  : `Message @${dmUser.username}`
              }
              autoComplete='off'
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default ChannelShowPage;
