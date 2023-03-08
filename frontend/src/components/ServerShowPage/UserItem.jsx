import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/discord-logo.png';
import { useNavigate, useParams } from 'react-router-dom';

const UserItem = ({ user, ids, friendships }) => {
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
            <div
              className='user-circle'
              // id={generateColor(user.id)}
            >
              <img src={logo} alt='logo' className='user-logo' />
            </div>
            {/* {console.log(user.id)} */}
            <p className='user-name'>{user.username}</p>
          </div>
        </div>
      </li>
    </>
  );
};

export default UserItem;
