import { useState } from "react";
import logo from "./images/money-stack.png";
import "./App.css";
import Calculator from "./components/Calculator";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="App">
      {showIntro ? (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Net Worth Track</p>

          <button onClick={() => setShowIntro(false)}>
            Let's Get Started!
          </button>
        </header>
      ) : (
        <Calculator />
      )}
    </div>
  );
}

export default App;
