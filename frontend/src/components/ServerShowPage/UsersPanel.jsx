import './UsersPanel.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserItem from './UserItem';

const UsersPanel = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const friendships = useSelector((state) =>
    Object.values(state.friends)
  );
  const { serverId } = useParams();
  const friends = friendships.filter(
    (friend) =>
      friend.status !== 'blocked' && friend.status !== 'pending'
  );

  const users = useSelector((state) => Object.values(state.users));

  return (
    <>
      <ul className='users-panel-ul'>
        {serverId && (
          <div className='text-channels'>
            <p>ONLINE</p>
          </div>
        )}

        {!users
          ? friends.map((user, idx) => {
              if (user.id !== sessionUser.id)
                return (
                  <UserItem
                    user={user}
                    key={idx}
                    friendships={friendships}
                  />
                );
            })
          : users.map((user, idx) => {
              if (user.id !== sessionUser.id)
                return (
                  <UserItem
                    user={user}
                    key={idx}
                    friendships={friendships}
                  />
                );
            })}
      </ul>
    </>
  );
};

export default UsersPanel;
