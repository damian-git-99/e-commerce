const express = require('express');
const products = require('./data/products');
const connectDB = require('./db/config');
const app = express();
require('dotenv').config();
connectDB();

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/api/products", (req, res) => {
    res.status(200).json(products);
});

app.get("/api/products/:id", (req, res) => {
    const id = req.params.id;
    const product = products.find(p => id === p.id);
    
    if (!product) {
        return res.status(404).json({
            error: `ERROR: no existe un producto con el id: ${id}`
        });
    }


    return res.status(200).json(product);

});

app.listen(process.env.PORT, () => {
    console.log("Server running on port 5000");
});