import "../App.css";

const CategoryTable = (props) => {
  return (
    <>
      {props.subCategories && props.subCategories.length > 0 ? (
        props.subCategories.map((subCategory, index) => (
          <tr>
            <td>{subCategory.subCategoryName}</td>
            <td>{subCategory.balance}</td>
            <td>
              <input></input>
            </td>
            <td>
              <button
                style={{ color: "maroon" }}
                onClick={() =>
                  props.removeSubcategory(props.id, subCategory.subCategoryId)
                }
              >
                x
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6}> No Subcategories let's add at least one</td>
        </tr>
      )}
      <tr>
        <td colSpan={6} style={{ textAlign: "center" }}>
          <button onClick={() => props.addSubcategory(props.id)}>
            Add a subcategory
          </button>
        </td>
      </tr>
    </>
  );
};

export default CategoryTable;
