const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cartRoutes = require('./routes/cartRoutes')
const productRoutes = require('./routes/productRoutes')
const passwordRoutes = require('./routes/passwordRoutes')
const stripe = require("./routes/stripeRoutes");
app.use(cors());


app.use(express.json());

app.get('/checkout-success', (req, res) => {
    res.send('checkout-success');
  });

app.use(express.urlencoded({ extended: true }));
app.get('/',(req,resp)=>{
    resp.send('hello world')
})

//api routes

app.use(authRoutes);
app.use(cartRoutes);
app.use(productRoutes);
app.use(passwordRoutes);
app.use(stripe);
module.exports = app;

const uri = 'mongodb://localhost:27017/ecommerce';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

const connectWithDB = () => {
    mongoose.connect(uri, options, (err, db) => {
      if (err) console.error(err);
      else console.log("database connection")
    })
}

connectWithDB()

app.listen(8080);
   