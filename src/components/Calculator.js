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

  const onInputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };
  const onTypeChangeHandler = (event) => {
    setCategoryType(event.target.value);
  };

  const renderAddCategoryForm = () => {
    return (
      <div style={{ backgroundColor: "gray" }}>
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
          <option value="auto">Real Estate</option>
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
        <ul>
          {console.log("factorCategories count:" + factorCategories.length)}
          {factorCategories.map((category, index) => (
            <li key={index}>
              {category.name + " " + category.type}
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
                      {console.log(
                        "Sub Cat Name:" + subCategory.subCategoryName
                      )}
                    </li>
                  ))}
                <CategoryTable />
              </ul>
            </li>
          ))}
        </ul>
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
