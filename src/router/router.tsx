//路由表
import { Suspense, lazy } from 'react'; //路由懒加载
import { DashboardOutlined, HomeOutlined, UserOutlined, SkinOutlined } from '@ant-design/icons';
import Layout from '../components/layout';
import Home from '../pages/home';
//重定向组件
import { Navigate } from 'react-router-dom';
//路由懒加载  懒加载组件时需要加一个loading组件
const Users = lazy(() => import('../pages/users/index'));
// 路由懒加载loading函数处理方式 懒加载组件时需要加一个loading组件
const generateLoadingRouter = (component: JSX.Element) => {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      {/* 把懒加载的异步路由变成组件装载进去 */}
      {component}
    </Suspense>
  );
};
const routes = [
  {
    path: '/',
    element: <Navigate to="/admin" />,
    name: '后台'
  },
  {
    path: '/admin',
    element: <Navigate to="/admin/home" />,
    name: '首页'
  },
  {
    path: '/admin',
    element: <Layout />,
    name: '首页',
    icon: '',
    children: [
      {
        path: '/admin/home',
        element: <Home />,
        name: '首页',
        icon: <DashboardOutlined />
      },
      {
        name: '用户管理',
        icon: <UserOutlined />,
        children: [
          {
            path: '/admin/users',
            element: generateLoadingRouter(<Users />),
            name: '用户信息',
            icon: <SkinOutlined />
          },
          {
            path: '/admin/usersinfo',
            element: generateLoadingRouter(<Users />),
            name: '用户xian',
            icon: ''
          }
        ]
      },
      {
        name: '商品管理',
        icon: <UserOutlined />,
        children: [
          {
            path: '/admin/goods',
            element: generateLoadingRouter(<Users />),
            name: '商品信息',
            icon: <SkinOutlined />
          },
          {
            path: '/admin/goodsinfo',
            element: generateLoadingRouter(<Users />),
            name: '用户1231',
            icon: ''
          }
        ]
      }
    ]
  }
];

export default routes;
