import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router';

type MenuItem = Required<MenuProps>['items'][number];

const AsideMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); 

    const items: MenuItem[] = [
      {
        key: 'group',
        label: 'Меню',
        type: 'group',
        children: [
          { key: '/', label: 'Список задач', onClick: () => navigate('/') },
          { key: '/profile', label: 'Профиль', onClick: () => navigate('/profile') },
        ],
      },
    ];

    const selectedKey = location.pathname;


    return (
      <Menu
        style={{ width: 256, position: 'absolute'}}
        defaultSelectedKeys={['/']}
        selectedKeys={[selectedKey]}
        mode="inline"
        items={items}
      />
    );
};

export default AsideMenu;

