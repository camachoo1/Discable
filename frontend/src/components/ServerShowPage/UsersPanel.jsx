import logo from '../../assets/discord-logo.png';
import './UsersPanel.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchFriends } from '../../store/friend';
import UserItem from './UserItem';

const UsersPanel = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const friendships = useSelector((state) =>
    Object.values(state.friends)
  );
  const { serverId } = useParams();
  const server = useSelector((state) => state.servers[serverId]);
  const friends = friendships.filter(
    (friend) =>
      friend.status !== 'blocked' && friend.status !== 'pending'
  );
  const ids = friendships.map((friend) => friend.id);
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
  const users = useSelector((state) => Object.values(state.users));

  // useEffect(() => {
  //   if (sessionUser) dispatch(fetchFriends());
  // }, [dispatch]);

  return (
    <>
      <ul className='users-panel-ul'>
        {serverId && (
          <div className='text-channels'>
            <p>ONLINE</p>
          </div>
        )}

        {!server
          ? Object.values(friends).map((user, idx) => (
              <UserItem
                user={user}
                key={idx}
                friendships={friendships}
                ids={ids}
              />
            ))
          : users.map((user) => (
              <li key={user.id}>
                <div className='user-item'>
                  <div className='user-item-left'>
                    <div
                      className='user-bubble'
                      id={generateColor(user.id)}
                    >
                      <img
                        src={logo}
                        alt='logo'
                        className='user-logo'
                      />
                    </div>
                    <p className='users-name'>{user.username}</p>
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </>
  );
};

export default UsersPanel;
