// Get products from localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];
// Reference to table body and empty message
const tableBody = document.querySelector("#productTable tbody");
const emptyMessage = document.getElementById("emptyMessage");

let totalPrice = 0; // Reset total price
let totalQuantity = 0; // Reset total price
let productNames = products.map(product => product.productName).join(', ');
document.getElementById('productNames').value =productNames;

// Function to populate table and update subtotal
function populateTable() {
  tableBody.innerHTML = ""; // Clear existing rows

  if (products.length === 0) {
    // Show empty message if no products
    emptyMessage.style.display = "block";
    document.getElementById("productTable").style.display = "none"; // Hide table
  } else {
    // Hide empty message and show table
    emptyMessage.style.display = "none";
    document.getElementById("productTable").style.display = "table";

    products.forEach((product, index) => {
      // Update total price by multiplying price with quantity
      totalPrice += parseFloat(product.price) * parseInt(product.quantity);
      let totalQuantity = products.reduce((sum, product) => sum + parseInt(product.quantity), 0);
      
      document.getElementById('totalQuantity').value =totalQuantity;
      // Create a new row for each product
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><a href="/product/${product.productName}" class="text-decoration-none">${product.productName}</a></td>
        <td>৳${product.price}</td>
        <td>${product.quantity}</td>
        <td>৳${product.total_price}</td>
        <td>
          <button type="button" class="btn btn-danger" style="font-size: smaller;" data-index="${index}">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Update Cart Subtotal and Grand Total after the table is populated
    document.getElementById('cartSubtotal').innerText = `৳${totalPrice.toFixed(2)}`;
    document.getElementById('grandTotal').innerText = `৳${totalPrice.toFixed(2)}`;
  }
}

// Initial table population
populateTable();

// Add event listener for delete buttons
tableBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-danger")) {
    const index = event.target.getAttribute("data-index");

    // Remove the product from the array
    products.splice(index, 1);

    // Update localStorage
    localStorage.setItem("products", JSON.stringify(products));
    location.reload()

    // Re-populate the table and update subtotal
    populateTable();
  }
});

function shippingCharge() {
    const area = document.getElementById("area").value;
    let shippingCost = 0;

    if (area === "ঢাকার ভেতরে") {
        shippingCost = 60;
    } else if (area === "ঢাকার বাহিরে") {
        shippingCost = 120;
    }

    // Update the shipping charge
    document.getElementById("shippingCharge").innerText = `৳${shippingCost}`;

    // Update the grand total
    const grandTotal = totalPrice + shippingCost;
    document.getElementById('grandTotal').innerText = `৳${grandTotal}`;
    document.getElementById('totalPrice').value =grandTotal;
}


