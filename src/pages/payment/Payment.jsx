import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise= loadStripe(import.meta.env.VITE_payment_gateway_PK);
const Payment = () => {
    const total=50;
    const handlePaymentSuccess = (data) => {
        console.log('Payment successful:', data);
    
        // Add logic to display a success message or redirect to another page
      };

    return (
        <div>
      <h1>Stripe Payment</h1>
      <Elements stripe={stripePromise}>
        <PaymentForm onSuccess={handlePaymentSuccess} />
      </Elements>
    </div>
    );
};

export default Payment;