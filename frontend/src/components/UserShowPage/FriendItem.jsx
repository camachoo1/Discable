import { deleteFriend, updateFriend } from '../../store/friend';
import ChatIcon from '@mui/icons-material/ChatBubble';
import logo from '../../assets/discord-logo.png';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

const FriendItem = ({ friendsTab, friendObj, friends }) => {
  const friend = friendObj.friendId;
  const navigate = useNavigate();
  const friendReceiver = !!friendObj.friend.user2Id;
  // console.log(friendObj);
  const users = useSelector((state) => state.users);

  const handleAccept = (e) => {
    e.preventDefault();
    const friendship = friends.find(
      (friend) => friend.id === friendObj.friendId
    );

    const friendInfo = { ...friendship, status: 'friends' };
    updateFriend(friendInfo);
  };

  const handleIgnore = (e) => {
    e.preventDefault();
    deleteFriend(friendObj.friendId);
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
    <>
      <div className='divide-line' id='user-show-divider'></div>
      <li className='friend-show-li'>
        <div className='item-left'>
          {/* {console.log(users)} */}
          <div
            className='user-circle'
            id={generateColor(friendObj.friend)}
          >
            <img src={logo} alt='logo' className='user-logo' />
          </div>

          <div className='user-details-li'>
            <p className='user-name'>
              {/* {console.log(friendObj.friend)}
              {console.log(users[friendObj.friend])} */}
              {users[friendObj.friend].username}{' '}
              <span className='hidden-tag'>
                #{users[friendObj.friend].tag}
              </span>
            </p>

            {friendsTab === 'pending' ? (
              <>
                {friendReceiver ? (
                  <p className='user-status'>
                    Incoming Friend Request
                  </p>
                ) : (
                  <p className='user-status'>
                    Outgoing Friend Request
                  </p>
                )}
              </>
            ) : (
              <p className='user-status'>
                {users[friendObj.friend].status.toUpperCase()}
              </p>
            )}
          </div>
        </div>

        <div className='item-right'>
          {friendsTab === 'pending' ? (
            <>
              <div
                className='user-circle item-option'
                onClick={handleAccept}
              >
                <CheckIcon sx={{ fontSize: '18px' }} />
              </div>

              <div
                className='user-circle item-option'
                onClick={handleIgnore}
              >
                <CloseIcon sx={{ fontSize: '18px' }} />
              </div>
            </>
          ) : (
            <>
              {friendsTab !== 'blocked' && (
                <div
                  className='user-circle item-option'
                  onClick={() =>
                    navigate(`/@me/channels/${friendObj.dmChannelId}`)
                  }
                >
                  <ChatIcon
                    sx={{ fontSize: '18px', color: '#dcddde' }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </li>
    </>
  );
};

export default FriendItem;
