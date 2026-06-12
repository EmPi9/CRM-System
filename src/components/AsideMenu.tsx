import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { isRole } from '../helper/isRole'

type MenuItem = Required<MenuProps>['items'][number];

const AsideMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const isAdmin = isRole('ADMIN');
    const isModerator = isRole('MODERATOR');
    

    const items: MenuItem[] = [
      {
        key: 'group',
        label: 'Меню',
        type: 'group',
        children: [
          { key: '/', label: 'Список задач', onClick: () => navigate('/') },
          { key: '/profile', label: 'Профиль', onClick: () => navigate('/profile') },
          isModerator || isAdmin ? { key: '/users', label: 'Пользователи', onClick: () => navigate('/users') } : null,
        ],
      },
    ];

    const selectedKey = location.pathname;


    return (
      <Menu
        className='menu'
        selectedKeys={[selectedKey]}
        mode="inline"
        items={items}
      />
    );
};

export default AsideMenu;

