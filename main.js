// Main Application Logic

// Storage Keys
const STORAGE_KEYS = {
    USER_DATA: 'smartQR_userData',
    ORDERS: 'smartQR_orders',
    MENU_ITEMS: 'smartQR_menuItems',
    CUSTOMER_HISTORY: 'smartQR_customerHistory',
    FEEDBACK: 'smartQR_feedback',
    HEALTH_DATA: 'smartQR_healthData'
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateTimestamp();
    setInterval(updateTimestamp, 1000);
});

function initializeApp() {
    // Initialize local storage if empty
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CUSTOMER_HISTORY)) {
        localStorage.setItem(STORAGE_KEYS.CUSTOMER_HISTORY, JSON.stringify({}));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FEEDBACK)) {
        localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify([]));
    }
}

// Handle QR Scan Start
function startQRScan() {
    document.getElementById('qrModal').style.display = 'block';
    // Simulating QR scan - in real app, would use camera API
    setTimeout(() => {
        const tableNumber = Math.floor(Math.random() * 20) + 1;
        handleQRScanned('table-' + tableNumber);
    }, 1500);
}

// Handle QR Scanned
function handleQRScanned(qrCode) {
    const tableNumber = qrCode.replace('table-', '');
    closeModal();
    
    // Store user data
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({
        tableNumber: tableNumber,
        scanTime: new Date().toISOString()
    }));
    
    // Show health check modal
    document.getElementById('healthModal').style.display = 'block';
}

// Enter Table Number
function enterTableNumber() {
    const tableNum = document.getElementById('tableInput').value;
    if (tableNum && tableNum > 0 && tableNum < 100) {
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({
            tableNumber: tableNum,
            scanTime: new Date().toISOString()
        }));
        document.getElementById('healthModal').style.display = 'block';
    } else {
        alert('Please enter a valid table number (1-99)');
    }
}

// Submit Health Check
function submitHealthCheck() {
    const healthData = {
        allergies: document.getElementById('allergies').value,
        dietary: document.getElementById('dietary').value,
        conditions: document.getElementById('conditions').value,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEYS.HEALTH_DATA, JSON.stringify(healthData));
    closeHealthModal();
    
    // Redirect to menu
    window.location.href = 'menu.html';
}

// Close Modal
function closeModal() {
    document.getElementById('qrModal').style.display = 'none';
}

// Close Health Modal
function closeHealthModal() {
    document.getElementById('healthModal').style.display = 'none';
}

// Update Timestamp
function updateTimestamp() {
    const timestamp = document.getElementById('timestamp');
    if (timestamp) {
        const now = new Date();
        timestamp.textContent = now.toLocaleTimeString();
    }
}

// Get User Data
function getUserData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_DATA)) || {};
}

function getHealthProfile() {
    const healthData = JSON.parse(localStorage.getItem(STORAGE_KEYS.HEALTH_DATA) || '{}');
    return {
        allergies: (healthData.allergies || '').toLowerCase(),
        dietary: (healthData.dietary || 'none').toLowerCase(),
        conditions: (healthData.conditions || '').toLowerCase()
    };
}

