import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createChannel, updateChannel } from '../../store/channel';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateChannelModal.css';

const CreateChannelModal = ({ sessionUser, setShowCreateForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState('');
  const [errors, setErrors] = useState([]);
  const { serverId } = useParams();
  const server = useSelector((state) => state.servers[serverId]);
  const hideModal = (e) => {
    e.preventDefault();
    setShowCreateForm(false);
  };

  const openModal = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (!true) {
      return dispatch(updateChannel({ ...server }))
        .then(() => {
          navigate(`/servers/${serverId}`);
          setShowCreateForm(false);
        })
        .catch(async (res) => {
          let data;

          try {
            data = await res.clone().json();
          } catch {
            data = await res.text();
          }

          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        });
    } else {
      // debugger;
      const channelInfo = {
        channel_name: channelName,
        server_id: serverId,
      };
      return dispatch(createChannel(channelInfo))
        .then((res) => {
          debugger;
          navigate(
            `/servers/${res.channel.serverId}/channels/${res.channel.id}`
          );
          setShowCreateForm(false);
          setChannelName('');
        })
        .catch(async (res) => {
          let data;

          try {
            data = await res.clone().json();
          } catch {
            data = await res.text();
          }

          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        });
    }
  };

  return (
    <div className='modal' onClick={hideModal}>
      <div className='channel-form' onClick={openModal}>
        <form onSubmit={handleSubmit}>
          <div className='channel-form-header'>
            <h2>Create Channel</h2>
          </div>

          <div className='form-user-inputs'>
            <label htmlFor='name' className='channel-name-label'>
              CHANNEL NAME{' '}
              <span>{errors.length ? ` - ${errors[0]}` : ''}</span>
            </label>
            <input
              type='text'
              name='name'
              value={channelName}
              autoComplete='off'
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>

          <div className='form-footer'>
            <button
              type='submit'
              onClick={handleSubmit}
              style={{ width: '125px' }}
            >
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelModal;
