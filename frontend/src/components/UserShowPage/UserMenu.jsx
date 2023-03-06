import React from 'react';

const UserMenu = ({ user }) => {
  return (
    <div className='menu-wrapper'>
      <ul className='menu'>
        <li className='menu-item'>
          <button>Remove Friend</button>
        </li>

        <li className='menu-item'>
          <button>Block</button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
