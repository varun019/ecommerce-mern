import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { productContext } from './Context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import * as Sentry from '@sentry/react';

const stripePromise = loadStripe('pk_test_51NVI3dSDdbSnrXr8e7W7CJE53EsutRxrypCItJ6p1yn510YYHvgk8zrjFtwGkSknWDzei1yvmrqddILHiScj8HOY00KlACdNeY');

interface ProductItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}

const CartItems: React.FC = () => {
  const [stock, setStock] = useState<ProductItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { cartCount, updateCartCount } = useContext(productContext);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cartitems');
      const cartItems = response.data.data || [];
      const updatedCartItems = cartItems.map((item: ProductItem) => {
        return {
          ...item,
          name: item.name,
        };
      });
      setStock(updatedCartItems);
      updateCartCount(updatedCartItems.length);
      calculateTotalAmount(updatedCartItems);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    calculateTotalAmount(stock);
  }, [stock]);

  const calculateTotalAmount = (items: ProductItem[]) => {
    const total = items.reduce((accumulator, item) => accumulator + item.total, 0);
    setTotalAmount(total);
  };

  const increment = async (productId: string, price: number) => {
    const updatedCart = stock.map((item) => {
      if (item._id === productId) {
        const newQuantity = item.quantity + 1; // Change 'quantity' to 'count'
        const newTotal = item.price * newQuantity;
        return {
          ...item,
          quantity: newQuantity,
          total: newTotal,
        };
      }
      return item;
    });

    await updateCartItem(productId, { increment: true, price });
    setStock(updatedCart);
    updateCartCount(updatedCart.length);
  };


  // const handleLogOut = async () => {
  //   try {
  //     await axios.get("http://localhost:8080/logout");
  //     toast.success("Logged out Successfully");
  //     fetchCartItems();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to logout")
  //   }
  // }

  const handleCheckout = async () => {
    try {
      // await handleLogOut();
      const response = await fetch('http://localhost:8080/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems: stock }),
      });

      if (!response.ok) {
        throw new Error('Failed to create a payment intent');
      }

      const data = await response.json();
      console.log(data, "stripe");

      const { sessionId } = data; // Use sessionId instead of clientSecret

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId, // Use sessionId here
      });

      if (error) {
        console.error(error);
        toast.error('Failed to initiate the Stripe Checkout process');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during the checkout process');
      Sentry.captureException(error);
    }
  };



  const decrement = async (productId: string, price: number) => {
    const updatedCart = stock.map((item) => {
      if (item._id === productId) {
        const newQuantity = Math.max(item.quantity - 1, 1);
        const newTotal = item.price * newQuantity;
        return {
          ...item,
          count: newQuantity,
          total: newTotal,
        };
      }
      return item;
    });

    await updateCartItem(productId, { quantity: updatedCart.find((item) => item._id === productId)?.quantity, decrement: true, price });
    setStock(updatedCart);
    updateCartCount(updatedCart.length);
  };

  const removeItem = async (productId: string) => {
    const updatedCart = stock.filter((item) => item._id !== productId);

    try {
      await axios.delete(`http://localhost:8080/cart/${productId}`);
      setStock(updatedCart);
      calculateTotalAmount(updatedCart);
      updateCartCount(updatedCart.length);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCartItem = async (productId: string, data?: any) => {
    try {
      const response = await axios.put(`http://localhost:8080/cartitems/${productId}`, data);
      const updatedCartItem = response.data.data;

      if (updatedCartItem && updatedCartItem.quantity === 1) {
        toast.error("Quantity cannot be less than 1!");
      } else {
        setStock((prevStock) =>
          prevStock.map((item) => (item._id === productId ? updatedCartItem : item))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='tableItem'>
      {stock.length > 0 ? (
        <>
          <Table className='tableItem' striped variant='dark'>
            <thead>
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Sub total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <Button variant='outline-info' onClick={() => decrement(item._id, item.price)}>
                      -
                    </Button>{' '}
                    {item.quantity} {/* Change 'quantity' to 'count' */}
                    <Button variant='outline-info' onClick={() => increment(item._id, item.price)}>
                      +
                    </Button>{' '}
                  </td>
                  <td>{item.total}</td>
                  <td>
                    <Button onClick={() => removeItem(item._id)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <button className='btn btn-danger total my-4'>Total Amount: ${totalAmount}</button>
          <button className='btn btn-primary' onClick={handleCheckout}>
            Checkout
          </button>
        </>
      ) : (
        <div>
          <img src='/images/empty-cart.png' alt='Empty Cart' />
        </div>
      )}
    </div>
  );
};

export default CartItems;
