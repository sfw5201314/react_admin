const store: AppStore = {
  state: {
    num: 20
  },
  actions: {
    add(newState: { num: number }) {
      newState.num++;
    },
    changeNum(newState: { num: number }, action: { type: string; val?: number }) {
      newState.num = action.val || 0;
    }
  },
  //命名统一管理
  actionNames: {
    ADD: 'add',
    CHANGE_NUM: 'changeNum'
  }
};
interface actionNameType {
  [key: string]: string;
}
let actionNames: actionNameType = {};
for (let key in store.actions) {
  actionNames[key] = key;
}
store.actionNames = actionNames;

export default store;
