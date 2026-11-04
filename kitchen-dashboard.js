// Kitchen Dashboard Functionality

let allOrders = [];
let refreshInterval = null;

// Initialize Kitchen Dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadOrders();
    refreshInterval = setInterval(loadOrders, 3000);
});

// Load and Display Orders
function loadOrders() {
    // Try to fetch orders from backend first, fallback to localStorage
    fetch('/api/orders').then(r => {
        if (!r.ok) throw new Error('no-server');
        return r.json();
    }).then(serverOrders => {
        // Ensure consistent field names
        allOrders = serverOrders.map(o => ({
            id: o.id || o.orderId || o.clientId || o.timestamp || o.id,
            tableNumber: o.tableNumber || o.table || o.tableNum,
            items: o.items || [],
            status: o.status || 'pending',
            timestamp: o.timestamp || o.createdAt || new Date().toISOString()
        }));
        updateStats();
        displayOrdersByStatus();
    }).catch(() => {
        allOrders = getAllOrders();
        updateStats();
        displayOrdersByStatus();
    });
}

// Update Statistics
function updateStats() {
    const stats = {
        pending: allOrders.filter(o => o.status === 'pending').length,
        preparing: allOrders.filter(o => o.status === 'preparing').length,
        ready: allOrders.filter(o => o.status === 'ready').length,
        served: allOrders.filter(o => o.status === 'served').length
    };
    
    document.getElementById('pendingCount').textContent = stats.pending;
    document.getElementById('preparingCount').textContent = stats.preparing;
    document.getElementById('readyCount').textContent = stats.ready;
    document.getElementById('servedCount').textContent = stats.served;
    document.getElementById('orderCount').textContent = allOrders.length;
}

// Display Orders by Status
function displayOrdersByStatus() {
    const pendingOrders = allOrders.filter(o => o.status === 'pending');
    const preparingOrders = allOrders.filter(o => o.status === 'preparing');
    const readyOrders = allOrders.filter(o => o.status === 'ready');
    const servedOrders = allOrders.filter(o => o.status === 'served');
    
    displayOrders('pendingOrders', pendingOrders, 'pending');
    displayOrders('preparingOrders', preparingOrders, 'preparing');
    displayOrders('readyOrders', readyOrders, 'ready');
    displayOrders('servedOrders', servedOrders, 'served');
}

// Display Orders in Column
function displayOrders(containerId, orders, status) {
    const container = document.getElementById(containerId);
    
    if (orders.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No orders</p>';
        return;
    }
    
    container.innerHTML = orders.map(order => createOrderCard(order, status)).join('');
}

// Create Order Card
function createOrderCard(order, status) {
    const itemsList = order.items
        .map(item => `<li><span class="order-item-qty">${item.quantity}x</span> ${item.name}</li>`)
        .join('');
    
    const timeElapsed = Math.floor((Date.now() - new Date(order.timestamp).getTime()) / 60000);
    
    return `
        <div class="order-card" onclick="showOrderDetails('${order.id}')">
            <div class="order-card-header">
                <span class="order-card-id">Order #${order.id}</span>
                <span class="order-time">${timeElapsed} min ago</span>
            </div>
            <div class="order-card-table">Table ${order.tableNumber}</div>
            <div class="order-items-preview">
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${itemsList}
                </ul>
            </div>
            <div class="order-card-actions">
                <button class="btn-details" onclick="showOrderDetails('${order.id}')">
                    <i class="fas fa-info-circle"></i> Details
                </button>
                ${status === 'pending' ? `<button class="btn-status" onclick="updateOrderStatus('${order.id}', 'preparing')">Start</button>` : ''}
                ${status === 'preparing' ? `<button class="btn-status" onclick="updateOrderStatus('${order.id}', 'ready')">Ready</button>` : ''}
                ${status === 'ready' ? `<button class="btn-status" onclick="updateOrderStatus('${order.id}', 'served')">Served</button>` : ''}
            </div>
        </div>
    `;
}

// Show Order Details Modal
function showOrderDetails(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;
    
    document.getElementById('modalOrderId').textContent = orderId;
    document.getElementById('modalTableNum').textContent = order.tableNumber;
    document.getElementById('modalOrderTime').textContent = formatDate(order.timestamp);
    
    const itemsHTML = order.items
        .map(item => `
            <div class="modal-item">
                <div class="modal-item-name">${item.name}</div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                    <span class="modal-item-qty">${item.quantity}</span>
                </div>
            </div>
        `)
        .join('');
    
    document.getElementById('modalOrderItems').innerHTML = itemsHTML;
    
    // Store current order ID for modal actions
    window.currentOrderId = orderId;
    
    document.getElementById('orderDetailsModal').style.display = 'block';
}

// Close Order Details Modal
function closeOrderDetails() {
    document.getElementById('orderDetailsModal').style.display = 'none';
}

// Update Order Status (from modal)
function updateOrderStatus(orderId, newStatus) {
    const currentOrderId = window.currentOrderId || null;
    let targetOrderId = orderId;
    let targetStatus = newStatus;

    if (['pending', 'preparing', 'ready', 'served'].includes(String(orderId)) && currentOrderId) {
        targetOrderId = currentOrderId;
        targetStatus = orderId;
    }

    if (!targetOrderId || !targetStatus) return;

    const orders = getAllOrders();
    const order = orders.find(o => String(o.id) === String(targetOrderId) || String(o.serverId) === String(targetOrderId));

    if (order) {
        order.status = targetStatus;
        order.statusUpdated = new Date().toISOString();
        localStorage.setItem('smartQR_orders', JSON.stringify(orders));
    }

    fetch(`/api/orders/${encodeURIComponent(targetOrderId)}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: targetStatus })
    }).catch(() => {
        console.warn('Backend status sync unavailable; local status was updated only.');
    });

    showNotification(`Order #${targetOrderId} status updated to ${targetStatus}`, 'success');

    if (window.currentOrderId === targetOrderId) {
        closeOrderDetails();
    }

    loadOrders();
}

// Sound notification for new orders
function playNotificationSound() {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Monitor for new orders
let lastOrderCount = 0;
setInterval(() => {
    const currentOrders = getAllOrders();
    if (currentOrders.length > lastOrderCount) {
        playNotificationSound();
        showNotification('🔔 New order received!', 'success');
        lastOrderCount = currentOrders.length;
    }
}, 5000);

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('orderDetailsModal');
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
};
