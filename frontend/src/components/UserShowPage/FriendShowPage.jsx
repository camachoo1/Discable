import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addFriend, removeFriend } from '../../store/friend';
import { useNavigate } from 'react-router-dom';
import consumer from '../../consumer';
import FriendItem from './FriendItem';

const FriendShowPage = ({
  sessionUser,
  friendsTab,
  friendships,
  friends,
}) => {
  const sessionUserId = sessionUser?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!sessionUserId) navigate('/login');

  const onlineFriends = friends.filter(
    (usr) =>
      usr.friend.status === 'online' &&
      usr.status !== 'blocked' &&
      usr.status !== 'pending'
  );

  const allFriends = friends.filter(
    (usr) => usr.status !== 'pending' && usr.status !== 'blocked'
  );

  const pendingFriends = friends.filter(
    (usr) => usr.status === 'pending' && usr.status !== 'blocked'
  );

  const blockedFriends = friends.filter(
    (usr) => usr.status === 'blocked'
  );

  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: 'FriendsChannel', id: sessionUserId },
      {
        received: (friendObj) => {
          switch (friendObj.type) {
            case 'RECEIVE_FRIEND':
              dispatch(addFriend(friendObj));
              break;
            case 'UPDATE_FRIEND':
              dispatch(addFriend(friendObj));
              break;
            case 'DESTROY_FRIEND':
              dispatch(removeFriend(friendObj.id));
              break;
            default:
              break;
          }
        },
      }
    );

    return () => subscription?.unsubscribe();
  }, [dispatch, sessionUserId]);

  if (friendsTab === 'online') {
    return (
      <div className='friends-show-main'>
        <div className='user-text-channels'>
          <p>ONLINE &#8212; {onlineFriends.length}</p>
        </div>

        <ul>
          {onlineFriends.map((friendObj, idx) => (
            <FriendItem
              friendsTab={friendsTab}
              friendObj={friendObj}
              key={idx}
              friendships={friendships}
            />
          ))}
        </ul>
        <div className='divide-line'></div>
      </div>
    );
  } else if (friendsTab === 'all') {
    return (
      <div className='friends-show-main'>
        <div className='user-text-channels'>
          <p>ALL FRIENDS &#8212; {allFriends.length}</p>
        </div>

        <ul>
          {allFriends.map((friendObj, idx) => (
            <FriendItem
              friendsTab={friendsTab}
              friendObj={friendObj}
              key={idx}
              friendships={friendships}
            />
          ))}
        </ul>
        <div className='divide-line'></div>
      </div>
    );
  } else if (friendsTab === 'pending') {
    return (
      <div className='friends-show-main'>
        <div className='user-text-channels'>
          <p>PENDING &#8212; {pendingFriends.length}</p>
        </div>

        <ul>
          {pendingFriends.map((friendObj, idx) => (
            <FriendItem
              friendsTab={friendsTab}
              friendObj={friendObj}
              key={idx}
              friendships={friendships}
            />
          ))}
        </ul>
        <div className='divide-line'></div>
      </div>
    );
  } else {
    return (
      <div className='friends-show-main'>
        <div className='user-text-channels'>
          <p>BLOCKED &#8212; {blockedFriends.length}</p>
        </div>

        <ul>
          {blockedFriends.map((friendObj, idx) => (
            <FriendItem
              friendsTab={friendsTab}
              friendObj={friendObj}
              key={idx}
              friendships={friendships}
            />
          ))}
        </ul>
        <div className='divide-line'></div>
      </div>
    );
  }
};

export default FriendShowPage;
