
import { footer } from "./footer.js";
import {navbar} from "./navbar.js";
import { baseurl } from './baseUrl.js';


navbar();
footer();


async function getMedicines(){
    try{
        let res = await fetch(`${baseurl}/medicines`);
        let data = await res.json();
        return data;
    } catch(error){
        console.log('Something went wrong in getting medicines', error);
        alert('Something went wrong in getting medicines');
    }
}


window.toggleCart = toggleCart;
window.checkout = checkout;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;

// Store cart data in localStorage to persist between page refreshes
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
// Function to display medicines
function displayMedicines(medicines) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = ''; // Clear existing content

    medicines.forEach(medicine => {
        // Create main product card div
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Create product image div
        const productImage = document.createElement('div');
        productImage.className = 'product-image';
        const img = document.createElement('img');
        img.src = medicine.image;
        productImage.append(img);
        

        // Create product title
        const productTitle = document.createElement('h3');
        productTitle.className = 'product-title';
        productTitle.textContent = medicine.name;

        // Create product description
        const productDesc = document.createElement('p');
        productDesc.textContent = medicine.description;

        // Create product price
        const productPrice = document.createElement('p');
        productPrice.className = 'product-price';
        productPrice.textContent = `$${medicine.price.toFixed(2)}`;

        // Create add to cart button
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'add-to-cart';
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.onclick = () => addToCart(medicine);

        // Append all elements to product card
        productCard.appendChild(productImage);
        productCard.appendChild(productTitle);
        productCard.appendChild(productDesc);
        productCard.appendChild(productPrice);
        productCard.appendChild(addToCartBtn);

        // Append product card to container
        productsContainer.appendChild(productCard);
    });
}

// Function to toggle cart modal
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
        if (modal.style.display === 'block') {
            updateCartDisplay();
        }
    }
}

// Function to add item to cart
async function addToCart(medicine) {

    try{
        const res = await fetch(`${baseurl}/medicines`);
        let med = await res.json();

        const product = med.find(p => p.id === medicine.id);
        const existingItem = cart.find(item => item.id === medicine.id);
    
        if (existingItem) {
            if (existingItem.quantity < medicine.stock) {
                existingItem.quantity += 1;
                showToast('Item quantity increased in cart!', 'success');
            } else {
                showToast('Maximum stock limit reached!', 'error');
                return;
            }
        } else {
            cart.push({...product, quantity:1});
            showToast('Item added to cart!', 'success');
        }
        
        saveCart();
        updateCartCount();
        updateCartDisplay();
    } catch(error){
        console.log('Error in adding cart..', error);
        showToast('Something went wrong in adding cart', 'error');
    }
   
}

// Function to remove item from cart
function removeFromCart(medicineId) {
    cart = cart.filter(item => item.id !== medicineId);
    saveCart();
    updateCartCount();
    updateCartDisplay();
    showToast('Item removed from cart!', 'success');
}

// Function to update item quantity in cart
async function updateQuantity(medicineId, change) {
    try{
        const res = await fetch(`${baseurl}/medicines`);
        let med = await res.json();

        const item = cart.find(item => item.id === medicineId);
        const medicine = med.find(m => m.id === medicineId);
    
    if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0 && newQuantity <= medicine.stock) {
            item.quantity = newQuantity;
            saveCart();
            updateCartCount();
            updateCartDisplay();
            showToast('Cart updated!', 'success');
        } else if (newQuantity <= 0) {
            removeFromCart(medicineId);
        } else {
            showToast('Maximum stock limit reached!', 'error');
        }
    }
    } catch(error){
        console.log('Error in updating cart..', error);
        showToast('Something went wrong in updating cart!', 'error');
    }
}

// Function to update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Function to update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) return;
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        const itemInfo = document.createElement('div');
        itemInfo.innerHTML = `
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
        `;

        const itemControls = document.createElement('div');
        itemControls.className = 'cart-item-controls';

        // Decrease quantity button
        const decreaseBtn = document.createElement('button');
        decreaseBtn.className = 'quantity-btn';
        decreaseBtn.textContent = '-';
        decreaseBtn.onclick = () => updateQuantity(item.id, -1);

        // Increase quantity button
        const increaseBtn = document.createElement('button');
        increaseBtn.className = 'quantity-btn';
        increaseBtn.textContent = '+';
        increaseBtn.onclick = () => updateQuantity(item.id, 1);

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = '×';
        removeBtn.onclick = () => removeFromCart(item.id);

        itemControls.appendChild(decreaseBtn);
        itemControls.appendChild(increaseBtn);
        itemControls.appendChild(removeBtn);

        cartItem.appendChild(itemInfo);
        cartItem.appendChild(itemControls);
        cartItems.appendChild(cartItem);
    });

    cartTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cart = [];
    saveCart();
    updateCartCount();
    updateCartDisplay();
    
    showToast(`Checkout successful! Total paid: $${total.toFixed(2)}`, 'success');
    toggleCart(); // Close cart modal
}

// Function to show toast messages
function showToast(message, type) {
    // Remove any existing toasts
    const existingToasts = document.getElementsByClassName('toast');
    Array.from(existingToasts).forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 2000);
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', async function() {
    let arr = await getMedicines();
    displayMedicines(arr);
    updateCartCount();
    // Set initial display style for cart modal
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.style.display = 'none';
    }

    const categorySelect = document.getElementById('category');
    const nameSortSelect = document.getElementById('nameSort');
    const priceSortSelect = document.getElementById('priceSort');

    categorySelect.addEventListener('change', updateGallery);
    nameSortSelect.addEventListener('change', updateGallery);
    priceSortSelect.addEventListener('change', updateGallery);

     // Initialize gallery on page load
    window.onload = updateGallery; // This ensures data is visible when the page loads
});

async function updateGallery() {
    try{
        const category = document.getElementById('category').value;
        const nameSort = document.getElementById('nameSort').value;
        const priceSort = document.getElementById('priceSort').value;

        let res = await fetch(`${baseurl}/medicines`);
        let products = await res.json();

        let filteredProducts = [...products];

        filteredProducts = products.filter(product => {
            return (
                (category === 'all' || product.category === category)
            );
        });

        // Sorting logic for name
        if (nameSort === 'name-asc') {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (nameSort === 'name-desc') {
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        }

        // Sorting logic for price
        if (priceSort === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (priceSort === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        displayMedicines(filteredProducts);
    } catch(error){
        console.log('Error in sorting & filtering..', error);
        showToast('Error in sorting & filtering!', 'error');
    }

}

// Search functionality
document.getElementById('search-input').addEventListener('input', async (e) => {
    try{
        let res = await fetch(`${baseurl}/medicines`);
        let products = await res.json();

        let filteredProducts = [...products];

        const searchTerm = e.target.value.toLowerCase();
        filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    displayMedicines(filteredProducts);
    } catch(err){
        console.log('Error in Searching medicine..', err);
        showToast('Error in Searching medicine', 'error');
    }
});
