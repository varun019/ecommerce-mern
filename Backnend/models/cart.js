const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    },
    quantity: {
        type: Number,
        default:1,
    },
    price:{
        type:Number,
    },
    total:{
        type:Number
    },
    name:{
        type:String,
    }
},
    {
        timestamps: true
    })

const Cart = mongoose.model("cartItems", cartSchema);
module.exports = Cart;