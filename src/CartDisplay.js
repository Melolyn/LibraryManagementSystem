import React from 'react';
import { useCart } from './CartContext';
import './App.css';
import CartImage from './shopping-cart-114.png';

const CartDisplay = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className='cart-container' >
      <h3 className='cart-header'> <img className='cart-icon' src={CartImage}></img>Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className='cart-items'>
          {cart.map((item, index) => (
            <li key={index}>
              {item.title} - ${item.isRental ? item.rentalPrice : item.price.toFixed(2)}{' '}
              {item.isRental ? <span style={{ color: 'blue' }}>(Rental)</span> : null}
              <button
                
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartDisplay;
