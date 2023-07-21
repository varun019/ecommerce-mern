const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    description:String,
    image:String,
    quantity:{
        type:Number,
        default:1
    }
}); 

module.exports = mongoose.model('products', productSchema);