const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. THE IN-MEMORY DATABASE
// This array holds all orders sent by customers
let orders = []; 

// 2. MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Essential for reading JSON sent from your frontend

// 3. PAGE ROUTES
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public/admin.html')));
app.get('/store', (req, res) => res.sendFile(path.join(__dirname, 'public/store.html')));

// 4. API ROUTES (The "Backend" logic)

// GET: The Admin page calls this to see the Inbox
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// POST: The Checkout page calls this to send a new order
app.post('/api/orders', (req, res) => {
    console.log("Data received:", req.body); // Look at your terminal for this!
    const newOrder = { id: Date.now(), ...req.body };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});
app.get('/api/orders', (req, res) => {
    res.json(orders);
})
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));