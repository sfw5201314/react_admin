import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];
import routes from '../../router/router';
import { useNavigate, useLocation } from 'react-router-dom';

const LayoutMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //点击二级菜单把当前的key存到sessionStorage，刷新页面时，把sessionStorage的key给到openKeys作为初始值
  //这个key给到openKeys作为初始值，就可以展开二级菜单

  const fristOpenKey: string = sessionStorage.getItem('openKey')
    ? JSON.parse(sessionStorage.getItem('openKey')!)[0]
    : '';

  const [openKeys, setOpenKeys] = useState([fristOpenKey]);
  console.log('location', location);

  //动态添加路由
  const items: MenuItem[] = routes[2].children?.map((item) => {
    return {
      key: item.path,
      label: item.name,
      icon: item.icon,
      children:
        item.children &&
        item.children.map((child) => {
          return {
            key: child.path,
            label: child.name,
            icon: child.icon
          };
        })
    };
  }) as any;

  //展开收缩二级菜单，只展开一个
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys[keys.length - 1] ? [keys[keys.length - 1]] : []);
  };
  //点击菜单
  const menuClick = (e: { key: string; keyPath: Array<string> }) => {
    console.log(e);
    navigate(e.key, {
      state: {
        name: 'lisi',
        age: 18
      }
    });
    sessionStorage.setItem('routerPath', e.key);
    //点击收缩二级菜单
    if (e.keyPath.length <= 1) {
      //清除当前的key
      setOpenKeys([]);
      //清除缓存
      sessionStorage.removeItem('openKey');
    } else {
      //点击展开二级菜单 保存当前的key
      setOpenKeys([e.keyPath[1]]);
      sessionStorage.setItem('openKey', JSON.stringify(openKeys));
    }
  };

  return (
    <>
      <Menu
        theme="dark"
        //当前选中的菜单项 key 数组
        defaultSelectedKeys={[location.pathname]}
        //当前菜单项展开的数组
        openKeys={openKeys}
        //展开或收起菜单时触发
        onOpenChange={onOpenChange}
        mode="inline"
        items={items}
        onClick={menuClick}
      />
    </>
  );
};

export default LayoutMenu;
