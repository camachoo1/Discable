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

  const onlineFriends = friends.filter(
    (user) =>
      user.friend.status === 'online' &&
      user.status !== 'pending' &&
      user.status !== 'blocked'
  );

  const allFriends = friends.filter(
    (user) => user.status !== 'pending' && user.status !== 'blocked'
  );

  const pendingFriends = friends.filter(
    (user) => user.status === 'pending' && user.status !== 'blocked'
  );

  const blockedFriends = friends.filter(
    (user) => user.status === 'blocked'
  );

  if (!sessionUserId) navigate('/login');
  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: 'FriendsChannel', id: sessionUserId },
      {
        received: (friendObj) => {
          switch (friendObj.type) {
            case 'RECEIVE_MESSAGE':
              dispatch(addFriend(friendObj));
              break;
            case 'UPDATE_MESSAGE':
              dispatch(addFriend(friendObj));
              break;
            case 'DESTROY_MESSAGE':
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
      <div className='friends-show'>
        <div className='user-text-channels'>
          <p>ONLINE &#8212; {onlineFriends.langth}</p>
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
        <div className='divider'></div>
      </div>
    );
  } else if (friendsTab === 'all') {
    return (
      <div className='friends-show'>
        <div className='user-text-channels'>
          <p>ALL FRIENDS &#8212; {allFriends.langth}</p>
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
        <div className='divider'></div>
      </div>
    );
  } else if (friendsTab === 'pending') {
    return (
      <div className='friends-show'>
        <div className='user-text-channels'>
          <p>PENDING &#8212; {pendingFriends.langth}</p>
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
        <div className='divider'></div>
      </div>
    );
  } else {
    return (
      <div className='friends-show'>
        <div className='user-text-channels'>
          <p>BLOCKED &#8212; {blockedFriends.langth}</p>
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
        <div className='divider'></div>
      </div>
    );
  }
};

export default FriendShowPage;
