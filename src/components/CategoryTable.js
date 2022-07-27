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
          {props.subCategories && props.subCategories.length > 0 ? (
            props.subCategories.map((subCategory, index) => (
              <tr>
                <td>{subCategory.subCategoryId}</td>
                <td>
                  <input></input>
                </td>
                <td>
                  <button
                    style={{ color: "maroon" }}
                    onClick={() =>
                      props.removeSubcategory(
                        props.id,
                        subCategory.subCategoryId
                      )
                    }
                  >
                    x
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <p> No Subcategories let's add at least one</p>
          )}
          <button onClick={() => props.addSubcategory(props.id)}>
            Add a subcategory
          </button>
        </tbody>
      </table>
    </>
  );
};

export default CategoryTable;
