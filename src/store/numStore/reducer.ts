import numStore from './index';

//这是模块化写法

//定义一个reducer 用来接收action 并修改state 返回一个新的state 但是不能修改原来的state
// 也就是说reducer必须是一个纯函数 不能有副作用 不能有异步操作 不能有时间相关的操作 不能有DOM操作
const reducer = (state = { ...numStore.state }, action: { type: string; val?: number }) => {
  let newState = JSON.parse(JSON.stringify(state));
  //根据action的type来判断要做什么操作 从而返回一个新的state 调用dispatch方法时传入的action就是这里的action
  // switch (action.type) {
  //   case numStore.actionNames.ADD:
  //     numStore.actions.add(newState);
  //     break;
  //   case numStore.actionNames.CHANGE_NUM:
  //     numStore.actions.changeNum(newState, action);
  //     break;
  //   default:
  // }
  // 【优化】这样就每次写一个方法就不需要手动来添加这句case和执行，终于解放双手了！！
  for (let key in numStore.actionNames) {
    if (action.type === numStore.actionNames[key]) {
      numStore.actions[numStore.actionNames[key]](newState, action);
      break;
    }
  }

  return newState;
};

//导出reducer
export default reducer;
