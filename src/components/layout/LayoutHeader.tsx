import React, { useState } from 'react';
import { Breadcrumb, Layout, Button, theme } from 'antd';

const { Header } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
const {
  token: { colorBgContainer }
} = theme.useToken();
const LayoutHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
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
    </>
  );
};

export default LayoutHeader;
