import React from "./core/React.js";

const Foo = () => {
  const [fooNum, setFooNum] = React.useState(10);
  const [bar, setBar] = React.useState("1");
  const editFoo = () => {
    // setFooNum((val) => val + 1);
    setBar("bar");
  };
  return (
    <div>
      foo:{fooNum}
      <div>{bar}</div>
      <button onClick={editFoo}>foo</button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      min-react
      <Foo></Foo>
    </div>
  );
};

export default App;
