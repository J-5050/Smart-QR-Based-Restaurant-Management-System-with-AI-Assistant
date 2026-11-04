// Menu Page Functionality

let cart = [];
let currentFilter = 'all';
let currentSort = 'popularity';

// Initialize menu page
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadRecommendations();
    loadFastFoodGrid();
    loadColdDrinksGrid();
    loadCombos();
    loadFeaturedFoods();
    loadActiveTable();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
}

// Load Menu
function loadMenu() {
    const items = getMenuItems();
    displayMenuItems(items);
}

// Display Menu Items
function displayMenuItems(items) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    items.forEach(item => {
        const itemElement = createMenuItemElement(item);
        menuGrid.appendChild(itemElement);
    });
}

function getItemImage(item) {
    if (item.image) return item.image;

    const nameImageMap = {
        'Paneer Tikka': 'https://images.unsplash.com/photo-1600628425468-721a3fa17776?auto=format&fit=crop&w=900&q=80',
        'Samosa': 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        'Chikhalwali': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80',
        'Chicken Tikka': 'https://images.unsplash.com/photo-1597309547878-095e6ebf57cd?auto=format&fit=crop&w=900&q=80',
        'Fish Amritsari': 'https://images.unsplash.com/photo-1565895405135-d8743d70264b?auto=format&fit=crop&w=900&q=80',
        'Paneer Butter Masala': 'https://images.unsplash.com/photo-1604908176720-1e8c06a46366?auto=format&fit=crop&w=900&q=80',
        'Dal Makhni': 'https://images.unsplash.com/photo-1617196034115-4d82fd5b8c63?auto=format&fit=crop&w=900&q=80',
        'Vegetable Biryani': 'https://images.unsplash.com/photo-1604908177521-3a2c5d7d214c?auto=format&fit=crop&w=900&q=80',
        'Butter Chicken': 'https://images.unsplash.com/photo-1604908176862-f7e3f054f3ac?auto=format&fit=crop&w=900&q=80',
        'Chicken Biryani': 'https://images.unsplash.com/photo-1598515210247-0562aa51d3bd?auto=format&fit=crop&w=900&q=80',
        'Fish Curry': 'https://images.unsplash.com/photo-1600628425301-7d2e2994898f?auto=format&fit=crop&w=900&q=80',
        'Butter Naan': 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=80',
        'Garlic Naan': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
        'Mango Lassi': 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=900&q=80',
        'Cold Coffee': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
        'Fresh Lemonade': 'https://images.unsplash.com/photo-1566740933439-389caf5b1f3f?auto=format&fit=crop&w=900&q=80',
        'Gulab Jamun': 'https://images.unsplash.com/photo-1608032565538-bc8d316dbb45?auto=format&fit=crop&w=900&q=80',
        'Kheer': 'https://images.unsplash.com/photo-1628103213767-2b59eddddba5?auto=format&fit=crop&w=900&q=80',
        'Ice Cream Sundae': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
        'Classic Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
        'Crispy French Fries': 'https://images.unsplash.com/photo-1576107232684-2b7d4d4ef16b?auto=format&fit=crop&w=900&q=80',
        'Chicken Burger': 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
        'Iced Tea': 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=900&q=80',
        'Mint Mojito': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
        'Watermelon Cooler': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
        'Veg Cheese Pizza': 'https://images.unsplash.com/photo-1548365328-9f6e2c5b2d07?auto=format&fit=crop&w=900&q=80',
        'Chicken Nuggets': 'https://images.unsplash.com/photo-1571091718767-18b5b9a6c7b1?auto=format&fit=crop&w=900&q=80',
        'Veg Wrap': 'https://images.unsplash.com/photo-1604908177522-1c1f9b19d6b5?auto=format&fit=crop&w=900&q=80',
        'Hot Dog': 'https://images.unsplash.com/photo-1541542684-9f99b0b6a1f8?auto=format&fit=crop&w=900&q=80'
    };

    if (nameImageMap[item.name]) {
        return nameImageMap[item.name];
    }

    const fallbackImages = {
        vegetarian: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
        nonveg: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        drinks: 'https://images.unsplash.com/photo-1526424382096-74b8f38c0b0e?auto=format&fit=crop&w=900&q=80',
        desserts: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
        default: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80'
    };

    return fallbackImages[item.category] || fallbackImages.default;
}

