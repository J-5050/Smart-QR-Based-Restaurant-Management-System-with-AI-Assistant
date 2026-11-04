// AI Recommendation Engine

/**
 * Get AI Recommendations based on customer preferences and history
 */
function getAIRecommendations(tableNumber) {
    const recommendations = [];
    const allItems = getMenuItems();
    const customerHistory = getCustomerHistory(tableNumber);
    const healthData = JSON.parse(localStorage.getItem('smartQR_healthData') || '{}');
    const restrictedItemNames = new Set(getRestrictedItemNamesForCurrentProfile());
    
    // Get previously ordered items
    const previousItems = new Set();
    customerHistory.forEach(order => {
        order.items.forEach(item => previousItems.add(item.name));
    });
    
    // Score items based on various factors
    const scoredItems = allItems
        .filter(item => !restrictedItemNames.has(item.name))
        .map(item => {
        let score = item.popularity;
        
        // Boost popular items
        score += item.rating * 10;
        
        // Check dietary restrictions
        if (healthData.dietary === 'vegetarian' && item.category !== 'vegetarian') {
            score -= 50;
        }
        if (healthData.dietary === 'vegan' && (item.category !== 'vegetarian' || item.tags.includes('dairy'))) {
            score -= 50;
        }
        
        // Recommend complementary items to previous orders
        if (previousItems.size > 0) {
            const complementary = getComplementaryItems(Array.from(previousItems));
            if (complementary.includes(item.name)) {
                score += 30;
            }
        }
        
        // Boost highly rated items
        if (item.rating >= 4.8) {
            score += 20;
        }
        
        // Consider time of day
        const hour = new Date().getHours();
        if (hour >= 12 && hour < 17 && item.type === 'main') {
            score += 10;
        }
        if (hour >= 18 && item.type === 'main') {
            score += 5;
        }
        
        return { ...item, aiScore: score };
    });
    
    // Filter items that haven't been ordered before
    const unorderedItems = scoredItems.filter(item => !previousItems.has(item.name));
    
    // Sort by score and return top 4
    return unorderedItems
        .sort((a, b) => b.aiScore - a.aiScore)
        .slice(0, 4)
        .map(({ aiScore, ...item }) => item);
}

/**
 * Get items that complement each other
 */
function getComplementaryItems(orderedItems) {
    const complements = {
        'Paneer Tikka': ['Butter Naan', 'Mango Lassi', 'Paneer Butter Masala'],
        'Chicken Tikka': ['Butter Naan', 'Butter Chicken', 'Cold Coffee'],
        'Paneer Butter Masala': ['Butter Naan', 'Rice', 'Fresh Lemonade'],
        'Butter Chicken': ['Butter Naan', 'Chicken Biryani', 'Ice Cream Sundae'],
        'Dal Makhni': ['Butter Naan', 'Garlic Naan', 'Fresh Lemonade'],
        'Fish Curry': ['Garlic Naan', 'Gulab Jamun', 'Cold Coffee'],
        'Chicken Biryani': ['Raita', 'Gulab Jamun', 'Mango Lassi'],
        'Vegetable Biryani': ['Raita', 'Kheer', 'Fresh Lemonade']
    };
    
    let recommendedItems = new Set();
    orderedItems.forEach(item => {
        if (complements[item]) {
            complements[item].forEach(rec => recommendedItems.add(rec));
        }
    });
    
    return Array.from(recommendedItems);
}

/**
 * Get combo recommendations based on current cart
 */
function getComboRecommendations(cartItems) {
    const combos = getSmartCombos();
    const cartItemNames = new Set(cartItems.map(item => item.name));
    
    const recommendations = combos.filter(combo => {
        const comboItemsSet = new Set(combo.items);
        let matches = 0;
        
        cartItemNames.forEach(item => {
            if (comboItemsSet.has(item)) matches++;
        });
        
        // Recommend if 50% or more items are in combo
        return matches >= combo.items.length * 0.5;
    });
    
    return recommendations;
}

/**
 * AI Chatbot Response Generator
 */
