const express = require('express')
dotenv = require("dotenv");
const mongoose = require('mongoose')
const Product = require("./models/product.model");
const { connectDB } = require("./config/db");


dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5004;



app.get('/', (req, res) => {
    res.send('hello from node api');
});

app.get('/api/products', async(req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }
});


app.get('/api/product/:id', async(req, res) => {

  try {
      const { id } = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message})
    
  }
});


app.post('/api/products', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put('/api/product/:id', async(req, res) => {
  try {
      const { id } = req.params
      const product = await Product.findByIdAndUpdate(id, req.body);

      if(!product){
        return res.status(400).json({message: "Product not found"});
      }
      const updatedProduct = await Product.findById(id);
          res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }
})


app.listen(port, async () => {
    try {
      await connectDB(process.env.CONNECTION_STRING);
      console.log("Database connection established");
      console.log(`Server is listening on http://localhost:${port}`);
    } catch (error) {
      console.log("Error connecting to MongoDB: " + error.message);
    }
  });
