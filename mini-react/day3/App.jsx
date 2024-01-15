import React from "./core/React.js";
const Counter = ({ num }) => {
  return <div>{num}</div>;
};

const App = () => {
  return (
    <div>
      min-react
      <Counter num={10}></Counter>
      <Counter num={20}></Counter>
    </div>
  );
};

export default App;
