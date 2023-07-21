const CartItem = require("../models/cart");
const mongoose = require("mongoose");
const {
  ObjectId
} = mongoose.Types;

const addToCart = async (req, res) => {
  try {
    const cartItems = req.body.cartItems;
    
    const savedCartItems = await Promise.all(
      cartItems.map(async (item) => {
        const { userId, productId, quantity, price, name } = item;

        const parsedQuantity = parseInt(quantity, 10);

        if (isNaN(parsedQuantity) || parsedQuantity < 0) {
          throw new Error("Invalid quantity");
        }

        const total = parsedQuantity * price;

        if (productId) {
          const existingCartItem = await CartItem.findOne({
            userId,
            productId,
          });

          if (existingCartItem) {
            existingCartItem.quantity += parsedQuantity;
            existingCartItem.total += total; // Update the total
            await existingCartItem.save();
            return existingCartItem;
          }
        }

        const cartItem = new CartItem({
          userId,
          productId,
          quantity: parsedQuantity,
          price,
          total, // Set the total
          name,
        });

        await cartItem.save();
        return cartItem;
      })
    );

    res.status(201).json({
      message: "Items added to the cart successfully",
      data: savedCartItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add the items to the cart",
    });
  }
};


const updateCartItem = async (req, resp) => {
  try {
    const { productId } = req.params;
    const { quantity, increment, decrement, price } = req.body;

    // Validate and convert productId to ObjectId
    const validProductId = ObjectId.isValid(productId) ? new ObjectId(productId) : null;
    if (!validProductId) {
      return resp.status(400).json({ message: "Invalid productId" });
    }

    let cartItem = await CartItem.findById(validProductId);

    if (!cartItem) {
      return resp.status(404).json({ message: "CartItem not found" });
    }

    if (increment) {
      cartItem.quantity += 1;
    } else if (decrement) {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } 
      // else {
      //   // If quantity becomes 0 or less, you may choose to remove the cart item from the collection.
      //   await CartItem.findByIdAndRemove(validProductId);
      //   return resp.status(200).json({ message: "Item removed successfully" });
      // }
    } else {
      cartItem.quantity = quantity;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return resp.status(400).json({ message: "Invalid price" });
    }

    cartItem.total = cartItem.quantity * parsedPrice;

    const updatedCartItem = await cartItem.save();

    return resp.status(200).json({ message: "Item updated successfully", data: updatedCartItem });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Failed to update the cart item" });
  }
};


const getCartItems = async (req, resp) => {
  try {
    const cartItems = await CartItem.find();
    resp.status(200).json({
      data: cartItems
    });
  } catch (error) {
    console.error(error);
    resp.status(500).json({
      message: "Failed to get the cart items"
    });
  }
};

const removeCartItem = async (req, resp) => {
  try {
    const {productId} = req.params;
    await CartItem.findByIdAndRemove(productId);
    resp.status(200).json({
      message: "Item removed successfully"
    });
  } catch (error) {
    console.error(error);
    resp.status(500).json({
      message: "Failed to remove the item"
    });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeCartItem,
  updateCartItem
};