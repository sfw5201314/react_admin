import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

import { useNavigate, Outlet } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('首页', '/admin/home', <PieChartOutlined />),
  getItem('活动管理', '2', <DesktopOutlined />),
  getItem('商品管理', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5')]),
  getItem('用户管理', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('个人资料', '9', <FileOutlined />)
];
// const router = useRoutes(routes);

// console.log('router', router);

// const items: MenuItem[] = routes[2].children.map((item) => {
//   return {
//     key: item.path,
//     label: item.name,
//     icon: item.icon
//     // children: [
//     //   item.children.map((item2:any) => {
//     //     return {
//     //       key: item2.path,
//     //       label: item2.name,
//     //       icon: item.icon
//     //     };
//     //   }) || ''
//     // ]
//   };
// });

// console.log(items);

const View: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const menuClick = (e: { key: string }) => {
    console.log(e);
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左边侧边栏你 */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical"></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={menuClick} />
      </Sider>
      {/* 右边内容区域 */}
      <Layout>
        {/* 右边区域头部 */}
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
        </Header>
        <Breadcrumb style={{ margin: '10px 16px' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        {/* 右边区域主内容 */}
        <Content style={{ margin: '0 16px', background: colorBgContainer, overflow: 'initial' }}>
          {/* 窗口内容部分，子组件 */}
          <Outlet />
        </Content>
        {/* 右边区域底部 */}
        <Footer style={{ textAlign: 'center', padding: '0', lineHeight: '25px' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default View;
