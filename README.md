# 🛒 Full Stack Coding Assignment: Mock E-Com Cart

##  Overview
This project is a **basic full-stack shopping cart application** built for the **Vibe Commerce screening assignment**.  
It demonstrates UI, API, and database integration across a typical e-commerce flow.

The application allows users to:
- Browse products
- Add/remove items to/from cart
- View total amount dynamically
- Proceed to mock checkout (no real payments)
- View a receipt with timestamp and total

---

##  Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (or SQLite alternative) |
| **API Communication** | REST APIs using Axios/Fetch |
| **Version Control** | GitHub Repository (no hosting) |

---

## Requirements

### Backend APIs

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/products` | **GET** | Fetch 5–10 mock items (`id`, `name`, `price`, `image`) |
| `/api/cart` | **POST** | Add item to cart — accepts `{ productId, qty }` |
| `/api/cart/:id` | **DELETE** | Remove an item from cart |
| `/api/cart` | **GET** | Retrieve cart items + total |
| `/api/checkout` | **POST** | Accept `{ cartItems }` → return mock receipt `{ total, timestamp }` |

---

### Frontend (React)
- Product grid with **“Add to Cart”** button  
- Cart view with **item list, quantity update, remove option, and total**  
- Checkout form to collect **name** and **email**  
- Submit form → shows **receipt modal** with payment summary  
- Fully **responsive** for desktop and mobile devices

---

###  Bonus Features
✅ Database persistence (mock user data)  
✅ Error handling with clean UI messages  
✅ Integration with **Fake Store API** for real-looking product data  

---

##  Folder Structure

Nexora_Ecommerce
┣ 📁 backend
┃ ┣ 📁 models
┃ ┣ 📁 routes
┃ ┣ 📁 controllers
┃ ┗ 📄 server.js
┣ 📁 frontend
┃ ┣ 📁 src
┃ ┃ ┣ 📁 components
┃ ┃ ┃ ┣ ProductCard.jsx
┃ ┃ ┃ ┣ Cart.jsx
┃ ┃ ┃ ┣ CheckoutModal.jsx
┃ ┃ ┃ ┗ Navbar.jsx
┃ ┃ ┣ 📄 App.jsx
┃ ┃ ┗ 📄 index.js
┗ 📄 README.md

---

## ⚙️ Setup Instructions

###  Step 1: Clone Repository
```bash
git clone https://github.com/kaushikigupta4/Nexora_Ecommerce.git
```
### Step 2: Setup backend
cd backend
npm install

Create .env file:
MONGODB_URL=mongodb://127.0.0.1:27017/"ecomm"
PORT=5000

Run the backend:
npm run dev

Your backend should now run on:
 http://localhost:5000

### Step 3: Setup Frontend
cd ../frontend
npm install
npm run dev

Frontend runs on:
http://localhost:3000


