// Admin Authentication System
let currentAdmin = null;

// Check admin session on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAdminSession();
});

// Check if admin is logged in
function checkAdminSession() {
    const savedAdmin = localStorage.getItem('adminUser');
    if (savedAdmin) {
        currentAdmin = JSON.parse(savedAdmin);
        updateAdminInterface();
    } else {
        // Redirect to login if not on login page
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
    }
}

// Update admin interface based on login status
function updateAdminInterface() {
    if (!currentAdmin) return;

    // Update admin name in dashboard
    const adminNameElements = document.querySelectorAll('.admin-name');
    adminNameElements.forEach(element => {
        element.textContent = `${currentAdmin.firstName} ${currentAdmin.lastName}`;
    });

    // Update admin email
    const adminEmailElements = document.querySelectorAll('.admin-email');
    adminEmailElements.forEach(element => {
        element.textContent = currentAdmin.email;
    });

    // Update last login time
    const lastLoginElements = document.querySelectorAll('.last-login');
    lastLoginElements.forEach(element => {
        if (currentAdmin.loginTime) {
            const loginTime = new Date(currentAdmin.loginTime);
            element.textContent = loginTime.toLocaleString();
        }
    });
}

// Admin login function
function adminLogin(email, password, rememberMe = false) {
    // In a real application, this would authenticate with a PHP backend
    // For demo purposes, we'll use hardcoded credentials
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'admin@gandarestaurant.ug' && password === 'admin123') {
                const adminUser = {
                    id: 1,
                    email: email,
                    firstName: 'Admin',
                    lastName: 'User',
                    role: 'admin',
                    permissions: ['dashboard', 'orders', 'menu', 'customers', 'staff', 'reports', 'settings'],
                    loginTime: new Date().toISOString()
                };
                
                // Save admin session
                localStorage.setItem('adminUser', JSON.stringify(adminUser));
                if (rememberMe) {
                    localStorage.setItem('adminRememberMe', 'true');
                }
                
                currentAdmin = adminUser;
                updateAdminInterface();
                
                resolve(adminUser);
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 1000);
    });
}

// Admin logout function
function adminLogout() {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminRememberMe');
    currentAdmin = null;
    
    showAdminToast('You have been logged out successfully', 'success');
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Get current admin
function getCurrentAdmin() {
    return currentAdmin;
}

// Check if admin is logged in
function isAdminLoggedIn() {
    return currentAdmin !== null;
}

// Check admin permissions
function hasPermission(permission) {
    if (!currentAdmin) return false;
    return currentAdmin.permissions && currentAdmin.permissions.includes(permission);
}

// Protect admin routes
function protectAdminRoute() {
    if (!isAdminLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Show admin toast notification
function showAdminToast(message, type = 'success') {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '20px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '9999';
    
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type} fade-in`;
    toast.style.minWidth = '300px';
    
    if (type === 'error') {
        toast.style.borderLeft = '4px solid #dc3545';
    } else if (type === 'warning') {
        toast.style.borderLeft = '4px solid #ffc107';
    } else {
        toast.style.borderLeft = '4px solid #28a745';
    }
    
    toast.innerHTML = `
        <div class="d-flex justify-content-between align-items-center p-3">
            <div>
                <strong>${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
                <div>${message}</div>
            </div>
            <button type="button" class="btn-close ms-2" onclick="this.parentElement.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    document.body.appendChild(toastContainer);

    // Auto remove after 4 seconds
    setTimeout(() => {
        toastContainer.remove();
    }, 4000);
}

// Format currency for admin display
function formatAdminCurrency(amount) {
    return 'UGX ' + amount.toLocaleString();
}

// Format date for admin display
function formatAdminDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Export functions for use in other admin pages
window.adminAuth = {
    login: adminLogin,
    logout: adminLogout,
    getCurrentAdmin: getCurrentAdmin,
    isLoggedIn: isAdminLoggedIn,
    hasPermission: hasPermission,
    protectRoute: protectAdminRoute,
    showToast: showAdminToast,
    formatCurrency: formatAdminCurrency,
    formatDate: formatAdminDate
};
