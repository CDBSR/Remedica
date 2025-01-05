
import { footer } from "./footer.js";
import {navbar} from "./navbar.js";
import { baseurl } from './baseUrl.js';

navbar();
footer();

   // Sample JSON data for medicines

// Function to display medicines on the page
async function displayMedicines() {
    const medicineList = document.getElementById('medicine-list');
    
    try{
        const res = await fetch(`${baseurl}/medicines`);
        let medicines = await res.json();
        medicines.forEach(medicine => {
            const medicineItem = document.createElement('div');
            medicineItem.classList.add('medicine-item');
    
            medicineItem.innerHTML = `
                <img src="${medicine.image}" alt="${medicine.name}" style="width:100%; border-radius:10px; margin-bottom:10px;">
                <h3>${medicine.name}</h3>
                <p>${medicine.description}</p>
                <p class="price">Price: ${medicine.price}</p>
                <button onclick="addToCart('${medicine.name}')">Add to Cart</button>
            `;

            medicineList.appendChild(medicineItem);
        });
    } catch(err){
        console.log("Error in displaying medicines..", err);
        alert("Error in displaying medicines..")
    }
}

// Function to handle adding items to the cart
function addToCart(medicineName) {
    const cartMessage = document.getElementById('cart-message');
    cartMessage.innerText = `${medicineName} has been added to your cart!`;
    cartMessage.style.display = 'block';
    setTimeout(() => {
        cartMessage.style.display = 'none';
    }, 3000);
}


// Initialize empty cart array
let cart = [];

// Function to display the cart
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous cart items

    cart.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.innerHTML = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                                 <button onclick="removeFromCart('${item.id}')">Remove</button>`;
        cartItemsContainer.appendChild(itemElement);
    });
}

// Function to remove an item from the cart
function removeFromCart(id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1); // Remove item from cart
    }
    displayCart(); // Re-render cart
}

// Function to handle checkout (simple alert for now)
document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        alert(`Proceeding to checkout. Total: $${total.toFixed(2)}`);
        cart = []; // Clear the cart after checkout
        displayCart(); // Re-render empty cart
    }
});

// Load medicines when the page loads
document.addEventListener('DOMContentLoaded', displayMedicines);