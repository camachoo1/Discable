import { useState } from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/discord-logo.png';
import { deleteMessage, updateMessage } from '../../store/message';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './MessageItem.css';

const MessageItem = ({ server, message }) => {
  const [msgContent, setMsgContent] = useState(message?.body);
  const [msgEdit, setMsgEdit] = useState(false);
  const [msgAction, setMsgAction] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);
  const shown = { opacity: 1 };
  const hidden = { opacity: 0 };

  const handleEditMessage = (e) => {
    e.preventDefault();
    const messageInfo = { ...message, body: msgContent };
    setMsgEdit(false);
    updateMessage(messageInfo);
  };

  const handleDeleteMessage = (e) => {
    e.preventDefault();
    deleteMessage(message.id);
  };

  const handleCloseEdit = (e) => {
    if (e.keyCode === 27) {
      setMsgEdit(false);
      setMsgContent(message.body);
    }
  };
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
  // debugger;
  return users ? (
    <div
      className='message-item'
      id={msgEdit ? 'message-edit-active' : undefined}
      onMouseEnter={() => setMsgAction(true)}
      onMouseLeave={() => setMsgAction(false)}
    >
      <div
        className='message-user-icon'
        id={generateColor(message.authorId)}
      >
        <img src={logo} alt='logo' className='message-user-logo' />
      </div>

      <div className='message-body'>
        <div className='message-username'>
          <h4>
            {console.log(users[message.authorId])}
            {console.log('users', users)}
            {console.log('message', message)}
            {users[message.authorId].username}
            <span id='time'>{formatTime(message.createdAt)}</span>
          </h4>
          {(message.authorId === sessionUser.id ||
            server?.ownerId === sessionUser.id) && (
            <div
              className='message-actions'
              style={msgAction ? shown : hidden}
            >
              {message.authorId === sessionUser.id && (
                <div
                  className='edit-action'
                  onClick={() => setMsgEdit(true)}
                >
                  <EditIcon fontSize='small' sx={{ m: '0 2px' }} />
                </div>
              )}

              <div
                className='delete-action'
                onClick={handleDeleteMessage}
              >
                <DeleteIcon fontSize='small' sx={{ m: '0 2px' }} />
              </div>
            </div>
          )}
        </div>
        <div className='message-text'>
          <p>{message.body}</p>
        </div>

        {msgEdit ? (
          <form
            className='edit-message-form'
            onSubmit={handleEditMessage}
          >
            <input
              type='text'
              name='content'
              id='message'
              autoComplete='off'
              autoFocus
              value={msgContent}
              onChange={(e) => setMsgContent(e.target.value)}
              onKeyDown={handleCloseEdit}
            />
            <p className='msg-edit-info'>
              escape to{' '}
              <span
                onClick={() => {
                  setMsgEdit(false);
                  setMsgContent(message.body);
                }}
              >
                cancel
              </span>{' '}
              &bull; enter to{' '}
              <span onClick={handleEditMessage}>save</span>
            </p>
          </form>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default MessageItem;
