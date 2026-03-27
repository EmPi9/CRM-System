import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router';

type MenuItem = Required<MenuProps>['items'][number];

const App: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); 

    const selectedKey = location.pathname === '/profile' ? '2' : '1';   

    const items: MenuItem[] = [
      {
        key: 'grp',
        label: 'Меню',
        type: 'group',
        children: [
          { key: '1', label: 'Список задач', onClick: () => navigate('/') },
          { key: '2', label: 'Профиль', onClick: () => navigate('/profile') },
        ],
      },
    ];


  return (
    <Menu
      style={{ width: 256, position: 'absolute'}}
      defaultSelectedKeys={['1']}
      selectedKeys={[selectedKey]}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default App;

