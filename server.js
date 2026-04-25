const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files (HTML, JS, CSS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes to serve specific pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/store', (req, res) => res.sendFile(path.join(__dirname, 'public/store.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public/admin.html')));

// Mock Database for Orders (This is what makes the Admin work!)
let orders = []; 

app.post('/api/orders', (req, res) => {
    const newOrder = req.body;
    orders.push(newOrder);
    res.status(201).json({ message: "Order Received!" });
});

app.get('/api/orders', (req, res) => res.json(orders));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));