function normalizeHealthText(text) {
    return (text || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function getBlockedReasonForItem(item) {
    if (!item) return null;

    const healthProfile = getHealthProfile();
    const combinedProfileText = normalizeHealthText(`${healthProfile.allergies} ${healthProfile.conditions} ${healthProfile.dietary}`);
    const itemText = normalizeHealthText(`${item.name} ${item.description} ${item.category} ${item.tags ? item.tags.join(' ') : ''}`);

    if (/(milk|dairy|lactose|cream|butter|paneer|cheese|ghee|yogurt|lassi|kheer|ice cream)/.test(combinedProfileText)
        && /(paneer|butter|milk|cheese|ghee|lassi|kheer|ice cream|cream)/.test(itemText)) {
        return 'This item contains dairy ingredients that are not suitable for your profile.';
    }

    if (/(nut|peanut|almond|cashew|pista|hazelnut)/.test(combinedProfileText)
        && /(kheer|nut|peanut|almond|cashew|pista|hazelnut)/.test(itemText)) {
        return 'This item may contain nuts and is unsafe for your allergy profile.';
    }

    if (/(fish|seafood|shellfish|prawn|shrimp|crab)/.test(combinedProfileText)
        && /(fish|seafood|prawn|shrimp|crab)/.test(itemText)) {
        return 'This item contains seafood and should be avoided for your health profile.';
    }

    if (/(gluten|wheat|celiac)/.test(combinedProfileText)
        && /(naan|burger|pizza|wrap|bread|wheat|gluten)/.test(itemText)) {
        return 'This item contains gluten ingredients and is not suitable for your diet.';
    }

    if (/(diabetes|diabetic|blood sugar|high sugar|sugar)/.test(combinedProfileText)
        && /(gulab jamun|kheer|ice cream|lassi|cold coffee|mojito|watermelon cooler|sweet|dessert|sugar)/.test(itemText)) {
        return 'This item is high in sugar and should be avoided for diabetic/low-sugar needs.';
    }

    if (/(heart|blood pressure|hypertension|bp|cholesterol)/.test(combinedProfileText)
        && /(butter chicken|paneer butter masala|dal makhni|paneer tikka|chicken tikka|fish amritsari|fish curry|chicken nuggets|hot dog|burger|fries|pizza|butter naan)/.test(itemText)) {
        return 'This item is high in fat/oil and is not recommended for heart health.';
    }

    if (healthProfile.dietary === 'vegetarian' && item.category !== 'vegetarian' && item.category !== 'drinks' && item.category !== 'desserts') {
        return 'This item does not match your vegetarian diet.';
    }

    if (healthProfile.dietary === 'vegan' && (
        item.category !== 'vegetarian' && item.category !== 'drinks' && item.category !== 'desserts' ||
        /(milk|dairy|butter|cream|yogurt|cheese|paneer|ghee)/.test(itemText)
    )) {
        return 'This item is not suitable for a vegan diet.';
    }

    if (healthProfile.dietary === 'glutenfree' && /(naan|burger|pizza|wrap|bread|wheat|flour)/.test(itemText)) {
        return 'This item contains gluten and is not suitable for a gluten-free diet.';
    }

    if (healthProfile.dietary === 'dairyfree' && /(milk|dairy|butter|cream|cheese|paneer|lassi|kheer|ice cream|ghee)/.test(itemText)) {
        return 'This item contains dairy ingredients and is not suitable for a dairy-free diet.';
    }

    return null;
}

function getRestrictedItemNamesForCurrentProfile() {
    return getMenuItems().filter(item => getBlockedReasonForItem(item)).map(item => item.name);
}

// Get All Orders
function getAllOrders() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
}

// Save Order
function saveOrder(order) {
    const orders = getAllOrders();
    order.id = 'ORD' + Date.now();
    order.timestamp = new Date().toISOString();
    orders.push(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return order;
}

// Update Order Status
function updateOrderStatus(orderId, status) {
    const orders = getAllOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        order.statusUpdated = new Date().toISOString();
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }
    return order;
}

// Get Customer History
function getCustomerHistory(tableNumber) {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOMER_HISTORY)) || {};
    return history[tableNumber] || [];
}

// Save Customer History
function saveCustomerHistory(tableNumber, items) {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOMER_HISTORY)) || {};
    if (!history[tableNumber]) {
        history[tableNumber] = [];
    }
    history[tableNumber].push({
        items: items,
        date: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.CUSTOMER_HISTORY, JSON.stringify(history));
}

// Save Feedback
function saveFeedback(feedback) {
    const feedbacks = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK)) || [];
    feedback.timestamp = new Date().toISOString();
    feedbacks.push(feedback);
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedbacks));
}

// Get All Feedback
function getAllFeedback() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK)) || [];
}

// Format Currency
function formatCurrency(amount) {
    return '₹' + parseFloat(amount).toFixed(2);
}

// Format Date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Close modals when clicking outside
window.onclick = function(event) {
    const qrModal = document.getElementById('qrModal');
    const healthModal = document.getElementById('healthModal');
    
    if (qrModal && event.target === qrModal) {
        qrModal.style.display = 'none';
    }
    if (healthModal && event.target === healthModal) {
        healthModal.style.display = 'none';
    }
};

// Notification System
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#51cf66' : type === 'error' ? '#ff4757' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 999;
        animation: slideInRight 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Add styles for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
