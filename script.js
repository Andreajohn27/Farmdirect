
/* cart storage using  empty array*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* WELCOME ALERT only for products page */

window.onload = function(){

  if(window.location.pathname.includes("products")){
    alert("🌿 Welcome to FarmDirect!\nBuy fresh organic products directly from farms.");
  }

  updateCartDisplay();
};


/*  ADD TO CART function to check for ex */

function addToCart(name, price, unit){

  let existing = cart.find(item => item.name === name);

  if(existing){
    existing.quantity += 1;
  }
  else{
    cart.push({
      name:name,
      price:price,
      unit:unit,
      quantity:1
    });
  }

  updateCartDisplay();
}


/* ---------------- DISPLAY CART ---------------- */

function updateCartDisplay(){

  const cartItems = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");

  let total = 0;
  let count = 0;

  if(cartItems){
    cartItems.innerHTML = "";
  }

  cart.forEach((item,index)=>{

    total += item.price * item.quantity;
    count += item.quantity;

    if(cartItems){

      let li = document.createElement("li");

      li.innerHTML = `
      <div class="cart-item">

        <div class="cart-info">
          <strong>${item.name}</strong>
          <small>${item.unit}</small>
        </div>

        <div class="cart-qty">
          <button onclick="changeQty(${index},-1)">-</button>

          <input type="number"
          value="${item.quantity}"
          min="1"
          onchange="manualQty(${index},this.value)">

          <button onclick="changeQty(${index},1)">+</button>
        </div>

        <div class="cart-price">
          ₹${item.price * item.quantity}
        </div>

        <button class="remove-btn"
        onclick="removeItem(${index})">Remove</button>

      </div>
      `;

      cartItems.appendChild(li);
    }

  });

  if(totalDisplay){
    totalDisplay.textContent = "Total: ₹" + total;
  }

  if(cartCount){
    cartCount.textContent = count;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}


/* ---------------- QUANTITY CONTROLS ---------------- */

function changeQty(index,delta){

  cart[index].quantity += delta;

  if(cart[index].quantity < 1){
    cart[index].quantity = 1;
  }

  updateCartDisplay();
}


function manualQty(index,qty){

  qty = parseFloat(qty);

  if(isNaN(qty) || qty < 1){
    qty = 1;
  }

  cart[index].quantity = qty;

  updateCartDisplay();
}


/* ---------------- REMOVE ITEM ---------------- */

function removeItem(index){

  cart.splice(index,1);

  updateCartDisplay();
}


/* ---------------- CHECKOUT ---------------- */

function checkout(action){

  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  if(action === "bill"){

    let total = 0;
    let bill = "----- FarmDirect Bill -----\n\n";

    cart.forEach(item=>{

      bill += `${item.name} - ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}\n`;

      total += item.price * item.quantity;
    });

    bill += `\nTotal: ₹${total}`;

    const billOutput = document.getElementById("bill-output");

    if(billOutput){
      billOutput.textContent = bill;
    }

  }

  if(action === "payment"){

    alert("✅ Payment Successful!\nThank you for shopping with FarmDirect.");

    cart = [];

    updateCartDisplay();

    const billOutput = document.getElementById("bill-output");

    if(billOutput){
      billOutput.textContent = "";
    }

  }

}


/* ---------------- NAVBAR ACTIVE LINK ---------------- */

const navLinks = document.querySelectorAll('.nav-links a');

const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {

  if(link.getAttribute('href') === currentPage){
    link.classList.add('active');
  }

});
