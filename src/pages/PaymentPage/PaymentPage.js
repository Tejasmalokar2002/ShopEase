import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import CheckoutForm from './CheckoutPayment';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { fetchUserDetails } from '../../api/userInfo';
import { selectCartItems } from '../../store/features/cart';

const stripePublishableKey = process.env.STRIPE_KEY || 'pk_test_51SAOeICgnE4slfv3maTrQ7TMuX5WgwjhqUmSIjHFEqBKaDy4H9WRBL9gbH8wNXHZFjVxrJW8GerK3DVVt7C5REDw00gT6EEgfS';
//Publishable Key
const stripePromise = loadStripe(stripePublishableKey);

const PaymentPage = (props) => {

   const cartItems = useSelector(selectCartItems);
const totalAmount = cartItems.reduce((sum, item) => sum + item.subTotal, 0) || 0;
const amountInPaise = Math.round(totalAmount * 100); // Ensure integer, in paise

const options = {
    mode: 'payment',
    amount: amountInPaise,
    currency: 'inr',
        // Fully customizable with appearance API.
        appearance: {
            theme: 'flat'
        },
      };
  return (
    <div>
        <Elements stripe={stripePromise} options={options}>
             <CheckoutForm {...props}/>   
        </Elements>
    </div>
  )
}

export default PaymentPage