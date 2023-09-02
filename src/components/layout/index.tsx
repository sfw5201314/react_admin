import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Layout, theme, Button, Spin, Switch, Watermark } from 'antd';

const { Header, Content, Sider } = Layout;

import { Outlet } from 'react-router-dom';

import LayoutMenu from './LayoutMenu';

import Tabs from '../tab/Tab';

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [silderWidth, setSilderWidth] = useState(200);
  const [isShow, setIsShow] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  useEffect(() => {
    console.log(window.innerWidth);
    if (window.innerWidth < 768) {
      setSilderWidth(0);
      setIsShow(true);
    }
    const resizeUpdate = (e: any) => {
      // console.log(11111);

      // 通过事件对象获取浏览器窗口的高度
      let w = e.target.innerWidth;
      console.log(w);

      if (w < 768) {
        setSilderWidth(0);
        setIsShow(true);
      } else {
        setSilderWidth(200);
        setIsShow(false);
      }
    };

    window.addEventListener('resize', resizeUpdate);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => {
      window.removeEventListener('scroll', resizeUpdate);
    };
  }, []);
  // const resizeUpdate = (e: any) => {
  //   // console.log(11111);

  //   // 通过事件对象获取浏览器窗口的高度
  //   let w = e.target.innerWidth;
  //   console.log(w);

  //   if (w < 768) {
  //     setSilderWidth(0);
  //     setIsShow(true);
  //   } else {
  //     setSilderWidth(200);
  //     setIsShow(false);
  //   }
  // };
  // 页面变化时获取浏览器窗口的大小
  // window.addEventListener('resize', resizeUpdate);

  return (
    <Spin size="large" style={{ minHeight: '100vh' }} tip="Loading..." spinning={isLoading}>
      <Layout style={{ minHeight: '100vh' }}>
        {/* 左边侧边栏 */}
        <Sider theme="light" breakpoint="md" width={silderWidth} trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical"></div>
          <LayoutMenu />
        </Sider>
        {/* 右边内容区域 */}
        <Layout>
          {/* 右边区域头部 */}
          <Header style={{ padding: 0, background: colorBgContainer, display: 'flex' }}>
            {isShow ? (
              <Button
                type="text"
                icon={<UnorderedListOutlined />}
                // onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64
                }}
              />
            ) : (
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
            )}

            <div>
              {' '}
              <Switch checkedChildren={'开启'} unCheckedChildren={'关闭'} defaultChecked />
            </div>
          </Header>
          {/* <Breadcrumb style={{ margin: '10px 16px' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb> */}
          {/* 右边区域主内容 */}

          <Content style={{ margin: '16px 16px', background: colorBgContainer, overflow: 'initial' }}>
            {/* 窗口内容部分，子组件 */}

            <Tabs />
            <Watermark content="Ant Design">
              <div style={{ height: '100px' }}>
                <Outlet />
              </div>
            </Watermark>
          </Content>

          {/* 右边区域底部 */}
        </Layout>
      </Layout>
    </Spin>
  );
};

export default View;
