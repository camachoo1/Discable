import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchChannel } from '../../store/channel';
import { createMessage, fetchMessages } from '../../store/message';
import TagIcon from '@mui/icons-material/Tag';
import EditIcon from '@mui/icons-material/Edit';
import './ChannelShowPage.css';
// import CreateChannelModal from './CreateChannelModal';
import MessageItem from '../MessageItem/MessageItem';

const ChannelShowPage = () => {
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const channel = useSelector((state) => state.channels[channelId]);
  const messages = useSelector((state) =>
    Object.values(state.messages)
  );
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchChannel(channelId));
    dispatch(fetchMessages(serverId, channelId));
  }, [dispatch, channelId, serverId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const messageInfo = {
      author_id: sessionUser.id,
      channel_id: channel.id,
      body,
    };
    dispatch(createMessage(messageInfo));
    setBody('');
  };

  return (
    <>
      {channel && (
        <>
          <div className='channel-show'>
            <div className='channel-icon'>
              <TagIcon
                sx={{ transform: 'skew(-20deg', fontSize: '54px' }}
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
              <MessageItem key={idx} message={message} />
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
        </>
      )}
    </>
  );
};

export default ChannelShowPage;
