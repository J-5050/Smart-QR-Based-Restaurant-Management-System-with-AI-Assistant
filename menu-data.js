// Menu Data - Restaurant Menu Items

const MENU_ITEMS = [
    // Vegetarian Starters
    {
        id: 1,
        name: "Paneer Tikka",
        category: "vegetarian",
        type: "starter",
        price: 250,
        description: "Soft paneer cubes marinated and grilled",
        emoji: "🔶",
        rating: 4.8,
        popularity: 95,
        tags: ["popular", "spicy", "protein"],
        image: "assets/paner pizza.jpg"
    },
    {
        id: 2,
        name: "Samosa",
        category: "vegetarian",
        type: "starter",
        price: 80,
        description: "Crispy pastry with spiced potato filling",
        emoji: "📦",
        rating: 4.6,
        popularity: 85,
        tags: ["crispy", "snack"],
        image: "assets/Crispy Aloo Samosa.jpg"
    },
    {
        id: 3,
        name: "Chikhalwali",
        category: "vegetarian",
        type: "starter",
        price: 120,
        description: "Garlic bread with herb butter",
        emoji: "🥒",
        rating: 4.5,
        popularity: 70,
        tags: ["bread"],
        image: "assets/Handmade Chakli, Savory Indian Snack.jpg"
    },
    // Non-Veg Starters
    {
        id: 4,
        name: "Chicken Tikka",
        category: "nonveg",
        type: "starter",
        price: 320,
        description: "Juicy chicken pieces marinated and grilled",
        emoji: "🍗",
        rating: 4.9,
        popularity: 98,
        tags: ["popular", "spicy", "protein"],
        image: "assets/Chicken Tikka Kebabs.jpg"
    },
    {
        id: 5,
        name: "Fish Amritsari",
        category: "nonveg",
        type: "starter",
        price: 380,
        description: "Crispy fried fish with lemon",
        emoji: "🐟",
        rating: 4.7,
        popularity: 80,
        tags: ["crispy", "seafood"],
        image: "assets/Amritsari Fish Fry or Crispy Fish Pakora _ Savory Tales.jpg"
    },
    // Main Course - Veg
    {
        id: 6,
        name: "Paneer Butter Masala",
        category: "vegetarian",
        type: "main",
        price: 300,
        description: "Soft paneer in creamy tomato sauce",
        emoji: "🍲",
        rating: 4.9,
        popularity: 100,
        tags: ["popular", "creamy", "must-try"],
        image: "assets/download (8).jpg"
    },
    {
        id: 7,
        name: "Dal Makhni",
        category: "vegetarian",
        type: "main",
        price: 250,
        description: "Black lentils cooked with butter and cream",
        emoji: "🍶",
        rating: 4.8,
        popularity: 92,
        tags: ["creamy", "healthy", "protein"],
        image: "assets/Dal Makhani Recipe - Fun Food Frolic.jpg"
    },
    {
        id: 8,
        name: "Vegetable Biryani",
        category: "vegetarian",
        type: "main",
        price: 280,
        description: "Fragrant rice cooked with vegetables and spices",
        emoji: "🍚",
        rating: 4.7,
        popularity: 85,
        tags: ["rice", "aromatic"],
        image: "assets/Delicious Biryani.jpg"
    },
    // Main Course - Non-Veg
    {
        id: 9,
        name: "Butter Chicken",
        category: "nonveg",
        type: "main",
        price: 380,
        description: "Tender chicken in creamy tomato sauce",
        emoji: "🍗",
        rating: 4.9,
        popularity: 100,
        tags: ["popular", "creamy", "must-try"],
        image: "assets/Butter chicken 🍗🍛.jpg"
    },
    {
        id: 10,
        name: "Chicken Biryani",
        category: "nonveg",
        type: "main",
        price: 350,
        description: "Fragrant rice cooked with chicken and spices",
        emoji: "🍚",
        rating: 4.8,
        popularity: 96,
        tags: ["rice", "aromatic", "popular"],
        image: "assets/download (9).jpg"
    },
    {
        id: 11,
        name: "Fish Curry",
        category: "nonveg",
        type: "main",
        price: 420,
        description: "Tender fish in spiced coconut curry",
        emoji: "🐟",
        rating: 4.7,
        popularity: 78,
        tags: ["seafood", "spicy"],
        image: "assets/fish curry recipe.jpg"
    },
    // Breads
    {
        id: 12,
        name: "Butter Naan",
        category: "vegetarian",
        type: "bread",
        price: 60,
        description: "Soft bread with butter",
        emoji: "🥖",
        rating: 4.8,
        popularity: 90,
        tags: ["bread", "popular"],
        image: ""
    },
    {
        id: 13,
        name: "Garlic Naan",
        category: "vegetarian",
        type: "bread",
        price: 70,
        description: "Bread with garlic and herbs",
        emoji: "🥖",
        rating: 4.7,
        popularity: 88,
        tags: ["bread", "aromatic"],
        image: "assets/Garlic Naan Recipe - Spice World Inc.jpg"
    },
    // Drinks
    {
        id: 14,
        name: "Mango Lassi",
        category: "drinks",
        type: "beverage",
        price: 120,
        description: "Yogurt drink with mango pulp",
        emoji: "🥤",
        rating: 4.8,
        popularity: 92,
        tags: ["refreshing", "yogurt"],
        image: "assets/mango rose lassi frothy_ A Tropical Escape Awaits.jpg"
    },
    {
        id: 15,
        name: "Cold Coffee",
        category: "drinks",
        type: "beverage",
        price: 150,
        description: "Iced coffee with cream",
        emoji: "☕",
        rating: 4.7,
        popularity: 85,
        tags: ["cold", "coffee"],
        image: "assets/Cafe Style Cold Coffee.jpg"
    },
    {
        id: 16,
        name: "Fresh Lemonade",
        category: "drinks",
        type: "beverage",
        price: 100,
        description: "Fresh lemon juice with mint",
        emoji: "🍋",
        rating: 4.6,
        popularity: 80,
        tags: ["refreshing", "healthy"],
        image: "assets/download (10).jpg"
    },
    // Desserts
    {
        id: 17,
        name: "Gulab Jamun",
        category: "desserts",
        type: "dessert",
        price: 140,
        description: "Soft milk solids in sugar syrup",
        emoji: "🍮",
        rating: 4.9,
        popularity: 95,
        tags: ["sweet", "traditional"],
        image: "assets/_Golden Gulab Jamun Bliss_.jpg"
    },
    {
        id: 18,
        name: "Kheer",
        category: "desserts",
        type: "dessert",
        price: 120,
        description: "Rice pudding with milk and nuts",
        emoji: "🥛",
        rating: 4.8,
        popularity: 90,
        tags: ["sweet", "creamy"],
        image: "assets/Pakistani sweet dish kheer.jpg"
    },
    {
        id: 19,
        name: "Ice Cream Sundae",
        category: "desserts",
        type: "dessert",
        price: 180,
        description: "Vanilla ice cream with toppings",
        emoji: "🍨",
        rating: 4.7,
        popularity: 88,
        tags: ["cold", "sweet"],
        image: "assets/Ice cream.jpg"
    },
    {
        id: 20,
        name: "Classic Burger",
        category: "vegetarian",
        type: "fastfood",
        price: 220,
        description: "Juicy veggie burger with cheese and lettuce",
        emoji: "🍔",
        rating: 4.6,
        popularity: 91,
        tags: ["fast food", "veggie"],
        group: "fast-food",
        image: "assets/Lipton Onion Soup Burger Recipe - Insanely Good.jpg"
    },
    {
        id: 21,
        name: "Crispy French Fries",
        category: "vegetarian",
        type: "fastfood",
        price: 120,
        description: "Golden fries served with ketchup",
        emoji: "🍟",
        rating: 4.5,
        popularity: 89,
        tags: ["fast food", "crispy"],
        group: "fast-food",
        image: "assets/download (11).jpg"
    },
    {
        id: 22,
        name: "Chicken Burger",
        category: "nonveg",
        type: "fastfood",
        price: 280,
        description: "Grilled chicken burger with special sauce",
        emoji: "🍔",
        rating: 4.8,
        popularity: 94,
        tags: ["fast food", "spicy"],
        group: "fast-food",
        image: "assets/Redirect Notice.jpg"
    },
    {
        id: 23,
        name: "Iced Tea",
        category: "drinks",
        type: "beverage",
        price: 110,
        description: "Refreshing iced tea with lemon",
        emoji: "🧊",
        rating: 4.5,
        popularity: 83,
        tags: ["cold", "refreshing"],
        group: "cold-drinks",
        image: "assets/download (12).jpg"
    },
    {
        id: 24,
        name: "Mint Mojito",
        category: "drinks",
        type: "beverage",
        price: 140,
        description: "Chilled mint drink with lime and soda",
        emoji: "🍹",
        rating: 4.7,
        popularity: 86,
        tags: ["cold", "mint"],
        group: "cold-drinks",
        image: "assets/download (13).jpg"
    },
    {
        id: 25,
        name: "Watermelon Cooler",
        category: "drinks",
        type: "beverage",
        price: 130,
        description: "Fresh watermelon juice poured over ice",
        emoji: "🍉",
        rating: 4.6,
        popularity: 84,
        tags: ["cold", "fruit"],
        group: "cold-drinks",
        image: "assets/Refreshing Watermelon Cooler 🍉❄️🌿.jpg"
    }
    ,
    {
        id: 26,
        name: "Veg Cheese Pizza",
        category: "vegetarian",
        type: "fastfood",
        price: 260,
        description: "Classic cheesy pizza with tomato sauce and veggies",
        emoji: "🍕",
        rating: 4.6,
        popularity: 93,
        tags: ["fast food", "cheesy"],
        group: "fast-food",
        image: "assets/cheese pizza.jpg"
    }
    ,
    {
        id: 27,
        name: "Chicken Nuggets",
        category: "nonveg",
        type: "fastfood",
        price: 200,
        description: "Crispy bite-sized chicken nuggets served with dip",
        emoji: "🍗",
        rating: 4.5,
        popularity: 90,
        tags: ["fast food", "crispy"],
        group: "fast-food",
        image: "assets/Fried chicken nuggets with ketchp and rose sauce _ Premium Photo.jpg"
    },
    {
        id: 28,
        name: "Veg Wrap",
        category: "vegetarian",
        type: "fastfood",
        price: 180,
        description: "Soft tortilla filled with fresh veggies and sauce",
        emoji: "🌯",
        rating: 4.4,
        popularity: 86,
        tags: ["fast food", "wrap"],
        group: "fast-food",
        image: "assets/Vegetable and Hummus Wrap 🌯🥗__Fresh, healthy, and oh-so-tasty! This Vegetable and Hummus Wrap is packed with vibrant veggies, creamy hummus, and optional extras like feta cheese or seeds for added crunch_.jpg"
    },
    {
        id: 29,
        name: "Hot Dog",
        category: "nonveg",
        type: "fastfood",
        price: 160,
        description: "Grilled hot dog with mustard and ketchup",
        emoji: "🌭",
        rating: 4.3,
        popularity: 82,
        tags: ["fast food", "snack"],
        group: "fast-food",
        image: "assets/afiyet olsun 😋😋.jpg"
    }
];

