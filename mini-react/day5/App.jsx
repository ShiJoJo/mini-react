import React from "./core/React.js";
let isShowFoo = true;
const Counter = () => {
  const update = React.update();
  const sendMsg = () => {
    isShowFoo = !isShowFoo;
    update();
  };
  return <button onClick={sendMsg}>点击</button>;
};

let fooNum = 0;
const Foo = () => {
  const update = React.update();
  const editFoo = () => {
    fooNum++;
    update();
  };
  console.log("render:foo");
  return (
    <div>
      foo:{fooNum}
      <button onClick={editFoo}>foo</button>;
    </div>
  );
};

let barNum = 0;
const Bar = () => {
  const update = React.update();
  const editBar = () => {
    barNum++;
    update();
  };
  console.log("render:bar");
  return (
    <div>
      bar:{barNum}
      <button onClick={editBar}>bar</button>;
    </div>
  );
};

const App = () => {
  return (
    <div>
      min-react
      <Counter></Counter>
      <Foo></Foo>
      <Bar></Bar>
    </div>
  );
};

export default App;
