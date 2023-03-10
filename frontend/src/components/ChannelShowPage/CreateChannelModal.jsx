import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createChannel,
  deleteChannel,
  updateChannel,
} from '../../store/channel';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateChannelModal.css';
import Tag from '@mui/icons-material/Tag';

const CreateChannelModal = ({
  showEdit,
  setShowEdit,
  setShowCreateForm,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState('');
  const [errors, setErrors] = useState([]);
  const { serverId, channelId } = useParams();
  const server = useSelector((state) => state.servers[serverId]);
  const channel = useSelector((state) => state.channels[channelId]);

  const hideModal = (e) => {
    e.preventDefault();
    setShowCreateForm(false);
    setShowEdit(false);
  };

  const openModal = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (showEdit) {
      const channelInfo = {
        id: channel.id,
        channel_name: channelName,
        server_id: serverId,
      };

      updateChannel(channelInfo);
      setShowEdit(false);
      setShowCreateForm(false);
      setChannelName('');
    } else {
      const channelInfo = {
        channel_name: channelName,
        server_id: serverId,
      };
      createChannel(channelInfo).then((res) => {
        setShowCreateForm(false);
        setChannelName('');
        navigate(`/servers/${serverId}/channels/${res.id}`);
      });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteChannel(channelId));
    navigate(
      `/servers/${serverId}/channels/${server.defaultChannel}`
    );
  };

  return (
    <div className='modal' onClick={hideModal}>
      <div className='channel-form' onClick={openModal}>
        <form onSubmit={handleSubmit}>
          <div className='channel-form-header'>
            <h2>
              {showEdit
                ? `Edit #${channel?.channelName}`
                : 'Create Channel'}
            </h2>
          </div>

          <div className='form-user-inputs'>
            <label htmlFor='name' className='channel-name-label'>
              CHANNEL NAME{' '}
              <span>{errors.length ? ` - ${errors[0]}` : ''}</span>
            </label>
            <div className='input-container'>
              <Tag
                sx={{
                  color: '#2e3338',
                  position: 'absolute',
                  boxSizing: 'border-box',
                  transform: 'skew(-10deg)',
                  ml: '5px',
                  fontSize: '30px',
                  mb: '14px',
                  fontFamily: 'gg-sans-bold',
                  fontWeight: 'bold',
                }}
              />
              <input
                type='text'
                name='name'
                id='channel__name'
                value={channelName}
                placeholder='channel-name'
                autoComplete='off'
                onChange={(e) => setChannelName(e.target.value)}
              />
            </div>
          </div>

          <div className='form-footer'>
            {showEdit ? (
              <>
                {channel?.channelName === 'general' ? (
                  <button
                    type='button'
                    onClick={() => setShowEdit(false)}
                    id='back'
                  >
                    Back
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={handleDelete}
                    style={{ width: '125px' }}
                    className='delete-button'
                  >
                    Delete Channel
                  </button>
                )}
              </>
            ) : (
              <button type='button' onClick={hideModal} id='back'>
                Back
              </button>
            )}
            <button
              type='submit'
              onClick={handleSubmit}
              style={{ width: '125px' }}
            >
              {showEdit ? 'Update' : 'Create'} Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelModal;
