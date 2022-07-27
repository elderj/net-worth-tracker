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
      id: "default",
      foregroundColor: "#FFFFFF",
      backgroundColor: "#1B3F6F",
      subCategories: [],
    },
  ]);

  function addCategory(newCategoryName) {
    const date = Date.now();
    var updatedArray = [
      factorCategories,
      {
        name: newCategoryName,
        type: categoryType,
        id: date,
        backgroundColor: getRandomColor(),
        subCategories: [],
      },
    ];
    setFactorCategories(updatedArray);
  }

  function removeCategory(id) {
    setFactorCategories(factorCategories.filter((e) => e.id !== id));
  }

  function addSubcategory(categoryId) {
    const date = Date.now();
    const selectedCat = factorCategories.filter(
      (category) => categoryId === category.id
    )[0];
    // console.log("Selected Cat:");
    // console.log(selectedCat);

    const filtered = factorCategories.filter(
      (category) => categoryId !== category.id
    );

    console.log("Filtered:");
    console.log(filtered);

    let updatedArray = [
      ...filtered,
      {
        name: selectedCat.name,
        backgroundColor: selectedCat.backgroundColor,
        type: selectedCat.type,
        id: selectedCat.id,
        subCategories: [
          ...selectedCat.subCategories,
          {
            // subCategoryId: selectedCat.subCategories.length,
            subCategoryId: date,
            balance: 0,
          },
        ],
      },
    ];

    setFactorCategories(updatedArray);
  }

  function removeSubcategory(categoryId, subCategoryId) {
    const selectedCat = factorCategories.filter(
      (category) => categoryId === category.id
    )[0];

    const filteredSubcats = selectedCat.subCategories.filter(
      (subcat) => subcat.subCategoryId !== subCategoryId
    );

    let smallerArray = [
      ...factorCategories.filter((category) => categoryId !== category.id),
      {
        name: selectedCat.name,
        backgroundColor: selectedCat.backgroundColor,
        type: selectedCat.type,
        id: selectedCat.id,
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
              id={category.id}
              style={{
                backgroundColor: category.backgroundColor,
                borderRadius: "4px",
              }}
            >
              {category.name}
              <button
                style={{ color: "maroon" }}
                onClick={() => removeCategory(category.id)}
              >
                x
              </button>
              <CategoryTable
                name={category.name}
                type={category.type}
                id={category.id}
                subCategories={category.subCategories}
                backgroundColor={category.backgroundColor}
                addSubcategory={addSubcategory}
                removeSubcategory={removeSubcategory}
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
