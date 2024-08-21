//goes into localStorage and gets the total price of the items from the cart.
async function getRandomAmount() {
  try {
    const response = await fetch('http://localhost:3010/api/v0/items/cart'); // Adjust the URL as needed
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.total.toFixed(2);
} catch (error) {
    console.error('Error fetching total amount:', error);
    return '0.00'; // Return a default value in case of error
}
}

module.exports = {
  getRandomAmount
};