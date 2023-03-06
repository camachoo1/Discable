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

const ChannelShowPage = () => {
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const channel = useSelector((state) => state.channels[channelId]);
  const messages = useSelector((state) =>
    Object.values(state.messages)
  );
  const sessionUser = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.servers[serverId]);
  const users = useSelector((state) => state.users);
  const ref = useScroll(messages);

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
    <>
      {channel && (
        <div className='channel-wrapper' ref={ref}>
          <div className='channel-show'>
            <div className='channel-icon'>
              <TagIcon
                sx={{ transform: 'skew(-10deg)', fontSize: '54px' }}
              />
            </div>

            <h1>Welcome to #{channel.channelName}!</h1>
            <p>
              This is the start of the #{channel.channelName} channel!
            </p>

            <div className='edit-channel'>
              <EditIcon sx={{ mr: '5px', fontSize: '16px' }} />
              Edit Channel
            </div>
          </div>

          <div className='messages-container'>
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
              placeholder={`Message #${channel.channelName}`}
              autoComplete='off'
            />
          </form>
        </div>
      )}
    </>
  );
};

export default ChannelShowPage;
