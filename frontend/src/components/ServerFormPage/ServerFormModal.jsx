import { useState, useEffect } from 'react';
import { createServer } from '../../store/server';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ServerFormModal = ({ sessionUser, setShowForm, showForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const sessionUser = useSelector((store) => store.session.user);
  const [serverName, setServerName] = useState(
    `${sessionUser.username}'s Server`
  );
  const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   if (showForm === true) {
  //     setShowForm(true);
  //   } else {
  //     setShowForm(false);
  //   }
  //   return () => {
  //     setShowForm(false);
  //   };
  // }, [showForm]);
  // if (sessionUser) return <Navigate to='/@me' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(createServer({ serverName }))
      .then(navigate('/@me'))
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
  };

  const hideModal = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  const openModal = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='modal' onClick={hideModal}>
      {console.log('rendering')}
      <div className='server-form' onClick={openModal}>
        <form onSubmit={handleSubmit}>
          <div className='server-form-header'>
            <h2>Customize your server</h2>
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
            />

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
          </div>

          <div className='form-footer'>
            <button
              id='bottom-button'
              // onClick={() => setShowModal(false)}
            >
              Back
            </button>
            <button>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServerFormModal;
