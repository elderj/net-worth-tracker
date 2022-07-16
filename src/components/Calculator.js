import { useState } from "react";

import "../App.css";

function Calculator() {
  const [factorCategories, setFactorCategories] = useState([
    "Bank Account",
    "Real Estate",
    "Cash",
    "Stock Values",
    "Crypto",
    "Automobiles",
  ]);

  const [inputValue, setInputValue] = useState("");

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  function addCategory(newCat) {
    console.log("Adding: " + newCat);
    var biggerArray = [...factorCategories, newCat];
    setFactorCategories(biggerArray);
  }

  function removeCategory(category) {
    // console.log("Small Array: ");
    // console.log(smallerArray);
    // console.log("FC: ");
    // console.log(factorCategories);
    var smallerArray = factorCategories.filter((e) => e !== category);
    setFactorCategories(smallerArray);
  }

  const renderCategorizedContent = () => {
    return (
      <ul>
        {factorCategories.map((category, index) => (
          <li key={index}>
            {category}
            <button
              style={{ color: "maroon" }}
              onClick={() => removeCategory(category)}
            >
              x
            </button>
          </li>
        ))}
        <div style={{ backgroundColor: "maroon" }}>
          <p>Add a category:</p>
          <input
            type="text"
            name="name"
            onChange={onChangeHandler}
            value={inputValue}
          />
          <button
            disabled={!inputValue}
            onClick={() => addCategory(inputValue)}
          >
            Add
          </button>
        </div>
      </ul>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Net Worth Tracker</h1>
        {renderCategorizedContent()}
      </header>
    </div>
  );
}

export default Calculator;
