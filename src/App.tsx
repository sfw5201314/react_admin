// import { Outlet } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import routes from './router/router';
function App() {
  //路由表使用这种方式
  const outlet = useRoutes(routes);
  return (
    <>
      {/* 路由出口和roterview一样 */}
      {outlet}
    </>
  );
}

export default App;
