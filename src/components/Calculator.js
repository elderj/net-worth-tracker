import { useState } from "react";
import CategoryTable from "./CategoryTable";
import { getRandomColor } from "../utils";
import "../App.css";

function Calculator() {
  const [inputValue, setInputValue] = useState("");
  const [categoryType, setCategoryType] = useState("bank");
  const [factorCategories, setFactorCategories] = useState([
    {
      name: "NFCU",
      type: "bank",
      key: "default",
      foregroundColor: "#FFFFFF",
      backgroundColor: "#1B3F6F",
      subCategories: [],
    },
  ]);

  function addCategory(newCategoryName) {
    console.log("Adding: " + newCategoryName);
    var updatedArray = [
      ...factorCategories,
      {
        name: newCategoryName,
        type: categoryType,
        backgroundColor: getRandomColor(),
        subCategories: [],
      },
    ];
    setFactorCategories(updatedArray);
  }

  function removeCategory(key) {
    setFactorCategories(factorCategories.filter((e) => e.key !== key));
  }

  function addSubcategory(categoryKey) {
    const selectedCat = factorCategories.filter(
      (category) => categoryKey === category.key
    )[0];
    let updatedArray = [
      ...factorCategories.filter((category) => categoryKey !== category.name),
      {
        name: selectedCat.name,
        backgroundColor: selectedCat.backgroundColor,
        subCategories: [
          // { subCategoryName: "Checking Account", balance: 500 },
          // { subCategoryName: "Savings Account", balance: 4500 },
          // { subCategoryName: "Travel Rewards Credit Card", balance: -87 },
          ...selectedCat.subCategories,
          {
            subCategoryName: selectedCat.subCategories.length
              ? selectedCat.subCategories.length + 1
              : 1,
            balance: 0,
          },
        ],
      },
    ];
    setFactorCategories(updatedArray);
  }

  function removSubcategory(categoryName, subCategoryName) {
    console.log("Let's remove this bread");
    const selectedCat = factorCategories.filter(
      (category) => categoryName === category.name
    )[0];

    const filteredSubcats = selectedCat.subCategories.filter(
      (subcat) => subcat.subCategoryName !== subCategoryName
    );

    console.log("filteredSubcats");
    console.log(filteredSubcats);

    let smallerArray = [
      ...factorCategories.filter((category) => categoryName !== category.name),
      {
        name: selectedCat.name,
        backgroundColor: selectedCat.backgroundColor,
        subCategories: filteredSubcats,
      },
    ];
    setFactorCategories(smallerArray);
  }

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

  const renderCategorizedContent = () => {
    return (
      <>
        {renderAddCategoryForm()}
        <div>
          {factorCategories.map((category, index) => (
            <div
              key={category.key}
              style={{
                backgroundColor: category.backgroundColor,
                borderRadius: "4px",
              }}
            >
              {category.name}
              <button
                style={{ color: "maroon" }}
                onClick={() => removeCategory(category.key)}
              >
                x
              </button>
              <CategoryTable
                name={category.name}
                type={category.type}
                key={category.key}
                subCategories={category.subCategories}
                backgroundColor={category.backgroundColor}
                addSubcategory={addSubcategory}
                removSubcategory={removSubcategory}
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
