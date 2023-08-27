//路由表
import { Suspense, lazy } from 'react'; //路由懒加载
import Layout from '../pages/layout';
//重定向组件
import { Navigate } from 'react-router-dom';
//路由懒加载  懒加载组件时需要加一个loading组件
const Home = lazy(() => import('../pages/home/index'));

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
        element: generateLoadingRouter(<Home />),
        name: '首页',
        icon: ''
      }
    ]
  }
];

export default routes;
