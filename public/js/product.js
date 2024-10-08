const subclick = document.querySelector(".subclick");
const qtyValue = document.querySelector(".qtyValue");
const addclick = document.querySelector(".addclick");
const pPrice = document.querySelector(".p-price");
const order = document.querySelector(".order-btn");
const productName = document.querySelector(".card-title");

let price = Number(pPrice.textContent);
let value = Number(qtyValue.value);

let totalPrice;
subclick.addEventListener("click", () => {
  if (value > 1) {
    value--;
    qtyValue.value = value;
    let total = price * value;
    pPrice.textContent = total;
  }
});
addclick.addEventListener("click", () => {
  value++;
  qtyValue.value = value;
  let total = price * value;
  pPrice.textContent = total;
});

let products = [];
order.addEventListener("click", () => {
  function addProductToLocalStorage(newProduct) {
    // Get existing products from localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Check if the product already exists (based on product name)
    const productExists = products.some(
      (product) => product.productName === newProduct.productName
    );

    // Only add the product if it doesn't exist already
    if (!productExists) {
      products.push(newProduct);
    }

    // Save updated products array back to localStorage
    localStorage.setItem("products", JSON.stringify(products));
  }

  // Example of adding a product
  const newProduct = {
    productName: productName.innerText,
    quantity: value,
    price: price,
    total_price: value * price,
  };

  // Call the function to add a product
  addProductToLocalStorage(newProduct);

  location.assign('/checkout')
//   console.log(location.assign(location.origin + "/checkout"));
});
