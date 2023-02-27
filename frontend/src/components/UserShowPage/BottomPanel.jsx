import { useState } from 'react';
import { useSelector } from 'react-redux';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import HeadsetIcon from '@mui/icons-material/Headset';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation } from 'react-router-dom';

const BottomPanel = () => {
  const sessionUser = useSelector((store) => store.session.user);
  const location = useLocation();
  const [micToggle, setMicToggle] = useState(true);
  const [deafenToggle, setDeafenToggle] = useState(true);

  if (!sessionUser || location.pathname === '/') {
    return null;
  } else {
    return (
      <>
        <div className='bottom-panel'>
          <div className='user-button'>
            <div className='user-circle'>{/* avatar */}</div>

            <div className='user-details'>
              <h4 className='username'>{sessionUser.username}</h4>
            </div>
          </div>

          <div className='settings'>
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
                sx={{ transform: 'scaleX(-1)' }}
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
                sx={{ transform: 'scaleX(-1)' }}
                onClick={() => {
                  setDeafenToggle((prev) => !prev);
                  setMicToggle(true);
                }}
              />
            )}

            <SettingsIcon fontSize='small' className='icons' />
          </div>
        </div>
      </>
    );
  }
};

export default BottomPanel;
