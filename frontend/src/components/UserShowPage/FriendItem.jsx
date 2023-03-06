import { deleteFriend, updateFriend } from '../../store/friend';
import logo from '../../assets/discord-logo.png';

const FriendItem = ({ friendsTab, friendObj, friends }) => {
  const friend = friendObj.friend;

  const handleAccept = (e) => {
    e.preventDefault();
    const friendship = friends.find(
      (user) => user.id === friendObj.friendId
    );

    const friendInfo = { ...friendship, status: 'friends' };
    updateFriend(friendInfo);
  };

  const handleIgnore = (e) => {
    e.preventDefault();
    deleteFriend(friendObj.friendId);
  };
  return (
    <>
      <li className='friend-show-li'>
        <div className='user-bubble'>
          <img src={logo} alt='logo' className='user-logo' />
        </div>

        <div className='user-details-li'>
          <p className='username'>
            {friend.username}{' '}
            <span className='hidden-tag'>#{friend.tag}</span>
          </p>
        </div>
      </li>
    </>
  );
};

export default FriendItem;
