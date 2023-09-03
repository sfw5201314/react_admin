import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UnorderedListOutlined, createFromIconfontCN } from '@ant-design/icons';
import { Layout, theme, Button, Spin, Switch, Watermark, ConfigProvider } from 'antd';

const { Header, Content, Sider } = Layout;

import { Outlet } from 'react-router-dom';

import LayoutMenu from './LayoutMenu';

import Tabs from '../tab/Tab';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4235394_q73r6daer0o.js'
});

const View: React.FC = () => {
  //是否折叠
  const [collapsed, setCollapsed] = useState(false);
  //是否加载
  const [isLoading, setIsLoading] = useState(true);
  //侧边栏宽度
  const [silderWidth, setSilderWidth] = useState(200);
  //是否显示侧边栏
  const [isShow, setIsShow] = useState(false);
  //暗黑模式切换
  const [value, setValue] = useState(sessionStorage.getItem('theme') || 'default');
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
    // setValue(sessionStorage.getItem('theme') || 'default');
    return () => {
      window.removeEventListener('scroll', resizeUpdate);
    };
  }, []);

  return (
    // default则使用theme.defaultAlgorithm, dark则使用theme.darkAlgorithm

    <Spin size="large" style={{ minHeight: '100vh' }} tip="Loading..." spinning={isLoading}>
      <ConfigProvider
        theme={{
          algorithm: value === 'default' ? theme.defaultAlgorithm : theme.darkAlgorithm
        }}
      >
        <Layout style={{ minHeight: '100vh' }}>
          {/* 左边侧边栏 */}
          <Sider theme="light" breakpoint="md" width={silderWidth} trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical"></div>
            <LayoutMenu />
          </Sider>
          {/* 右边内容区域 */}
          <Layout>
            {/* 右边区域头部 */}
            <Header
              style={{
                padding: 0,
                background: value == 'default' ? colorBgContainer : '',
                display: 'flex'
              }}
            >
              {isShow ? (
                <Button
                  type="text"
                  icon={<UnorderedListOutlined />}
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
                <Switch
                  checkedChildren={<IconFont type="icon-DND_mode" />}
                  unCheckedChildren={<IconFont type="icon-brightness" />}
                  size="small"
                  checked={value === 'default' ? false : true}
                  onChange={() => {
                    setValue(value === 'default' ? 'dark' : 'default');
                    console.log('11111', value);

                    sessionStorage.setItem('theme', value === 'default' ? 'dark' : 'default');
                  }}
                  // defaultChecked 默认选中状态
                />
              </div>
            </Header>
            {/* 右边区域主内容 */}

            <Content
              style={{
                margin: '16px 16px',
                background: value == 'default' ? colorBgContainer : '',
                overflow: 'initial'
              }}
            >
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
      </ConfigProvider>
    </Spin>
  );
};

export default View;