function generateAIResponse(userMessage, cartItems = []) {
    const message = userMessage.toLowerCase();
    
    // Extract budget if mentioned
    const budgetMatch = message.match(/under ₹(\d+)|₹(\d+)/i);
    const budget = budgetMatch ? parseInt(budgetMatch[1] || budgetMatch[2]) : null;
    
    // Extract preferences
    const isSpicy = message.includes('spicy');
    const isSweet = message.includes('sweet');
    const isHealthy = message.includes('healthy');
    
    // Get appropriate items
    let recommendedItems = [];
    
    if (message.includes('recommend') || message.includes('suggest')) {
        recommendedItems = getMenuItems()
            .filter(item => {
                let matches = true;
                
                if (budget && item.price > budget) matches = false;
                if (isSpicy && !item.tags.includes('spicy')) matches = false;
                if (isSweet && item.category !== 'desserts') matches = false;
                if (isHealthy && !item.tags.includes('healthy')) matches = false;
                
                return matches;
            })
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);
    }
    
    // Generate response
    let response = '';
    
    if (message.includes('hello') || message.includes('hi')) {
        response = "🎉 Welcome to our restaurant! How can I help you today? You can ask me for recommendations, combo deals, or any other information!";
    } else if (message.includes('combo')) {
        response = "🌟 We have amazing combo deals! Our best sellers are:\n• Veg Party Pack - ₹799 (Save ₹111)\n• Non-Veg Feast - ₹999 (Save ₹181)\n• Date Night Combo - ₹929 (Save ₹171)";
    } else if (recommendedItems.length > 0) {
        response = "✨ Based on your preferences, I recommend:\\n" + 
            recommendedItems.map(item => `• ${item.name} - ₹${item.price} ⭐${item.rating}`).join('\\n');
    } else if (message.includes('vegetarian')) {
        response = "🌱 Great! We have many vegetarian options. How about our famous Paneer Butter Masala or Paneer Tikka?";
    } else if (message.includes('non-veg') || message.includes('chicken') || message.includes('meat')) {
        response = "🍗 Our non-veg specials are fantastic! Try our Butter Chicken (₹380) or Chicken Biryani (₹350) - both highly rated!";
    } else if (message.includes('allergies') || message.includes('allergy')) {
        response = "⚠️ Please let us know your allergies when placing an order. We'll make sure to prepare food safely for you!";
    } else if (message.includes('price') || message.includes('cost')) {
        response = "💰 Our prices range from ₹60 (Bread) to ₹420 (Fish Curry). Would you like items in a specific price range?";
    } else if (message.includes('spicy')) {
        response = "🌶️ You like spicy! Try our Paneer Chilli, Veg Manchurian, or Schezwan Noodles!";
    } else if (message.includes('dessert') || message.includes('sweet')) {
        response = "🍮 Perfect for ending your meal! Our Gulab Jamun (₹140) and Kheer (₹120) are customer favorites!";
    } else if (message.includes('thank')) {
        response = "😊 You're welcome! Enjoy your meal!";
    } else {
        response = "😊 I'm here to help! You can ask me about:\\n• Recommendations\\n• Combo deals\\n• Dietary options\\n• Prices\\n• Allergies & health info";
    }
    
    return response;
}

/**
 * Analyze customer feedback using AI
 */
function analyzeFeedback(feedback) {
    const positiveWords = ['excellent', 'great', 'amazing', 'love', 'delicious', 'best', 'fantastic', 'wonderful', 'perfect', 'awesome'];
    const negativeWords = ['bad', 'poor', 'awful', 'hate', 'terrible', 'worst', 'horrible', 'disappointing', 'bland', 'cold'];
    
    const lowerFeedback = feedback.toLowerCase();
    
    let positiveCount = 0, negativeCount = 0;
    
    positiveWords.forEach(word => {
        if (lowerFeedback.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
        if (lowerFeedback.includes(word)) negativeCount++;
    });
    
    let sentiment = 'neutral';
    if (positiveCount > negativeCount) sentiment = 'positive';
    else if (negativeCount > positiveCount) sentiment = 'negative';
    
    return {
        text: feedback,
        sentiment: sentiment,
        timestamp: new Date().toISOString()
    };
}

/**
 * Get sales analytics
 */
function generateSalesAnalytics(orders = null) {
    orders = orders || getAllOrders();
    const analytics = {
        totalOrders: orders.length,
        totalRevenue: 0,
        averageOrderValue: 0,
        bestSellingDishes: {},
        peakOrderingTimes: {},
        categorySales: {},
        itemPerformance: []
    };
    
    const allItems = getMenuItems();
    
    orders.forEach(order => {
        analytics.totalRevenue += order.total || 0;
        
        order.items?.forEach(item => {
            // Count best selling dishes
            analytics.bestSellingDishes[item.name] = (analytics.bestSellingDishes[item.name] || 0) + item.quantity;
            
            // Count by category
            analytics.categorySales[item.category] = (analytics.categorySales[item.category] || 0) + (item.price * item.quantity);
            
            // Peak ordering times
            const hour = new Date(order.timestamp).getHours();
            analytics.peakOrderingTimes[`${hour}:00`] = (analytics.peakOrderingTimes[`${hour}:00`] || 0) + 1;
        });
    });
    
    analytics.averageOrderValue = analytics.totalOrders > 0 ? analytics.totalRevenue / analytics.totalOrders : 0;
    
    // Sort best selling dishes
    analytics.bestSellingDishes = Object.entries(analytics.bestSellingDishes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
    
    return analytics;
}
