# 🍽️ Smart QR-Based Restaurant Management System

A complete AI-powered restaurant management system that enables customers to scan QR codes, view menus, place orders with AI recommendations, and make payments without waiting for a waiter.

## 📌 Features

### 🎯 1. QR-Based Digital Menu
- Each table has a unique QR code
- Customers scan QR to open menu on their phone
- No app installation required
- Works on any modern browser

### 🤖 2. AI Food Recommendation System
AI suggests dishes based on:
- Customer preferences
- Previous order history
- Time of day (breakfast, lunch, dinner recommendations)
- Popular dishes
- Budget constraints
- Dietary restrictions

### 💬 3. AI Chatbot for Ordering
- Real-time chat with AI assistant
- Example: "Suggest something spicy under ₹300"
- AI responds with relevant recommendations
- Instant food/combo suggestions

### 🎁 4. Smart Combo Suggestions
- AI automatically suggests combinations
- Example: Burger → Fries + Coke
- Upselling opportunities
- Helps increase restaurant sales

### 🎤 5. Voice Ordering
- "One Veg Burger and two Cold Coffees"
- Speech-to-text conversion
- Hands-free ordering
- Natural language processing

### 🍳 6. Real-Time Kitchen Dashboard
Kitchen staff can:
- View incoming orders in real-time
- Update order status:
  - Pending
  - Preparing
  - Ready
  - Served
- Track order preparation time
- Sound notifications for new orders

### 📊 7. AI Sales Analytics
Generate insights such as:
- Best-selling dishes
- Peak ordering times
- Low-performing items
- Revenue predictions
- Customer feedback sentiment analysis
- Daily/weekly revenue trends
- Category-wise sales

### 💚 8. Health-Based Recommendations
When scanning QR:
- Ask about allergies
- Dietary restrictions
- Health conditions
- Filter recommendations accordingly
- Safe food preparation

## 🏗️ Project Structure

```
Smart-QR-Restaurant/
├── index.html              # Home page with QR scanning
├── menu.html               # Menu display & ordering
├── kitchen-dashboard.html  # Kitchen staff interface
├── analytics.html          # Sales analytics dashboard
│
├── css/
│   ├── style.css          # Global styles
│   ├── menu.css           # Menu page styles
│   ├── kitchen-dashboard.css
│   ├── analytics.css
│   └── home.css           # Home page styles
│
├── js/
│   ├── main.js            # Core application logic
│   ├── menu-data.js       # Menu items & combos database
│   ├── menu.js            # Menu functionality
│   ├── ai-engine.js       # AI recommendation engine
│   ├── chatbot.js         # Chatbot functionality
│   ├── voice-ordering.js  # Voice ordering system
│   ├── kitchen-dashboard.js # Kitchen interface
│   ├── analytics.js       # Analytics dashboard
│   └── qr-scanner.js      # QR code scanner
│
└── assets/                # Images, icons (placeholder)
```

## 🚀 Quick Start

### 1. Start the app locally
From the project root, run one of the following on Windows:

```bash
npm.cmd start
```

or simply double-click:

```bash
start.bat
```

Then open http://localhost:3000 in your browser.

### 2. Try the Features

**As a Customer:**
1. Click "Scan QR Code" or enter table number
2. Fill health check form (allergies, dietary restrictions)
3. Browse menu with AI recommendations
4. Use AI chatbot for recommendations
5. Try voice ordering
6. Add items to cart
7. Proceed to payment

**As Kitchen Staff:**
1. Go to Kitchen Dashboard
2. View orders by status
3. Update order status as you prepare
4. Get notifications for new orders

**As Manager:**
1. Go to Analytics Dashboard
2. View real-time sales metrics
3. Analyze best-selling dishes
4. Check peak ordering times
5. Export reports

## 💻 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser LocalStorage
- **Charts**: Chart.js
- **Voice**: Web Speech API
- **Icons**: FontAwesome 6
- **No Backend Required** - Pure client-side application

## 📱 Supported Features

### QR Code Scanning
- Simulated QR scanning (production ready for real QR libraries)
- Table assignment via QR or manual entry
- Health check before ordering

### AI Recommendations
- Popularity-based recommendations
- Rating-based scoring
- Dietary preference filtering
- Complementary item suggestions
- Budget-aware recommendations

### Chatbot
- Natural language understanding
- Contextual responses
- Recommendation generation
- Combo suggestions
- Allergy/health information

### Voice Ordering
- Speech recognition (Web Speech API)
- Natural language processing
- Automatic item matching
- Multi-item voice commands