// Create Menu Item Element
function createMenuItemElement(item) {
    const div = document.createElement('div');
    const blockedReason = getBlockedReasonForItem(item);
    div.className = `menu-item ${blockedReason ? 'menu-item-restricted' : ''}`;
    div.innerHTML = `
        <div class="menu-item-image">
            <img src="${getItemImage(item)}" alt="${item.name}" class="menu-item-image-media">
            ${item.popularity > 90 ? '<div class="item-badge">⭐ Popular</div>' : ''}
            ${blockedReason ? '<div class="health-warning">⚠️ Not suitable</div>' : ''}
        </div>
        <div class="menu-item-content">
            <div class="menu-item-row">
                <h4 class="menu-item-name">${item.name}</h4>
                <span class="menu-item-price">₹${item.price}</span>
            </div>
            <p class="menu-item-description">${item.description}</p>
            <div class="menu-item-rating">
                ${'⭐'.repeat(Math.floor(item.rating))} ${item.rating}
            </div>
            ${blockedReason ? `<div class="restriction-note">${blockedReason}</div>` : ''}
            <div class="menu-item-tags">
                ${item.tags.map(tag => `<span class="menu-tag">${tag}</span>`).join('')}
            </div>
            <button class="order-now-btn ${blockedReason ? 'order-now-btn-disabled' : ''}" ${blockedReason ? 'disabled' : ''} onclick="${blockedReason ? 'return false;' : `addToCart(${item.id}, 1)`}">
                <i class="fas ${blockedReason ? 'fa-ban' : 'fa-shopping-cart'}"></i> ${blockedReason ? 'Not Suitable' : 'Order Now'}
            </button>
        </div>
    `;
    return div;
}

// Increase Quantity
function increaseQty(itemId) {
    const input = document.getElementById(`qty-${itemId}`);
    input.value = parseInt(input.value) + 1;
}

// Decrease Quantity
function decreaseQty(itemId) {
    const input = document.getElementById(`qty-${itemId}`);
    if (parseInt(input.value) > 0) {
        input.value = parseInt(input.value) - 1;
    }
}

// Add to Cart
function addToCart(itemId, qty = null) {
    const qtyInput = document.getElementById(`qty-${itemId}`);
    const parsedQty = qty !== null ? qty : (qtyInput ? parseInt(qtyInput.value) : 1);

    if (parsedQty <= 0) {
        showNotification('Please select quantity', 'error');
        return;
    }

    const item = getMenuItemById(itemId);
    const blockedReason = getBlockedReasonForItem(item);

    if (blockedReason) {
        showNotification(`${item.name} is not suitable for your health profile: ${blockedReason}`, 'error');
        return;
    }

    const existingItem = cart.find(c => c.id === itemId);

    if (existingItem) {
        existingItem.quantity += parsedQty;
    } else {
        cart.push({ ...item, quantity: parsedQty, done: false });
    }

    if (qtyInput) {
        qtyInput.value = 0;
    }

    updateCart();
    openCart();
    showNotification(`${item.name} added to cart!`, 'success');
}

// Update Cart Display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999;">Your cart is empty</p>';
        cartCount.textContent = '0';
        return;
    }
    
    cartCount.textContent = cart.length;
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item ${item.done ? 'cart-item-done' : ''}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button class="done-btn" ${item.done ? 'disabled' : ''} onclick="markItemDone(${item.id})">
                    ${item.done ? 'Done' : 'Done'}
                </button>
                <span class="cart-item-total">₹${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

function markItemDone(itemId) {
    const item = cart.find(c => c.id === itemId);
    if (!item) return;

    item.done = true;
    updateCart();
    showNotification(`${item.name} marked done`, 'success');
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
    showNotification('Item removed from cart', 'info');
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('tax').textContent = formatCurrency(tax);
    document.getElementById('total').textContent = formatCurrency(total);
}

// Open Cart Sidebar
function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (!cartSidebar.classList.contains('open')) {
        cartSidebar.classList.add('open');
    }
}

