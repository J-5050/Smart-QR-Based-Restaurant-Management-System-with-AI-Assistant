// Analytics Dashboard Functionality

let analyticsData = {};

// Initialize Analytics
document.addEventListener('DOMContentLoaded', function() {
    loadAnalytics();
    loadCharts();
});

// Load Analytics Data
// Load Analytics Data (try backend then fallback to local)
async function loadAnalytics() {
    try {
        const res = await fetch('/api/orders');
        if (res.ok) {
            const serverOrders = await res.json();
            analyticsData = generateSalesAnalytics(serverOrders);
        } else {
            analyticsData = generateSalesAnalytics();
        }
    } catch (e) {
        analyticsData = generateSalesAnalytics();
    }

    updateMetrics();
    updateInsights();
}

// Update Metrics
function updateMetrics() {
    document.getElementById('totalRevenue').textContent = formatCurrency(analyticsData.totalRevenue);
    document.getElementById('totalOrders').textContent = analyticsData.totalOrders;
    document.getElementById('avgOrderValue').textContent = formatCurrency(analyticsData.averageOrderValue);
}

// Update Insights
function updateInsights() {
    // Generate AI Insights
    const insights = generateInsights();
    const insightsList = document.getElementById('insightsList');
    
    insightsList.innerHTML = insights.map(insight => `
        <li>
            <div class="insight-text">
                <strong>${insight.title}</strong>
                <small>${insight.description}</small>
            </div>
            <span class="insight-badge ${insight.type}">${insight.label}</span>
        </li>
    `).join('');
    
    // Low performing items
    const lowPerforming = getLowPerformingItems();
    const lowPerformingItems = document.getElementById('lowPerformingItems');
    
    if (lowPerforming.length > 0) {
        lowPerformingItems.innerHTML = lowPerforming.map(item => `
            <li>
                <strong>${item.name}</strong>
                <span style="color: #ff4757; font-size: 12px;">📉 ${item.orders} orders</span>
            </li>
        `).join('');
    } else {
        lowPerformingItems.innerHTML = '<p style="text-align: center; color: #999;">All items performing well!</p>';
    }
}

// Generate AI Insights
function generateInsights() {
    const insights = [];
    
    // Insight 1: Peak ordering time
    const peakTime = Object.entries(analyticsData.peakOrderingTimes)
        .sort((a, b) => b[1] - a[1])[0];
    
    if (peakTime) {
        insights.push({
            title: '⏰ Peak Ordering Time',
            description: `Most orders come in at ${peakTime[0]}`,
            label: `${peakTime[1]} orders`,
            type: 'success'
        });
    }
    
    // Insight 2: Best selling dish
    const bestDish = Object.entries(analyticsData.bestSellingDishes)[0];
    if (bestDish) {
        insights.push({
            title: '⭐ Best Selling Dish',
            description: `${bestDish[0]} sold ${bestDish[1]} times`,
            label: `${bestDish[1]} sold`,
            type: 'success'
        });
    }
    
    // Insight 3: Revenue trend
    if (analyticsData.totalRevenue > 0) {
        const avgRevenue = analyticsData.totalRevenue / 7; // Assuming 7 days
        insights.push({
            title: '📈 Revenue Trend',
            description: `Average daily revenue: ₹${avgRevenue.toFixed(0)}`,
            label: 'Growing',
            type: 'success'
        });
    }
    
    // Insight 4: Recommendation
    insights.push({
        title: '💡 AI Recommendation',
        description: 'Stock up on best-selling items and promote low-performing dishes',
        label: 'Action',
        type: 'warning'
    });
    
    return insights;
}

// Get Low Performing Items
function getLowPerformingItems() {
    const allItems = getMenuItems();
    const bestSellingCount = Math.max(...Object.values(analyticsData.bestSellingDishes || {}));
    const threshold = bestSellingCount ? bestSellingCount * 0.1 : 2;
    
    return allItems
        .map(item => ({
            ...item,
            orders: analyticsData.bestSellingDishes[item.name] || 0
        }))
        .filter(item => item.orders <= threshold)
        .sort((a, b) => a.orders - b.orders)
        .slice(0, 5);
}

