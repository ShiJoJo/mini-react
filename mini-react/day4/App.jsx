import React from "./core/React.js";
let count = 1;
let props = { id: 1234 };
const Counter = ({ num }) => {
  const sendMsg = () => {
    count++;
    props = {};
    React.update();
  };
  return (
    <div {...props}>
      count:{count}
      <button onClick={sendMsg}>点击</button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      min-react
      <Counter num={10}></Counter>
    </div>
  );
};

export default App;
