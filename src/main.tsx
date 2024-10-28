// import React from 'react';
import ReactDOM from 'react-dom/client';
//样式初始化插件
import 'reset-css';
import '@/assets/style/globalVar.scss';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
//引入redux Provider 用于传递store 用于全局状态管理
import { Provider } from 'react-redux';
//引入store
import store from './store/index';
ReactDOM.createRoot(document.getElementById('root')!).render(
  // Provider 用于传递store 用于全局状态管理
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
