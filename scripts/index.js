
import { navbar } from "./navbar.js";
import { baseurl } from './baseUrl.js';
import { footer } from "./footer.js";

navbar();
footer();

async function loadBrands() {
    const brandContainer = document.getElementById("brand-container");
    try {
        const res = await fetch(`${baseurl}/brands`);
        let brands = await res.json();
        brands.forEach(brand => {
            const brandItem = document.createElement("div");
            brandItem.className = "brand-item";
            brandItem.innerHTML = `
                <img src="${brand.image}" alt="${brand.name}">
                <p>${brand.name}</p>
            `;
            brandContainer.appendChild(brandItem);
        });
    } catch(error){
        console.log("Error in loading brands,..", error);
        alert("Error in loading Brands");
    }
}

async function loadCategories() {
    const categoryContainer = document.getElementById("category-container");
    try{
        const res = await fetch(`${baseurl}/categories`);
        let categories = await res.json();
        categories.forEach(category => {
            const categoryItem = document.createElement("div");
            categoryItem.className = "category-item";
            categoryItem.innerHTML = `
                <h3>${category.name}</h3>
                <p>${category.description}</p>
            `;
            categoryContainer.appendChild(categoryItem);
        });
    } catch(error){
        console.log("Error in loading Category..", error);
        alert("Error in loading Categories..");
    }
}

// Function to Load Deals
async function loadDeals() {
    const dealsContainer = document.getElementById("deals-container");
    try{
        const res = await fetch(`${baseurl}/deals`);
        let deals = await res.json();
        deals.forEach(deal => {
            const dealCard = document.createElement("div");
            dealCard.className = "deal-card";
            dealCard.innerHTML = `
                <img src="${deal.image}" alt="${deal.name}">
                <p class="deal-title">${deal.name}</p>
                <p class="deal-mrp">MRP ₹${deal.mrp.toFixed(2)}</p>
                <p class="deal-price">₹${deal.price.toFixed(2)}</p>
                <p class="deal-discount">(${deal.discount}% OFF)</p>
            `;
            dealsContainer.appendChild(dealCard);
        });
    } catch(error){
        console.log("Error in loading Category..", error);
        alert("Error in loading Categories..");
    }
}

// Swipe Functionality
function enableSwipe() {
    const dealsContainer = document.getElementById("deals-container");
    let isDown = false;
    let startX, scrollLeft;

    dealsContainer.addEventListener("mousedown", (e) => {
        isDown = true;
        dealsContainer.classList.add("active");
        startX = e.pageX - dealsContainer.offsetLeft;
        scrollLeft = dealsContainer.scrollLeft;
    });

    dealsContainer.addEventListener("mouseleave", () => {
        isDown = false;
        dealsContainer.classList.remove("active");
    });

    dealsContainer.addEventListener("mouseup", () => {
        isDown = false;
        dealsContainer.classList.remove("active");
    });

    dealsContainer.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - dealsContainer.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll sensitivity
        dealsContainer.scrollLeft = scrollLeft - walk;
    });
}

// Countdown Timer
function startCountdown(duration) {
    const timerElement = document.getElementById("timer");
    let time = duration;

    setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} MINS LEFT, HURRY!`;
        time--;

        if (time < 0) {
            timerElement.textContent = "Deal Expired!";
        }
    }, 1000);
}

// load articles
async function loadArticles() {
    const articlesList = document.getElementById('articlesList');
    try{
        const res = await fetch(`${baseurl}/articles`);
        let articles = await res.json();
        articles.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.className = 'article';
            articleDiv.innerHTML = `
                <img src="${article.image}" alt="${article.title}">
                <h3>${article.title}</h3>
                <p>${article.content}</p>
                <button onclick="alert('Read more about ${article.title}')">Read More</button>
            `;
            articlesList.appendChild(articleDiv);
        });
    } catch(error){
        console.log("Error in loading Category..", error);
        alert("Error in loading Categories..");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadBrands();
    loadCategories();
    loadDeals();
    enableSwipe();
    startCountdown(20 * 60); 
    loadArticles();
});