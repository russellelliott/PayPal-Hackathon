//goes into localStorage and gets the total price of the items from the cart.
function getRandomAmount() {
  let cart = []
  if (typeof localStorage !== 'undefined') {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);
  }else{
    console.log("uhoh")
  }
  //let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalPrice = 0;
  cart.forEach(item => {
    totalPrice += item.price * item.quantity
  });

  return totalPrice.toFixed(2);

  // cart.forEach(item => {
  //   const itemDiv = document.createElement("div");
  //   itemDiv.innerHTML = `
  //       <p>${item.name} - Quantity: ${item.quantity}</p>
  //       <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
  //       <button onclick="removeFromCart(${item.id})">Remove</button>
  //   `;
  //   cartItemsContainer.appendChild(itemDiv);
  //   total += item.price * item.quantity; // Add to total
  // });

  //const randomNumber = (Math.random() * (200 - 10)) + 10;
  
  //return randomNumber.toFixed(2);
}

module.exports = {
  getRandomAmount
};