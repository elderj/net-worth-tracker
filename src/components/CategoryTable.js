import "../App.css";

const CategoryTable = (props) => {
  return (
    <>
      <p>{"Type: " + props.type}</p>
      {console.log("Props:")}
      {console.log(props)}
      <table
        className="SubCategory-Table"
        style={{ backgroundColor: props.backgroundColor }}
      >
        <tbody>
          {props.subCategories &&
            props.subCategories.map((subCategory, index) => (
              <tr>
                <td>{subCategory.subCategoryName}</td>
                <td>
                  <input></input>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default CategoryTable;
