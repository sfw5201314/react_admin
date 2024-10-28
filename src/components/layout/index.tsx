import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  createFromIconfontCN,
  GithubFilled,
  PoweroffOutlined
} from '@ant-design/icons';
import { Layout, theme, Button, Spin, Switch, Watermark, ConfigProvider, Drawer } from 'antd';

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
    return () => {
      window.removeEventListener('scroll', resizeUpdate);
    };
  }, []);

  //抽屉控制
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  //子组件传递过来的值
  const getDrawerShow = (data: boolean): void => {
    setOpen(data);
  };

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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '64px',
                textAlign: 'center',
                lineHeight: '64px',
                color: value == 'default' ? '' : '#fff'
              }}
              className="demo-logo-vertical"
            >
              <img
                style={{ height: '30px', width: '30px', marginRight: '10px' }}
                src="https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg"
                alt="logo"
              />
            </div>
            <LayoutMenu />
          </Sider>
          {/* 右边内容区域 */}
          <Layout>
            {/* 右边区域头部 */}
            <Header
              style={{
                padding: 0,
                background: value == 'default' ? colorBgContainer : '',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              {isShow ? (
                <Button
                  type="text"
                  icon={<UnorderedListOutlined />}
                  onClick={showDrawer}
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

              {/* 头部右边功能区 */}
              <div style={{ marginRight: '16px' }}>
                {/* 切换主题 */}
                <Switch
                  style={{ marginRight: '10px' }}
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
                <GithubFilled />
                <Button style={{ marginLeft: '10px' }} icon={<PoweroffOutlined />} type="primary" size="small" danger>
                  退出
                </Button>
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
              <Watermark content="SFW Admin Design">
                <div style={{ height: '100px' }}>
                  <Outlet />
                </div>
              </Watermark>
            </Content>

            {/* 右边区域底部 */}
          </Layout>
          {/* 抽屉盒子 */}
          <Drawer
            placement="left"
            title="React Admin"
            width={200}
            bodyStyle={{ padding: 0 }}
            closable={false}
            onClose={onClose}
            open={open}
            key="left"
          >
            <LayoutMenu getDrawerShow={getDrawerShow} />
          </Drawer>
        </Layout>
      </ConfigProvider>
    </Spin>
  );
};

export default View;