### Kitchen Management
- Real-time order tracking
- Status update pipeline
- Order timing metrics
- Sound notifications
- Order details modal

### Analytics
- Revenue tracking
- Best-selling items analysis
- Peak hours identification
- Category performance
- Customer feedback sentiment analysis
- CSV export functionality

## 🎨 Menu Items

### Vegetarian Options
- Paneer Tikka
- Samosa
- Paneer Butter Masala
- Dal Makhni
- Vegetable Biryani

### Non-Veg Options
- Chicken Tikka
- Butter Chicken
- Chicken Biryani
- Fish Amritsari
- Fish Curry

### Beverages
- Mango Lassi
- Cold Coffee
- Fresh Lemonade

### Desserts
- Gulab Jamun
- Kheer
- Ice Cream Sundae

### Breads
- Butter Naan
- Garlic Naan

## 💳 Payment Flow

1. Customer adds items to cart
2. Views bill summary with tax
3. Clicks "Proceed to Payment"
4. (Simulated payment gateway)
5. Order confirmed and sent to kitchen
6. Kitchen updates status
7. Customer notified when ready

## 🎁 Smart Combos Available

1. **Veg Party Pack** - ₹799 (Save ₹111)
2. **Non-Veg Feast** - ₹999 (Save ₹181)
3. **Date Night Combo** - ₹929 (Save ₹171)
4. **Lunch Special** - ₹649 (Save ₹111)
5. **Dessert Delight** - ₹379 (Save ₹61)

## 📊 Data Storage

All data is stored in browser's LocalStorage:
- User session data
- Orders and history
- Customer preferences
- Health information
- Feedback and reviews

No server needed for basic functionality!

## 🔐 Privacy

- All data stored locally in browser
- No external data transmission
- Customer health data protected
- Allergies handled safely

## 🚀 Future Enhancements

1. Real QR code library integration (jsQR/instascan)
2. Backend integration with Node.js/Python
3. Real payment gateway (Stripe/PayPal)
4. Multi-language support
5. Push notifications
6. Table reservation system
7. Staff management
8. Inventory tracking
9. Mobile app version
10. Advanced analytics with ML

## 📞 How to Use

### For Restaurant
1. Print QR codes for each table
2. Place them at table corners
3. Customers scan and order
4. Kitchen staff monitor dashboard
5. Manager checks analytics

### For Customers
1. Scan table QR code
2. Fill quick health check
3. Browse AI-recommended dishes
4. Chat with AI assistant if needed
5. Add items to cart
6. Checkout and pay
7. Receive order confirmation

## 🎯 Key Advantages

✅ Reduce wait time
✅ Increase order accuracy
✅ Better upselling with AI
✅ Real-time kitchen management
✅ Detailed sales insights
✅ Health-conscious recommendations
✅ No app installation needed
✅ Works offline (with LocalStorage)

## 📝 License

This project is open-source and available for educational purposes.

## 👨‍💻 Developer

Created as an AI-based restaurant management solution with voice ordering, health checks, and analytics.

---

**Happy Serving! 🍽️** 

Enjoy technology-enabled restaurant management with AI-powered recommendations and efficient order handling!

## 🔧 Backend (optional)

A minimal Node/Express backend is provided in the `server/` folder to persist orders and serve simple analytics. It also serves the frontend statically so you can open the app at `http://localhost:3000/menu.html`.

Quick run:

1. Open a terminal in the project root and run:

```powershell
cd server
npm install
npm start
```

2. Open `http://localhost:3000` (or `http://localhost:3000/menu.html`) in your browser.

API endpoints:

- `GET /api/orders` — list all orders
- `POST /api/orders` — create a new order (body = order JSON)
- `PUT /api/orders/:id/status` — update an order's status (body = { status: 'preparing' })
- `GET /api/analytics` — basic sales summary (total sales, items sold, orders count)

Example: submit an order from the frontend (replace `order` with your cart payload):

```js
fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(order)
}).then(r => r.json()).then(created => console.log(created));
```

Notes:
- The backend uses a simple file `server/data.json` for persistence. It's suitable for prototyping and local use only.
- To integrate fully, update frontend order storage calls (currently LocalStorage-based) to POST to `/api/orders` and to poll `/api/orders` or `/api/analytics` for updates.

### Python fallback (no Node/npm)

If you don't have Node/npm installed, there's a lightweight Python fallback server included. It provides the same `/api/*` endpoints and serves the frontend statically.

Run with Python 3:

```powershell
cd server
python python_server.py
```

Then open `.![alt text](image.png)