// Toggle Cart Sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
}

// Filter Menu
function filterMenu(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    let items;
    if (document.getElementById('searchInput').value) {
        items = searchMenuItems(document.getElementById('searchInput').value);
    } else {
        items = getItemsByCategory(category);
    }
    
    displayMenuItems(items);
}

// Handle Search
function handleSearch(e) {
    const query = e.target.value;
    const items = query ? searchMenuItems(query) : getItemsByCategory(currentFilter);
    displayMenuItems(items);
}

// Sort Menu
function sortMenu() {
    currentSort = document.getElementById('sortBy').value;
    let items = cart.length > 0 ? getMenuItems() : getMenuItems();
    
    items = getItemsByCategory(currentFilter);
    
    switch(currentSort) {
        case 'price-low':
            items.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            items.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            items.sort((a, b) => b.rating - a.rating);
            break;
        case 'popularity':
        default:
            items.sort((a, b) => b.popularity - a.popularity);
    }
    
    displayMenuItems(items);
}

// Load Recommendations
function loadRecommendations() {
    const userData = getUserData();
    const tableNumber = userData.tableNumber;
    
    const recommendations = getAIRecommendations(tableNumber);
    const recommendationsGrid = document.getElementById('recommendationsGrid');
    
    if (recommendations.length > 0) {
        recommendationsGrid.innerHTML = recommendations.map(item => createMenuItemElement(item)).map(el => el.outerHTML).join('');
    } else {
        recommendationsGrid.innerHTML = '<p class="empty-message">No safe recommendations match your health profile right now.</p>';
    }
}

// Load Combos
function loadCombos() {
    const combos = getSmartCombos();
    const combosGrid = document.getElementById('combosGrid');
    
    combosGrid.innerHTML = combos.map(combo => `
        <div class="combo-card">
            <div class="combo-title">${combo.emoji} ${combo.name}</div>
            <ul class="combo-items">
                ${combo.items.map(item => `<li><span>${item}</span></li>`).join('')}
            </ul>
            <div class="combo-price">
                <span>₹${combo.comboPrice}</span>
                <span class="combo-discount">${combo.discount}% OFF</span>
            </div>
            <button class="combo-btn" onclick="addComboToCart(${combo.id})">
                <i class="fas fa-star"></i> Add Combo to Cart
            </button>
        </div>
    `).join('');
}

