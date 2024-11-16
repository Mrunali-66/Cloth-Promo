const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 129.99,
        category: "shirts",
        imageClass: "product-1"
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        price: 159.99,
        category: "pants",
        imageClass: "product-2"
    },
    {
        id: 3,
        name: "Floral Summer Dress",
        price: 679.99,
        category: "dresses",
        imageClass: "product-3"
    },
    {
        id: 4,
        name: "Denim Jacket",
        price: 889.99,
        category: "shirts",
        imageClass: "product-4"
    },
    {
        id: 5,
        name: "Cargo Pants",
        price: 549.99,
        category: "pants",
        imageClass: "product-5"
    },
    {
        id: 6,
        name: "Evening Gown",
        price: 2500.99,
        category: "dresses",
        imageClass: "product-6"
    }
];

let cart = [];

function displayProducts(productsToShow = products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;

    let filtered = products;

    if (categoryFilter !== 'all') {
        filtered = filtered.filter(product => product.category === categoryFilter);
    }

    if (priceFilter !== 'all') {
        const [min, max] = priceFilter.split('-').map(Number);
        filtered = filtered.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }

    displayProducts(filtered);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <span class="remove-item" onclick="removeFromCart(${item.id})">❌</span>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'none' ? 'block' : 'none';
}

// Initial display
displayProducts();