// Smart Combos
const SMART_COMBOS = [
    {
        id: 1,
        name: "Veg Party Pack",
        items: ["Paneer Tikka", "Paneer Butter Masala", "Butter Naan", "Mango Lassi"],
        originalPrice: 910,
        comboPrice: 799,
        discount: 12,
        emoji: "🎉"
    },
    {
        id: 2,
        name: "Non-Veg Feast",
        items: ["Chicken Tikka", "Butter Chicken", "Chicken Biryani", "Cold Coffee"],
        originalPrice: 1180,
        comboPrice: 999,
        discount: 15,
        emoji: "🍗"
    },
    {
        id: 3,
        name: "Date Night Combo",
        items: ["Fish Amritsari", "Fish Curry", "Garlic Naan", "Gulab Jamun"],
        originalPrice: 1100,
        comboPrice: 929,
        discount: 15,
        emoji: "💕"
    },
    {
        id: 4,
        name: "Lunch Special",
        items: ["Paneer Butter Masala", "Dal Makhni", "Butter Naan", "Fresh Lemonade"],
        originalPrice: 760,
        comboPrice: 649,
        discount: 15,
        emoji: "🌞"
    },
    {
        id: 5,
        name: "Dessert Delight",
        items: ["Gulab Jamun", "Kheer", "Ice Cream Sundae"],
        originalPrice: 440,
        comboPrice: 379,
        discount: 14,
        emoji: "🍰"
    }
];

// Initialize Menu Data in localStorage
function initializeMenuData() {
    if (!localStorage.getItem('menuItems')) {
        localStorage.setItem('menuItems', JSON.stringify(MENU_ITEMS));
    }
}

// Get all menu items
function getMenuItems() {
    return MENU_ITEMS;
}

// Get menu item by ID
function getMenuItemById(id) {
    return MENU_ITEMS.find(item => item.id === id);
}

// Get items by category
function getItemsByCategory(category) {
    if (category === 'all') {
        return MENU_ITEMS;
    }
    return MENU_ITEMS.filter(item => item.category === category);
}

// Search menu items
function searchMenuItems(query) {
    const lowercaseQuery = query.toLowerCase();
    return MENU_ITEMS.filter(item => 
        item.name.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
}

// Get smart combos
function getSmartCombos() {
    return SMART_COMBOS;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeMenuData);
