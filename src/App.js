import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const handleClick = () => setToggle(!toggle);

  return (
    <div>
      <h1>Hello world!</h1>
      {toggle && <div data-testid="toggle">toggle</div>}
      {data && <div>data</div>}
      {value && <p data-testid="controlled-paragraph">{value}</p>}

      <button data-testid="button-toggle" onClick={handleClick}>
        click
      </button>
      <input
        type="text"
        placeholder="type something"
        onChange={(e) => setValue(e.target.value)}
        data-testid="controlled-input"
      />
    </div>
  );
}

export default App;
