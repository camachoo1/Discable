import logo from '../../assets/discord-logo.png';
import './UsersPanel.css';
import { useSelector } from 'react-redux';

const UsersPanel = () => {
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

  return (
    <>
      <ul className='users-panel-ul'>
        {users.map((user) => (
          <li key={user.id}>
            <div className='user-item'>
              <div className='user-item-left'>
                <div
                  className='user-bubble'
                  id={generateColor(user.id)}
                >
                  <img src={logo} alt='logo' className='user-logo' />
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
