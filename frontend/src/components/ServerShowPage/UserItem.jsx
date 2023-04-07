import { useState } from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/discord-logo.png';
import {
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import YesIcon from '@mui/icons-material/Check';
import NoIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import BlockIcon from '@mui/icons-material/Block';
import {
  createFriend,
  updateFriend,
  deleteFriend,
} from '../../store/friend';

const UserItem = ({ user, friendships, friendIdx, blockedIdx }) => {
  const { id: sessionUserId } = useSelector(
    (state) => state.session.user
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [option, setOption] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [hover, setHover] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { serverId } = useParams();

  const handleApprove = (e) => {
    e.stopPropagation();
    if (option === 'remove' || option === 'unblock') {
      const friendId = friendships.find(
        (usr) => usr.friendship.id === user.id
      ).id;
      deleteFriend(friendId);
      setConfirm(false);
    } else {
      if (friendIdx.includes(user.id)) {
        const friend = friendships.find(
          (usr) => usr.friendship.id === user.id
        );
        const friendInfo = { ...friend, status: 'blocked' };
        updateFriend(friendInfo);
        setConfirm(false);
      } else {
        const friendInfo = {
          user1_id: sessionUserId,
          user2_id: user.id,
          status: 'blocked',
        };
        createFriend(friendInfo);
        setConfirm(false);
      }
    }
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    const friendInfo = {
      user1_id: sessionUserId,
      user2_id: user.id,
    };
    createFriend(friendInfo);
    setIsAdded(true);
  };

  const isBlocked = () => {
    if (blockedIdx.includes(user.id)) return true;
    else return false;
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

  if (!sessionUserId) return null;

  return (
    <>
      <li
        key={user.id}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          if (!serverId && user.id !== sessionUserId) {
            const foundFriendship = friendships.find(
              (friend) => friend.friendship.id === user.id
            );
            if (foundFriendship) {
              navigate(
                `/@me/channels/${foundFriendship.dmChannelId}`
              );
            }
          }
        }}
      >
        <div className='user-panel-item-wrapper'>
          <div className='user-item-left'>
            <div className='user-circle'>
              <img
                src={logo}
                alt='logo'
                className='user-logo'
                id={generateColor(user.id)}
              />
            </div>
            <p className='user-name'>{user.username}</p>
          </div>
          {user.id !== sessionUserId && hover && (
            <div className='user-panel-item-right'>
              {confirm ? (
                <>
                  <YesIcon
                    sx={{ fontSize: '18px' }}
                    onClick={handleApprove}
                  />
                  <NoIcon
                    sx={{ fontSize: '18px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirm(false);
                    }}
                  />
                </>
              ) : (
                <>
                  {location.pathname === '/@me' ||
                  friendIdx.includes(user.id) ? (
                    <PersonRemoveAlt1Icon
                      fontSize='small'
                      sx={{ mt: '1px', ml: '4px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOption('remove');
                        setConfirm(true);
                      }}
                    />
                  ) : (
                    <>
                      {!isAdded && (
                        <PersonAddAlt1Icon
                          fontSize='small'
                          sx={{ ml: '2px', mt: '1px' }}
                          onClick={handleAdd}
                        />
                      )}
                    </>
                  )}{' '}
                  {isBlocked() ? (
                    <CheckCircleOutlineIcon
                      fontSize='small'
                      sx={{ ml: '2px', mt: '2px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOption('unblock');
                        setConfirm(true);
                      }}
                    />
                  ) : (
                    <BlockIcon
                      sx={{ fontSize: '16px', mt: '2px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOption('block');
                        setConfirm(true);
                      }}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </li>
    </>
  );
};

export default UserItem;
