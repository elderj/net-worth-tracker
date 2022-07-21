import { useState } from "react";
import CategoryTable from "./CategoryTable";
import "../App.css";

function Calculator() {
  const [factorCategories, setFactorCategories] = useState([
    {
      name: "NFCU",
      type: "bank",
      subCategories: [
        { subCategoryName: "Checking Account", balance: 500 },
        { subCategoryName: "Savings Account", balance: 4500 },
        { subCategoryName: "Travel Rewards Credit Card", balance: -87 },
      ],
    },
    // {
    //   name: "Real Estate",
    // },
    // "Bank Account",
    // "Real Estate",
    // "Cash",
    // "Stock Values",
    // "Crypto",
    // "Automobiles",
  ]);

  const [inputValue, setInputValue] = useState("");

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  function addCategory(newCategoryName) {
    console.log("Adding: " + newCategoryName);
    var updatedArray = [...factorCategories, { name: newCategoryName }];
    setFactorCategories(updatedArray);
  }

  function removeCategory(category) {
    console.log("Removing: " + category);
    var smallerArray = factorCategories.filter((e) => e.name !== category);
    setFactorCategories(smallerArray);
  }

  const renderCategorizedContent = () => {
    return (
      <ul>
        {console.log("factorCategories count:" + factorCategories.length)}
        {factorCategories.map((category, index) => (
          <li key={index}>
            {category.name}
            <button
              style={{ color: "maroon" }}
              onClick={() => removeCategory(category.name)}
            >
              x
            </button>
            <ul>
              {category.subCategories &&
                category.subCategories.map((subCategory, index) => (
                  <li key={index}>
                    {subCategory.subCategoryName}
                    {console.log("Sub Cat Name:" + subCategory.subCategoryName)}
                  </li>
                ))}
              <CategoryTable />
            </ul>
          </li>
        ))}
        <div style={{ backgroundColor: "gray" }}>
          <p>Add a category:</p>
          <input
            type="text"
            name="name"
            onChange={onChangeHandler}
            value={inputValue}
          />
          <select>
            <option value="grapefruit">Grapefruit</option>

            <option value="lime">Lime</option>

            <option selected value="coconut">
              Coconut
            </option>

            <option value="mango">Mango</option>
          </select>
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
