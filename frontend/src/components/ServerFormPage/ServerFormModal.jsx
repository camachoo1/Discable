import { useState, useEffect } from 'react';
import { createServer, updateServer } from '../../store/server';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ServerFormModal = ({
  sessionUser,
  setShowForm,
  isUpdate,
  setIsUpdate,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverName, setServerName] = useState('');
  const [errors, setErrors] = useState([]);
  // const { serverId } = useParams();
  const location = useLocation();
  const serverId = location.pathname[9];
  const server = useSelector((state) => state.servers[serverId]);

  useEffect(() => {
    if (isUpdate) setServerName(server.serverName);
  }, [serverId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (isUpdate) {
      return dispatch(updateServer({ ...server, serverName }))
        .then(() => {
          navigate(
            `/servers/${serverId}/channels/${server.defaultChannel.id}`
          );
          setShowForm(false);
          setIsUpdate(false);
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
      return dispatch(createServer({ serverName }))
        .then(async (server) => {
          navigate(
            `/servers/${server.id}/channels/${server.defaultChannel.id}`
          );
          setShowForm(false);
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

  const hideModal = (e) => {
    e.preventDefault();
    setShowForm(false);
    setIsUpdate(false);
  };

  const openModal = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='modal' onClick={hideModal}>
      <div className='server-form' onClick={openModal}>
        <form onSubmit={handleSubmit}>
          <div className='server-form-header'>
            <h2>{isUpdate ? 'Edit' : 'Customize'} your server</h2>
            <center>
              <p>
                Give your server a personality with a name. You can
                always change it later.
              </p>
            </center>
          </div>

          <div className='form-user-inputs'>
            <label htmlFor='name' className='server-name-label'>
              SERVER NAME{' '}
              <span>{errors.length ? ` - ${errors[0]}` : ''}</span>
            </label>
            <input
              type='text'
              name='name'
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              autoComplete='false'
            />

            {!isUpdate && (
              <p style={{ fontSize: '12px', marginTop: 0 }}>
                By creating a server, you agree to Discable's{' '}
                <a
                  href='https://discord.com/guidelines'
                  target='_blank'
                  rel='noreferrer'
                  style={{ color: '#0068e0' }}
                >
                  <strong>Community Guidelines</strong>
                </a>
              </p>
            )}
          </div>

          <div className='form-footer'>
            <button type='button' id='back' onClick={hideModal}>
              Back
            </button>
            <button type='submit'>
              {isUpdate ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServerFormModal;
