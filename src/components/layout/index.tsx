import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, theme, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

import { Outlet } from 'react-router-dom';

import LayoutMenu from './LayoutMenu';

import Tabs from '../tab/Tab';

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左边侧边栏你 */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical"></div>
        <LayoutMenu />
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
        {/* <Breadcrumb style={{ margin: '10px 16px' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb> */}
        {/* 右边区域主内容 */}
        <Content style={{ margin: '16px 16px', background: colorBgContainer, overflow: 'initial' }}>
          {/* 窗口内容部分，子组件 */}
          <Tabs />
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
