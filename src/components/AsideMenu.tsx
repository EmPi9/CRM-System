import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectIsAdmin, selectIsModerator } from '../store/authSelectors';
import { useSelector } from "react-redux"

type MenuItem = Required<MenuProps>['items'][number];

const AsideMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const isModerator = useSelector(selectIsModerator);
    const isAdmin = useSelector(selectIsAdmin);

    const items: MenuItem[] = [
      {
        key: 'group',
        label: 'Меню',
        type: 'group',
        children: [
          { key: '/', label: 'Список задач', onClick: () => navigate('/') },
          { key: '/profile', label: 'Профиль', onClick: () => navigate('/profile') },
          isModerator || isAdmin ? { key: '/users', label: 'Пользователь', onClick: () => navigate('/users') } : null,
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

