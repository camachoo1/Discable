import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import HeadsetIcon from '@mui/icons-material/Headset';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation } from 'react-router-dom';
import { logout } from '../../store/session';
import logo from '../../assets/discord-logo.png';

const BottomPanel = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [micToggle, setMicToggle] = useState(true);
  const [deafenToggle, setDeafenToggle] = useState(true);

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

  if (!sessionUser || location.pathname === '/') {
    return null;
  } else {
    return (
      <>
        <div className='bottom-panel'>
          <div className='user-button'>
            <div
              className='user-circle'
              id={generateColor(sessionUser.id)}
            >
              <img src={logo} alt='logo' className='user-logo' />
            </div>

            <div className='user-details'>
              <h4 className='username'>{sessionUser.username}</h4>
              <p className='usertag'>#{sessionUser.tag}</p>
            </div>
          </div>

          <div className='user-settings'>
            {micToggle ? (
              <MicIcon
                fontSize='small'
                className='icons'
                onClick={() => setMicToggle(false)}
              />
            ) : (
              <MicOffIcon
                fontSize='small'
                className='icons'
                sx={{ transform: 'scaleX(-1)', color: 'red' }}
                onClick={() => setMicToggle(true)}
              />
            )}

            {deafenToggle ? (
              <HeadsetIcon
                fontSize='small'
                className='icons'
                onClick={() => {
                  setDeafenToggle((prev) => !prev);
                  setMicToggle(false);
                }}
              />
            ) : (
              <HeadsetOffIcon
                fontSize='small'
                className='icons'
                sx={{ transform: 'scaleX(-1)', color: 'red' }}
                onClick={() => {
                  setDeafenToggle((lastState) => !lastState);
                  setMicToggle(true);
                }}
              />
            )}

            <SettingsIcon
              fontSize='small'
              className='icons'
              onClick={() => dispatch(logout())}
            />
          </div>
        </div>
      </>
    );
  }
};

export default BottomPanel;
