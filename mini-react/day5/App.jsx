import React from "./core/React.js";
let isShowFoo = true;
const Counter = () => {
  const sendMsg = () => {
    isShowFoo = !isShowFoo;
    React.update();
  };
  return <button onClick={sendMsg}>点击</button>;
};

const Foo = () => <div>foo</div>;
const home = <p>home</p>;

const App = () => {
  return (
    <div>
      min-react
      <Counter></Counter>
      {isShowFoo ? <Foo></Foo> : home}
    </div>
  );
};

export default App;
