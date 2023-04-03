import './UsersPanel.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserItem from './UserItem';

const UsersPanel = ({ users }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const friendships = useSelector((state) =>
    Object.values(state.friends)
  );
  const { serverId } = useParams();
  const friends = friendships.filter(
    (friend) =>
      friend.status !== 'blocked' && friend.status !== 'pending'
  );

  return (
    <>
      <ul className='users-panel-ul'>
        {serverId && (
          <div className='text-channels'>
            <p>ONLINE</p>
          </div>
        )}

        {!users
          ? Object.values(friends).map((user, idx) => {
              if (user.id !== sessionUser.id)
                return (
                  <UserItem
                    user={user}
                    key={idx}
                    friendships={friendships}
                  />
                );
            })
          : Object.values(users).map((user, idx) => {
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
