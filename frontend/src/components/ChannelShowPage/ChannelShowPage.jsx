import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchChannel } from '../../store/channel';
import TagIcon from '@mui/icons-material/Tag';
import EditIcon from '@mui/icons-material/Edit';
import './ChannelShowPage.css';
// import CreateChannelModal from './CreateChannelModal';

const ChannelShowPage = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const channel = useSelector((state) => state.channels[channelId]);

  useEffect(() => {
    dispatch(fetchChannel(channelId));
  }, [dispatch, channelId]);

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

          <form className='messages'>
            <input
              type='text'
              name='message-content'
              id='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
