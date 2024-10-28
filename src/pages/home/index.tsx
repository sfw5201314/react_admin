import { useSelector, useDispatch } from 'react-redux';
// import store from '../../store';
//定义一个类型 用于获取store中的数据 使用ReturnType的一个范型 传递一个typeof store.getState() 用于获取store中的数据
// type RootState = ReturnType<typeof store.getState>;

//引入store
const Home = () => {
  //获取store中的数据 通过useSelector
  const { num } = useSelector((state: RootState) => state.numStore); //按模块化的方式获取store中的数据
  //触发dispatch 通过useDispatch 用于触发dispatch 修改我们state里面的数据
  const dispatch = useDispatch();
  //点击按钮触发dispatch dispatch里面传递一个对象 里面有一个type属性 用于区分是哪个dispatch 另一个属性可以随便写可以用于传值
  const changeNum = () => {
    //触发dispatch
    dispatch({ type: 'add' });
  };
  const changeState = () => {
    dispatch({ type: 'changeNum', val: 10 });
  };
  return (
    <div>
      <h1>Home</h1>
      <h3>{num}</h3>
      <button onClick={changeNum}>点击数字+1</button>
      <button onClick={changeState}>点击更改数字</button>
    </div>
  );
};

export default Home;
