import { useState } from "react";
import { SketchPicker } from "react-color";
import CategoryTable from "./CategoryTable";
import { getRandomColor, getTotal } from "../utils";
import "../App.css";
import brush from "../images/paint-brush.png";
import MainChart from "./MainChart";
import TotalsSummary from "./TotalsSummary";

function Calculator() {
  const [inputValue, setInputValue] = useState("");
  const [categoryType, setCategoryType] = useState("bank");
  const [colorHexCode, setColorHexCode] = useState("#000000");
  const [showColorModal, setShowColorModal] = useState("nothing");

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
    let presetSubCats = [];

    if (categoryType === "bank") {
      presetSubCats.push({
        balance: 4500,
        subCategoryId: date,
        subCategoryName: "Checking",
      });
      presetSubCats.push({
        balance: 500,
        subCategoryId: date + 1,
        subCategoryName: "Savings",
      });
    }

    if (categoryType === "investment") {
      presetSubCats.push({
        balance: 55,
        subCategoryId: date,
        subCategoryName: "MCD Stock",
      });
      presetSubCats.push({
        balance: 1000,
        subCategoryId: date,
        subCategoryName: "1% Certificate of Deposit",
      });
    }

    if (categoryType === "realEstate") {
      presetSubCats.push({
        balance: 225000,
        subCategoryId: date,
        subCategoryName: "Estimated Home Value",
      });
      presetSubCats.push({
        balance: -25000,
        subCategoryId: date,
        subCategoryName: "Remaining Mortgage Balance",
      });
    }

    if (categoryType === "cash") {
      presetSubCats.push({
        balance: 1,
        subCategoryId: date,
        subCategoryName: "Balance",
      });
    }

    if (categoryType === "auto") {
      presetSubCats.push({
        balance: 3500,
        subCategoryId: date,
        subCategoryName: "Car value",
      });
      presetSubCats.push({
        balance: 3500,
        subCategoryId: date,
        subCategoryName: "Remaining Auto loan balance",
      });
    }

    if (categoryType === "loan") {
      presetSubCats.push({
        balance: -2500,
        subCategoryId: date,
        subCategoryName: "Personal Loan",
      });
    }

    var updatedArray = [
      ...factorCategories,
      {
        name: newCategoryName,
        type: categoryType,
        id: date,
        backgroundColor: getRandomColor(),
        subCategories: presetSubCats,
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

    const filtered = factorCategories.filter(
      (category) => categoryId !== category.id
    );

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
            subCategoryId: date,
            subCategoryName: "Name",
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
          placeholder="Category Name"
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
    console.log("Categories:");
    console.log(factorCategories);
    return (
      <>
        {renderAddCategoryForm()}
        <table className="SubCategory-Table">
          <tbody>
            {factorCategories
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map((category, index) => (
                <div
                  id={category.id}
                  style={{
                    backgroundColor: category.backgroundColor,
                    borderRadius: "4px",
                  }}
                >
                  <tr>
                    <td>{category.name + ": " + category.type}</td>
                    <td>
                      {console.log("Here")}
                      {console.log(category.id === showColorModal)}

                      {category.id === showColorModal ? (
                        <div className="parent">
                          <div className="Floating-color-div">
                            <button
                              onClick={() => setShowColorModal("nothing")}
                            >
                              Close Color Window
                            </button>
                            <SketchPicker
                              color={colorHexCode}
                              onChange={(e) => setColorHexCode(e.hex)}
                            />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={brush}
                          className="Paint-brush"
                          alt="Paint brush icon to change color per category."
                          onClick={() =>
                            console.log(setShowColorModal(category.id))
                          }
                        />
                      )}
                    </td>
                    <td
                      colSpan={5}
                      style={{
                        verticalAlign: "top",
                        textAlign: "right",
                      }}
                    >
                      <button
                        style={{ color: "maroon", verticalAlign: "top" }}
                        onClick={() => removeCategory(category.id)}
                      >
                        x
                      </button>
                    </td>
                  </tr>

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
          </tbody>
        </table>
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Net Worth Tracker</h1>
        <TotalsSummary total={getTotal(factorCategories)} />
        <MainChart />
        {renderCategorizedContent()}
      </header>
    </div>
  );
}

export default Calculator;
