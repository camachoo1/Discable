// import { useState } from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/discord-logo.png';
import './MessageItem.css';

const MessageItem = ({ message }) => {
  // const [msgContent, setMsgContent] = useState('');
  // const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);

  const formatTime = (time) => {
    let dateObj = new Date(time);
    let date = dateObj.getDate();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let ampm = 'AM';

    if (date < 10) date = '0' + date;
    if (month < 10) month = '0' + month;
    if (minutes < 10) minutes = '0' + minutes;
    if (hours >= 12) {
      hours %= 12;
      ampm = 'PM';
    }

    return `${month}/${date}/${year} ${hours}:${minutes} ${ampm}`;
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
  return (
    <div className='message-item'>
      <div
        className='message-user-icon'
        id={generateColor(message.authorId)}
      >
        <img src={logo} alt='logo' className='message-user-logo' />
      </div>

      <div className='message-body'>
        <div className='message-username'>
          <h4>
            {users[message.authorId].username}
            <span id='time'>{formatTime(message.createdAt)}</span>
          </h4>
        </div>
        <div className='message-text'>
          <p>{message.body}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
