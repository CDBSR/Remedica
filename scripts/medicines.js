
// import { navbar } from "./navbar.js";
// import { baseurl } from './baseUrl.js';
// import { footer } from "./footer.js";

// navbar();
// // footer();


// const products = [
//     {
//         id: 1,
//         name: "Paracetamol 500mg",
//         price: 5.99,
//         description: "Pain relief medication",
//         category: "pain-relief",
//         stock: 50
//     },
//     {
//         id: 2,
//         name: "Vitamin C 1000mg",
//         price: 12.99,
//         description: "Immune system support",
//         category: "vitamins",
//         stock: 100
//     },
//     {
//         id: 3,
//         name: "First Aid Kit",
//         price: 24.99,
//         description: "Basic medical supplies",
//         category: "first-aid",
//         stock: 30
//     },
//     {
//         id: 4,
//         name: "Digital Thermometer",
//         price: 15.99,
//         description: "Accurate temperature measurement",
//         category: "equipment",
//         stock: 45
//     },
//     {
//         id: 5,
//         name: "Bandages Pack",
//         price: 8.99,
//         description: "Assorted sizes",
//         category: "first-aid",
//         stock: 150
//     },
//     {
//         id: 6,
//         name: "Cough Syrup",
//         price: 9.99,
//         description: "For dry and wet cough",
//         category: "pain-relief",
//         stock: 80
//     }
// ];

// // State management
// let cart = [];
// let currentUser = null;
// let users = [];

// // Authentication functions
// function showLoginModal() {
//     document.getElementById('login-modal').style.display = 'block';
// }

// function closeLoginModal() {
//     document.getElementById('login-modal').style.display = 'none';
// }

// function showSignupModal() {
//     document.getElementById('signup-modal').style.display = 'none';
// }

// function closeSignupModal() {
//     document.getElementById('signup-modal').style.display = 'none';
// }

// function handleLogin(event) {
//     event.preventDefault();
//     const email = document.getElementById('login-email').value;
//     const password = document.getElementById('login-password').value;

//     const user = users.find(u => u.email === email && u.password === password);
//     if (user) {
//         currentUser = user;
//         updateAuthUI();
//         closeLoginModal();
//         showToast('Successfully logged in!', 'success');
//     } else {
//         showToast('Invalid email or password', 'error');
//     }
// }

// function handleSignup(event) {
//     event.preventDefault();
//     const name = document.getElementById('signup-name').value;
//     const email = document.getElementById('signup-email').value;
//     const password = document.getElementById('signup-password').value;

//     if (users.some(u => u.email === email)) {
//         showToast('Email already exists', 'error');
//         return;
//     }

//     const newUser = { name, email, password };
//     users.push(newUser);
//     currentUser = newUser;
//     updateAuthUI();
//     closeSignupModal();
//     showToast('Account created successfully!', 'success');
// }

// function updateAuthUI() {
//     const authSection = document.getElementById('auth-section');
//     const cartButton = document.getElementById('cart-button');

//     if (currentUser) {
//         authSection.innerHTML = `
//             <span>Welcome, ${currentUser.name}</span>`;
//         }


const products = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        price: 5.99,
        description: "Pain relief medication"
    },
    {
        id: 2,
        name: "Vitamin C 1000mg",
        price: 12.99,
        description: "Immune system support"
    },
    {
        id: 3,
        name: "First Aid Kit",
        price: 24.99,
        description: "Basic medical supplies"
    },
    {
        id: 4,
        name: "Digital Thermometer",
        price: 15.99,
        description: "Accurate temperature measurement"
    },
    {
        id: 5,
        name: "Bandages Pack",
        price: 8.99,
        description: "Assorted sizes"
    },
    {
        id: 6,
        name: "Cough Syrup",
        price: 9.99,
        description: "For dry and wet cough"
    }
];

let cart = [];

        // Display products
        function displayProducts(products) {
            const container = document.getElementById('products-container');
            container.innerHTML = '';
            
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product-card';
                productElement.innerHTML = `
                    <div class="product-image">Medicine Image</div>
                    <h3 class="product-title">${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="product-price">$${product.price}</p>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                container.appendChild(productElement);
            });
        }

        // Search functionality
        document.getElementById('search-input').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        });

        // Cart functions
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
                alert('Add to Cart successfully...')
            } else {
                cart.push({...product, quantity: 1});
                alert('Add to Cart successfully...')
            }
            
            updateCartCount();
        }

        function updateCartCount() {
            const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cart-count').textContent = cartCount;
        }

        function toggleCart() {
            const modal = document.getElementById('cart-modal');
            modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
            updateCartDisplay();
        }

        function updateCartDisplay() {
            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');
            
            cartItems.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <div>
                        <h3>${item.name}</h3>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <div>$${itemTotal.toFixed(2)}</div>
                `;
                cartItems.appendChild(itemElement);
            });

            cartTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Thank you for your purchase!');
            cart = [];
            updateCartCount();
            toggleCart();
        }

        // Initial display
        displayProducts(products);