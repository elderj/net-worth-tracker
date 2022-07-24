import { useState } from "react";
import CategoryTable from "./CategoryTable";
import "../App.css";

function Calculator() {
  const [inputValue, setInputValue] = useState("");
  const [categoryType, setCategoryType] = useState("bank");

  const [factorCategories, setFactorCategories] = useState([
    {
      name: "NFCU",
      type: "bank",
      foregroundColor: "#FFFFFF",
      backgroundColor: "#1B3F6F",
      subCategories: [
        { subCategoryName: "Checking Account", balance: 500 },
        { subCategoryName: "Savings Account", balance: 4500 },
        { subCategoryName: "Travel Rewards Credit Card", balance: -87 },
      ],
    },
  ]);

  const onInputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };
  const onTypeChangeHandler = (event) => {
    setCategoryType(event.target.value);
  };

  const renderAddCategoryForm = () => {
    return (
      <div
        style={{ backgroundColor: "gray", borderRadius: "4px", margin: "2em" }}
      >
        <p>Add a category:</p>
        <input
          type="text"
          name="name"
          onChange={onInputChangeHandler}
          value={inputValue}
        />
        <select value={categoryType} onChange={onTypeChangeHandler}>
          <option value="bank">Bank</option>
          <option value="investment">Investment Account</option>
          <option value="realEstate">Real Estate</option>
          <option value="cash">Cash</option>
          <option value="auto">Automobiles</option>
          <option value="loans">Loans</option>
        </select>
        <button disabled={!inputValue} onClick={() => addCategory(inputValue)}>
          Add
        </button>
      </div>
    );
  };

  function addCategory(newCategoryName) {
    console.log("Adding: " + newCategoryName);
    var updatedArray = [
      ...factorCategories,
      { name: newCategoryName, type: categoryType },
    ];
    setFactorCategories(updatedArray);
  }

  function removeCategory(category) {
    console.log("Removing: " + category);
    var smallerArray = factorCategories.filter((e) => e.name !== category);
    setFactorCategories(smallerArray);
  }

  const renderCategorizedContent = () => {
    return (
      <>
        {renderAddCategoryForm()}
        <div>
          {factorCategories.map((category, index) => (
            <div
              key={index}
              style={{
                backgroundColor: category.backgroundColor,
                borderRadius: "4px",
              }}
            >
              {category.name}
              <button
                style={{ color: "maroon" }}
                onClick={() => removeCategory(category.name)}
              >
                x
              </button>
              <CategoryTable
                type={category.type}
                subCategories={category.subCategories}
                backgroundColor={category.backgroundColor}
              />
            </div>
          ))}
        </div>
      </>
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
