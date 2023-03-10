import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import AlternateIcon from '@mui/icons-material/AlternateEmail';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import UsersPanel from '../ServerShowPage/UsersPanel';
import ChannelShowPage from '../ChannelShowPage/ChannelShowPage';
import FriendShowPage from './FriendShowPage';
import './UserShowPage.css';
import { fetchFriends } from '../../store/friend';

const UserShowPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const { channelId } = useParams();
  const channel = useSelector((state) => state.channels[channelId]);
  const friendships = useSelector((state) =>
    Object.values(state.friends)
  );
  const friends = friendships.map((friend) => ({
    friend: friend.userId,
    status: friend.status,
    friendId: friend.id,
    dmChannelId: friend.dmChannelId,
  }));
  const [friendsTab, setFriendsTab] = useState('online');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  if (!sessionUser) return <Navigate to='/login' />;

  return friendships.length ? (
    <>
      <div className='server-header user-show-header'>
        <div className='server-header-left user-show-left'>
          <GroupsIcon sx={{ opacity: '0.5' }} />
          <h4>Friends</h4>
        </div>

        <div className='remainder-of-page'>
          <div className='channel-name width'>
            {channelId ? (
              <>
                <AlternateIcon sx={{ mr: '5px', opacity: '0.5' }} />
                <h4>{channel?.dmUser.username}</h4>
              </>
            ) : (
              <>
                <PeopleAltIcon sx={{ mr: '10px', opacity: '0.5' }} />
                <h4>Friends</h4>
                <div className='vertical-line'>&nbsp;</div>
                <ul className='friend-options'>
                  <li>
                    <button
                      className='options-button'
                      id={
                        friendsTab === 'online'
                          ? 'options-active'
                          : undefined
                      }
                      onClick={() => setFriendsTab('online')}
                    >
                      Online
                    </button>
                  </li>

                  <li>
                    <button
                      className='options-button'
                      id={
                        friendsTab === 'all'
                          ? 'options-active'
                          : undefined
                      }
                      onClick={() => setFriendsTab('all')}
                    >
                      All
                    </button>
                  </li>

                  <li>
                    <button
                      className='options-button'
                      id={
                        friendsTab === 'pending'
                          ? 'options-active'
                          : undefined
                      }
                      onClick={() => setFriendsTab('pending')}
                    >
                      Pending
                    </button>
                  </li>

                  <li>
                    <button
                      className='options-button'
                      id={
                        friendsTab === 'blocked'
                          ? 'options-active'
                          : undefined
                      }
                      onClick={() => setFriendsTab('blocked')}
                    >
                      Blocked
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <div className='user-show'>
        <div className='friends-panel-container'>
          <div className='text-channels'>
            <p>DIRECT MESSAGES</p>
          </div>
          <UsersPanel />
        </div>

        <div className='friends-info'>
          {channelId ? (
            <ChannelShowPage />
          ) : (
            <FriendShowPage
              friendsTab={friendsTab}
              sessionUser={sessionUser}
              friends={friends}
              friendships={friendships}
            />
          )}
        </div>
      </div>
    </>
  ) : null;
};

export default UserShowPage;
