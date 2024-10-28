//引入createStore
import { legacy_createStore, combineReducers } from 'redux';
// import reducer from './最初的reducer.ts';
//创建store 加入redux-devtools-extension 用于调试 redux 代码
// 但是需要安装redux-devtools-extension插件 详情见

//模块化的写法

import numStore from './numStore/reducer.ts';

//引入reducer combineReducers是合并reducer的方法
const reducers = combineReducers({
  numStore
});

const store = legacy_createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//导出store
export default store;