// Load Charts
function loadCharts() {
    loadRevenueChart();
    loadTopDishesChart();
    loadPeakTimesChart();
    loadCategoryChart();
    loadFeedback();
}

// Revenue Chart
function loadRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const revenue = [2100, 2400, 1800, 2800, 3000, 3500, 4200];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Daily Revenue (₹)',
                data: revenue,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: '#ff6b6b'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 5000 }
            }
        }
    });
}

// Top Dishes Chart
function loadTopDishesChart() {
    const ctx = document.getElementById('topDishesChart');
    if (!ctx) return;
    
    const dishes = Object.entries(analyticsData.bestSellingDishes || {})
        .slice(0, 5);
    
    const labels = dishes.map(d => d[0]);
    const data = dishes.map(d => d[1]);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Orders',
                data: data,
                backgroundColor: [
                    '#ff6b6b',
                    '#4ecdc4',
                    '#ffd93d',
                    '#51cf66',
                    '#667eea'
                ]
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { x: { beginAtZero: true } }
        }
    });
}

// Peak Times Chart
function loadPeakTimesChart() {
    const ctx = document.getElementById('peakTimesChart');
    if (!ctx) return;
    
    const hours = Object.entries(analyticsData.peakOrderingTimes || {});
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: hours.map(h => h[0]),
            datasets: [{
                label: 'Orders',
                data: hours.map(h => h[1]),
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: '#ff6b6b'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });
}

// Category Chart
function loadCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;
    
    const categories = Object.entries(analyticsData.categorySales || {});
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories.map(c => c[0]),
            datasets: [{
                data: categories.map(c => c[1]),
                backgroundColor: [
                    '#ff6b6b',
                    '#4ecdc4',
                    '#ffd93d',
                    '#51cf66',
                    '#667eea'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

// Load Feedback Analysis
function loadFeedback() {
    const allFeedback = getAllFeedback();
    
    let positiveFeedback = [];
    let negativeFeedback = [];
    
    allFeedback.forEach(feedback => {
        const analysis = analyzeFeedback(feedback.text || feedback);
        if (analysis.sentiment === 'positive') {
            positiveFeedback.push(feedback.text || feedback);
        } else if (analysis.sentiment === 'negative') {
            negativeFeedback.push(feedback.text || feedback);
        }
    });
    
    document.getElementById('positiveFeedbackCount').textContent = positiveFeedback.length;
    document.getElementById('negativeFeedbackCount').textContent = negativeFeedback.length;
    
    const positiveFeedbackList = document.getElementById('positiveFeedbackList');
    positiveFeedbackList.innerHTML = positiveFeedback.slice(0, 5)
        .map(feedback => `<li>✅ ${feedback}</li>`)
        .join('');
    
    const negativeFeedbackList = document.getElementById('negativeFeedbackList');
    negativeFeedbackList.innerHTML = negativeFeedback.slice(0, 5)
        .map(feedback => `<li>⚠️ ${feedback}</li>`)
        .join('');
}

// Export Report
function exportToCSV() {
    let csv = 'Smart QR Restaurant - Sales Report\\n\\n';
    csv += `Total Revenue,${analyticsData.totalRevenue}\\n`;
    csv += `Total Orders,${analyticsData.totalOrders}\\n`;
    csv += `Average Order Value,${analyticsData.averageOrderValue}\\n\\n`;
    csv += 'Best Selling Dishes\\n';
    
    Object.entries(analyticsData.bestSellingDishes).forEach(([dish, count]) => {
        csv += `${dish},${count}\\n`;
    });
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', 'restaurant_report.csv');
    element.click();
    
    showNotification('Report exported successfully!', 'success');
}

// Print Report
function printReport() {
    window.print();
}
