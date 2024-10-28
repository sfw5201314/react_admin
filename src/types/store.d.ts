//在这里不要使用import，因为这个文件是用来定义类型的，不是用来执行代码的
//要使用import，需要在tsconfig.json中配置"allowSyntheticDefaultImports": true
type RootState = ReturnType<typeof import('@/store').getState>;
type AppDispatch = typeof import('@/store').dispatch;
type AppStore = typeof import('@/store');
interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: function;
}