function loadFeaturedFoods() {
    const featuredFoodsGrid = document.getElementById('featuredFoodsGrid');
    const topItems = getMenuItems()
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 3);
    const mostSelectedId = getMostSelectedItemId();

    featuredFoodsGrid.innerHTML = topItems.map(item => `
        <div class="featured-card ${item.id === mostSelectedId ? 'selected-most' : ''}">
            <div class="featured-card-media">
                <img src="${getItemImage(item)}" alt="${item.name}">
                <div class="featured-badge"><i class="fas fa-star"></i> Highly selected</div>
            </div>
            <div class="featured-card-body">
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                <div class="featured-card-actions">
                    <span class="featured-price">₹${item.price}</span>
                    <button class="order-now-btn" onclick="addToCart(${item.id}, 1)">Order Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

function getMostSelectedItemId() {
    const savedHistory = JSON.parse(localStorage.getItem('smartQR_customerHistory') || '{}');
    let counts = {};
    Object.values(savedHistory).flat().forEach(entry => {
        entry.items.forEach(item => {
            counts[item.id] = (counts[item.id] || 0) + item.quantity;
        });
    });

    let maxCount = 0;
    let popularId = null;
    Object.entries(counts).forEach(([id, count]) => {
        if (count > maxCount) {
            maxCount = count;
            popularId = parseInt(id, 10);
        }
    });

    return popularId;
}

function loadActiveTable() {
    const userData = getUserData();
    const activeTableDisplay = document.getElementById('activeTableDisplay');
    if (activeTableDisplay) {
        activeTableDisplay.textContent = userData.tableNumber || '0';
    }
}

function selectTable() {
    const tableSelect = document.getElementById('tableSelect');
    const tableNumber = parseInt(tableSelect.value, 10);
    if (!tableNumber || tableNumber < 1 || tableNumber > 99) {
        alert('Please enter a valid table number between 1 and 99.');
        return;
    }

    localStorage.setItem('smartQR_userData', JSON.stringify({
        tableNumber: tableNumber,
        scanTime: new Date().toISOString()
    }));

    loadActiveTable();
    showNotification(`Table ${tableNumber} selected`, 'success');
}

function loadFastFoodGrid() {
    const fastFoodItems = getMenuItems().filter(item => item.group === 'fast-food');
    const fastFoodGrid = document.getElementById('fastFoodGrid');
    if (!fastFoodGrid) return;

    fastFoodGrid.innerHTML = fastFoodItems.length > 0
        ? fastFoodItems.map(item => createMenuItemElement(item).outerHTML).join('')
        : '<p class="empty-message">No fast food items available right now.</p>';
}

function loadColdDrinksGrid() {
    const coldDrinkItems = getMenuItems().filter(item => item.group === 'cold-drinks');
    const coldDrinksGrid = document.getElementById('coldDrinksGrid');
    if (!coldDrinksGrid) return;

    coldDrinksGrid.innerHTML = coldDrinkItems.length > 0
        ? coldDrinkItems.map(item => createMenuItemElement(item).outerHTML).join('')
        : '<p class="empty-message">No cold drinks available right now.</p>';
}

// Add Combo to Cart
function addComboToCart(comboId) {
    const combo = getSmartCombos().find(c => c.id === comboId);
    if (!combo) return;

    const blockedItems = combo.items
        .map(itemName => getMenuItems().find(m => m.name === itemName))
        .filter(item => item && getBlockedReasonForItem(item));

    if (blockedItems.length > 0) {
        showNotification(`This combo includes items not suitable for your health profile: ${blockedItems.map(item => item.name).join(', ')}`, 'error');
        return;
    }
    
    combo.items.forEach(itemName => {
        const item = getMenuItems().find(m => m.name === itemName);
        if (item) {
            const existingItem = cart.find(c => c.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...item, quantity: 1 });
            }
        }
    });
    
    updateCart();
    showNotification(`${combo.name} added to cart! Saving ₹${combo.originalPrice - combo.comboPrice}`, 'success');
    toggleCart();
}

// Proceed to Payment
function proceedToPayment() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    const blockedItems = cart.filter(item => getBlockedReasonForItem(item));
    if (blockedItems.length > 0) {
        showNotification(`Unable to place order: ${blockedItems.map(item => item.name).join(', ')} are not suitable for your health profile.`, 'error');
        return;
    }
    
    const userData = getUserData();
    const order = {
        tableNumber: userData.tableNumber,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.05,
        status: 'pending',
        paymentMethod: 'waiting'
    };
    
    // Save locally first (fallback) and generate an ID/timestamp
    saveOrder(order);

    // Try to send order to backend (non-blocking). If backend is unavailable, we keep local copy.
    (async function sendOrderToServer(ord) {
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ord)
            });
            if (res.ok) {
                const created = await res.json();
                // Update local copy with server id if provided
                const orders = JSON.parse(localStorage.getItem('smartQR_orders') || '[]');
                const local = orders.find(o => o.timestamp === ord.timestamp || o.id === ord.id);
                if (local && created.id) {
                    local.serverId = created.id;
                    local.id = created.id;
                    localStorage.setItem('smartQR_orders', JSON.stringify(orders));
                }
            }
        } catch (e) {
            // server not reachable; ignore and keep local order
            console.warn('Order not sent to server:', e);
        }
    })(order);
    saveCustomerHistory(userData.tableNumber, cart);
    
    // Simulate payment
    alert('Payment Gateway: ₹' + order.total.toFixed(2) + '\\n\\nOrder placed successfully!\\nOrder ID: ' + order.id);
    
    cart = [];
    updateCart();
    toggleCart();
    showNotification('Order placed successfully! Kitchen will prepare your food.', 'success');
}

// Toggle Chatbot
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    if (!chatbot) return;
    chatbot.classList.toggle('active');
}
