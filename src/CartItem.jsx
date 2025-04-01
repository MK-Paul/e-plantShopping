import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items); // Get cart items from Redux store
  const dispatch = useDispatch();

  // Calculate the total cost of all items in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost.replace('$', '')) || 0; // Extract numeric value from cost
      return total + item.quantity * cost;
    }, 0).toFixed(2); // Return total amount as a string with 2 decimal places
  };

  // Calculate the subtotal for a single item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', '')) || 0; // Extract numeric value from cost
    return (item.quantity * cost).toFixed(2); // Multiply quantity by unit price
  };

  // Handle incrementing the quantity of an item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Handle decrementing the quantity of an item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name })); // Remove item if quantity drops to 0
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Handle "Continue Shopping" button click
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(); // Call the function passed as a prop
  };

  // Handle "Checkout" button click
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some items to get started!</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => onContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={(e) => handleCheckoutShopping(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;


