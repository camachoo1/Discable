import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { fetchServers } from '../../store/server';
import AlternateIcon from '@mui/icons-material/AlternateEmail';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import UsersPanel from '../ServerShowPage/UsersPanel';
import ChannelShowPage from '../ChannelShowPage/ChannelShowPage';
import FriendShowPage from './FriendShowPage';
import './UserShowPage.css';
import { fetchFriends } from '../../store/friend';
import { clearMessages } from '../../store/message';

const UserShowPage = () => {
  // const [load, setLoad] = useState(false);
  const [newMsg, setNewMsg] = useState([]);
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
  // const users = useSelector((state) => Object.keys(state.users));
  const messages = useSelector((state) =>
    Object.values(state.messages)
  );

  // useEffect(() => {
  //   setNewMsg(messages);
  // }, [messages]);

  // const checker = () => {
  //   let i = 0;
  //   let count = 0;
  //   let hash = {};
  //   const f = friendships.forEach(
  //     (frnd) => (hash[frnd.userId] = true)
  //   );
  //   const u = users.forEach((usr) => (hash[usr.id] = false));
  //   const hashArr = Object.values(hash);
  //   console.log(friendships, users);
  //   console.log(hashArr.length);
  //   while (i < hashArr.length - 1) {
  //     if (hashArr[i] === true) count++;
  //     i++;
  //   }
  //   // console.log(hashArr, users);
  //   if (count === hashArr.length && count === users.length)
  //     setLoad(true);
  // };
  useEffect(() => {
    // debugger;
    // dispatch(clearMessages());
    dispatch(fetchFriends());
  }, [dispatch]);

  // useEffect(() => {
  //   if (messages.length === 0) setLoad(true);
  // }, [messages]);

  // useEffect(() => {
  //   if (sessionUser) dispatch(fetchServers())
  // }, [dispatch, sessionUser])

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
