// import { useState } from "react";
import "../App.css";

const CategoryTable = (props) => {
  return (
    <>
      <p>{"Type: " + props.type}</p>
      {/* <table>
        <tbody>
          <tr>
            <td>cell 1</td>
          </tr>
        </tbody>
      </table> */}
      {console.log("Props:")}
      {console.log(props)}
      <table
        className="SubCategory-Table"
        style={{ backgroundColor: props.backgroundColor }}
      >
        {props.subCategories &&
          props.subCategories.map((subCategory, index) => (
            <tr>
              <td>{subCategory.subCategoryName}</td>
              <td>
                <input></input>
              </td>
            </tr>
          ))}
      </table>
    </>
  );
};

export default CategoryTable;
