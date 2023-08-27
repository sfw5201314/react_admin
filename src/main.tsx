// import React from 'react';
import ReactDOM from 'react-dom/client';
//样式初始化插件
import 'reset-css';
import '@/assets/style/globalVar.scss';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  //</React.StrictMode>
);
