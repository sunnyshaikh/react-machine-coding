// Function to filter products with discount calculation
function getFilteredProducts(products, minPrice, maxPrice, category, sortBy) {
  const filteredProduct = products.filter((product) => {
    let price = product?.discount
      ? product.price - product.discount
      : product.price;
    product["price"] = price;
    delete product.discount;
    return category
      ? price >= minPrice && price <= maxPrice && product.category === category
      : price >= minPrice && price <= maxPrice;
  });

  return filteredProduct.sort((a, b) =>
    typeof a[sortBy] === "string"
      ? a[sortBy] < b[sortBy]
        ? -1
        : a[sortBy] > b[sortBy]
        ? 1
        : 0
      : a[sortBy] - b[sortBy]
  );
}

// Test runner to check if actual output matches expected output
function runTest(testName, actualOutput, expectedOutput) {
  const passed =
    JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);

  console.log(`${testName}: ${passed ? "PASSED" : "FAILED"}`);
}

// Sample product data
const products = [
  { id: 1, name: "Laptop", price: 900, category: "Electronics", discount: 10 },
  { id: 2, name: "Shoes", price: 200, category: "Fashion" },
  {
    id: 3,
    name: "Smartphone",
    price: 760,
    category: "Electronics",
    discount: 5,
  },
  { id: 4, name: "T-shirt", price: 50, category: "Fashion" },
  { id: 5, name: "Fridge", price: 960, category: "Appliances" },
];

// Additional test products
const testProducts1 = [
  { id: 6, name: "Table", price: 100, category: "Furniture", discount: 100 },
];
const testProducts2 = [
  { id: 7, name: "Chair", price: 150, category: "Furniture" },
];

// Test cases
runTest("Test Case 1", getFilteredProducts(products, 100, 500, null, "price"), [
  { id: 2, name: "Shoes", price: 200, category: "Fashion" },
]);

runTest(
  "Test Case 2",
  getFilteredProducts(products, 100, 1000, "Electronics", "price"),
  [
    { id: 3, name: "Smartphone", price: 755, category: "Electronics" },
    { id: 1, name: "Laptop", price: 890, category: "Electronics" },
  ]
);

runTest(
  "Test Case 3",
  getFilteredProducts(products, 100, 1000, "Fashion", "name"),
  [{ id: 2, name: "Shoes", price: 200, category: "Fashion" }]
);

runTest(
  "Test Case 4",
  getFilteredProducts(products, 100, 500, "Fashion", "price"),
  [{ id: 2, name: "Shoes", price: 200, category: "Fashion" }]
);

runTest(
  "Test Case 5",
  getFilteredProducts(products, 500, 2000, null, "price"),
  [
    { id: 3, name: "Smartphone", price: 755, category: "Electronics" },
    { id: 1, name: "Laptop", price: 890, category: "Electronics" },
    { id: 5, name: "Fridge", price: 960, category: "Appliances" },
  ]
);

runTest(
  "Test Case 6",
  getFilteredProducts(products, 2000, 5000, null, "price"),
  []
);

runTest(
  "Test Case 7",
  getFilteredProducts(products, 100, 1000, "Books", "price"),
  []
);

runTest("Test Case 8", getFilteredProducts(products, 0, 2000, null, "price"), [
  { id: 4, name: "T-shirt", price: 50, category: "Fashion" },
  { id: 2, name: "Shoes", price: 200, category: "Fashion" },
  { id: 3, name: "Smartphone", price: 755, category: "Electronics" },
  { id: 1, name: "Laptop", price: 890, category: "Electronics" },
  { id: 5, name: "Fridge", price: 960, category: "Appliances" },
]);

runTest(
  "Test Case 9",
  getFilteredProducts(testProducts1, 50, 200, "Furniture", "price"),
  []
);

runTest(
  "Test Case 10",
  getFilteredProducts(testProducts2, 50, 200, "Furniture", "price"),
  [{ id: 7, name: "Chair", price: 150, category: "Furniture" }]
);
