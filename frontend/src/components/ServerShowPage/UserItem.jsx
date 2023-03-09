import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/discord-logo.png';
import { useNavigate, useParams } from 'react-router-dom';

const UserItem = ({ user, friendships }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();
  const friend = friendships.filter(
    (usr) => usr.status !== 'pending' && usr.status !== 'blocked'
  );
  // .find((usr) => usr.userId === user.id);
  // console.log(
  //   friendships.find((friend) => friend.userId === user.id)
  //     .dmChannelId
  // );

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

  if (!sessionUser) return null;

  return (
    <>
      <li
        key={user.id}
        onClick={() => {
          if (!serverId && user.id !== sessionUser.id)
            navigate(
              `/@me/channels/${
                friendships.find(
                  (friend) => friend.userId === user.id
                ).dmChannelId
              }`
            );
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
        </div>
      </li>
    </>
  );
};

export default UserItem;
