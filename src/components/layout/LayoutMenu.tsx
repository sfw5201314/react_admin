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
  let [routerTbas, setRouterTbas] = useState([
    {
      label: routes[2].children?.[0].name,
      children: '',
      key: routes[2].children?.[0].path,
      closeIcon: false
    }
  ] as any);

  useEffect(() => {
    console.log('初始化了');
    if (
      JSON.parse(sessionStorage.getItem('tabsList') as any) &&
      JSON.parse(sessionStorage.getItem('tabsList') as any).length > 1
    ) {
      setRouterTbas(JSON.parse(sessionStorage.getItem('tabsList') as any));
    } else {
      sessionStorage.setItem('tabsList', JSON.stringify(routerTbas));
    }
  }, []);

  useEffect(() => {
    setRouterTbas(JSON.parse(sessionStorage.getItem('tabsList') as any));
    JSON.parse(sessionStorage.getItem('tabsList') as any).forEach((item: any) => {
      if (item.key === location.pathname) {
        setOpenKeys([item.openKeys?.[0]]);
      }
    });
  }, [location]);

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

  //初始路由

  //点击菜单
  const menuClick = (e: { domEvent: any; key: string; keyPath: Array<string> }) => {
    let routerList = JSON.parse(sessionStorage.getItem('tabsList') as any);
    const routerTbasObj = {
      label: e.domEvent.target.innerText,
      children: '',
      key: e.key,
      openKeys: openKeys
    };
    navigate(e.key, {
      state: {
        name: 'lisi',
        age: 18
      }
    });
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

    if (
      sessionStorage.getItem('tabsList') &&
      JSON.parse(sessionStorage.getItem('tabsList') as any)?.some((item: any) => {
        return item.key === e.key;
      })
    )
      return;
    routerList.push(routerTbasObj);
    sessionStorage.setItem('tabsList', JSON.stringify(routerList));
    setRouterTbas(routerList);
  };

  return (
    <>
      <Menu
        theme="dark"
        //默认选中的菜单项 key 数组
        // defaultSelectedKeys={[location.pathname]}
        // 当前选中的菜单项 key 数组
        selectedKeys={[location.pathname]}
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
