export const getRandomColor = () => {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const random = Math.random();
    const bit = (random * 16) | 0;
    color += bit.toString(16);
  }
  return color;
};

export const getTotal = (categoryData) => {
  let grandTotal = 0;

  categoryData.forEach((cat) => {
    cat.subCategories &&
      cat.subCategories.forEach((subCat) => {
        grandTotal += subCat.balance;
      });
  });

  console.log("Total");
  console.log(grandTotal);

  return grandTotal;
};

export const formatMoney = (total) => {
  return total.toLocaleString("en-US", { style: "currency", currency: "USD" });
};
