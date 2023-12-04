import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React from 'react';

const PayButton = ({price}) => {
    const handleCheckout=()=>{
        const stripePromise= loadStripe(import.meta.env.VITE_payment_gateway_PK);
        axios.post("http://localhost:5000/stripe/create-checkout-session",{
            price,
            user_Id:1
        }).then((res)=>{
            if(res.data?.url){
                console.log(res.data.url);
                window.location.href=res.data.url;
            }
        })
        .catch((err)=>console.log(err.message));
    };
    return (
        <>
            <button onClick={()=>handleCheckout()}>Checkout</button>
        </>
    );
};

export default PayButton;