// Global variables
let cart = [];
let menuItems = [];
let currentUser = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadMenuItems();
    updateCartCount();
    loadPopularItems();
    checkUserSession();
});

// Load menu items from database
async function loadMenuItems() {
    try {
        // In a real application, this would fetch from a PHP backend
        // For demo purposes, we'll use mock data
        menuItems = [
            {
                id: 1,
                name: "Ugandan Rolex",
                category: "Main Course",
                price: 8000,
                description: "Delicious chapati with eggs and vegetables",
                image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3"
            },
            {
                id: 2,
                name: "Matooke with Beef",
                category: "Main Course",
                price: 15000,
                description: "Steamed plantains served with beef stew",
                image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3"
            },
            {
                id: 3,
                name: "Chicken Luwombo",
                category: "Main Course",
                price: 18000,
                description: "Traditional chicken stew steamed in banana leaves",
                image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3"
            },
            {
                id: 4,
                name: "Posho and Beans",
                category: "Main Course",
                price: 7000,
                description: "Ugandan staple food with beans",
                image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3"
            },
            {
                id: 5,
                name: "Fresh Fruit Juice",
                category: "Beverages",
                price: 3000,
                description: "Freshly squeezed tropical fruit juice",
                image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3"
            },
            {
                id: 6,
                name: "Soda",
                category: "Beverages",
                price: 2000,
                description: "Various soft drinks available",
                image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3"
            }
        ];
    } catch (error) {
        console.error('Error loading menu items:', error);
    }
}

// Load popular items on homepage
function loadPopularItems() {
    const popularItemsContainer = document.getElementById('popular-items');
    if (!popularItemsContainer) return;

    const popularItems = menuItems.slice(0, 3);
    popularItemsContainer.innerHTML = popularItems.map(item => `
        <div class="col-md-4 mb-4">
            <div class="food-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="food-item-body">
                    <h5>${item.name}</h5>
                    <p class="text-muted">${item.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="food-price">UGX ${item.price.toLocaleString()}</span>
                        <button class="btn btn-primary btn-sm" onclick="addToCart(${item.id})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(m => m.id === itemId);
    if (!item) return;

    const existingItem = cart.find(c => c.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCartCount();
    saveCartToLocalStorage();
    showToast(`${item.name} added to cart!`, 'success');
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    saveCartToLocalStorage();
    updateCartDisplay();
    showToast('Item removed from cart', 'warning');
}

// Update item quantity
function updateQuantity(itemId, change) {
    const item = cart.find(c => c.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartCount();
            saveCartToLocalStorage();
            updateCartDisplay();
        }
    }
}

// Update cart count display
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

// Calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('gandaCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('gandaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h4>Your cart is empty</h4>
                <p>Add some delicious items to get started!</p>
                <a href="menu.html" class="btn btn-primary">Browse Menu</a>
            </div>
        `;
        if (cartTotalElement) {
            cartTotalElement.textContent = 'UGX 0';
        }
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid">
                </div>
                <div class="col-md-4">
                    <h5>${item.name}</h5>
                    <p class="text-muted mb-0">${item.description}</p>
                </div>
                <div class="col-md-3">
                    <div class="quantity-control">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <strong>UGX ${(item.price * item.quantity).toLocaleString()}</strong>
                </div>
                <div class="col-md-1">
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    if (cartTotalElement) {
        cartTotalElement.textContent = `UGX ${calculateCartTotal().toLocaleString()}`;
    }
}

// Search functionality
function searchFood() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    if (searchTerm.trim() === '') return;

    const filteredItems = menuItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );

    // Redirect to menu page with search results
    localStorage.setItem('searchResults', JSON.stringify(filteredItems));
    window.location.href = 'menu.html';
}

// Show toast notification
function showToast(message, type = 'success') {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type} fade-in`;
    toast.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <strong>${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
                <div>${message}</div>
            </div>
            <button type="button" class="btn-close ms-2" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    document.body.appendChild(toastContainer);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toastContainer.remove();
    }, 3000);
}

// Check user session
function checkUserSession() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInterface();
    }
}

// Update user interface based on login status
function updateUserInterface() {
    const loginLink = document.querySelector('a[href="login.html"]');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (currentUser && loginLink) {
        // Replace login link with user dropdown
        const dropdownHTML = `
            <div class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                    <i class="fas fa-user me-2"></i>${currentUser.firstName}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="profile.html"><i class="fas fa-user me-2"></i>My Profile</a></li>
                    <li><a class="dropdown-item" href="orders.html"><i class="fas fa-shopping-bag me-2"></i>My Orders</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                </ul>
            </div>
        `;
        
        loginLink.parentElement.innerHTML = dropdownHTML;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    currentUser = null;
    showToast('You have been logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Check if user is logged in
function isLoggedIn() {
    return currentUser !== null;
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return isValid;
}

// Place order
async function placeOrder() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }

    if (!validateForm('checkout-form')) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    const orderData = {
        items: cart,
        customer: {
            name: document.getElementById('customer-name').value,
            phone: document.getElementById('customer-phone').value,
            email: document.getElementById('customer-email').value,
            address: document.getElementById('customer-address').value
        },
        total: calculateCartTotal(),
        orderDate: new Date().toISOString(),
        status: 'pending'
    };

    try {
        // In a real application, this would send to a PHP backend
        console.log('Order placed:', orderData);
        
        // Clear cart
        cart = [];
        saveCartToLocalStorage();
        updateCartCount();
        
        // Show success message
        showToast('Order placed successfully! We will contact you soon.', 'success');
        
        // Redirect to order confirmation
        setTimeout(() => {
            window.location.href = 'order-confirmation.html';
        }, 2000);
        
    } catch (error) {
        console.error('Error placing order:', error);
        showToast('Failed to place order. Please try again.', 'error');
    }
}

// Load cart on page load
loadCartFromLocalStorage();

// Update cart display if on cart page
if (window.location.pathname.includes('cart.html')) {
    updateCartDisplay();
}
