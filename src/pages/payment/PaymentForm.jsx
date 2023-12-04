// PaymentForm.js
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      confirmParams:{
        return_url:'http://localhost:5173'
      }
    });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const { id } = paymentMethod;

    try {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
      });
      
      const response = await axiosInstance.post('/api/payment', { id });
      onSuccess(response.data);
    } 
    // catch (error) {
    //   console.error(error);
    // } 
    finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={loading}>
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;




// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "./payment.css";

// // const CARD_OPTIONS = {
// //   iconStyle: "solid",
// //   style: {
// //     base: {
// //       iconColor: "#c4f0ff",
// //       color: "#fff",
// //       fontWeight: 500,
// //       fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
// //       fontSize: "16px",
// //       fontSmoothing: "antialiased",
// //       ":-webkit-autofill": {
// //         color: "#fce883",
// //       },
// //       "::placeholder": {
// //         color: "#87bbfd",
// //       },
// //     },
// //     invalid: {
// //       iconColor: "#ffc7ee",
// //       color: "#ffc7ee",
// //     },
// //   },
// // };

// const PaymentForm = ({price}) => {
//   const [success, setSuccess] = useState(false);
//   const stripe = useStripe();
//   const elements = useElements();
//   const [cardError,setCardError]=useState('');
//   const [clientSecret,setClientSecret]=useState('');

//   useEffect(()=>{
//     console.log(price);
//     axios.post('https://localhost:5000/create-payment-intent', {price})
//     .then(res=>{
//         console.log(res.data.clientSecret)
//         setClientSecret(res.data.clientSecret);
//     })
//   },[])

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);

//     if (card == null) {
//       return;
//     }
//     console.log('card',card)

//     const {error,paymentMethod}=await stripe.createPaymentMethod({
//         type:'card',
//         card
//     })

//     if(error){
//         console.log('error',error)
//         setCardError(error.message);
//     }
//     else{
//         setCardError('');
//         console.log('payment method',paymentMethod)
//     }
//     const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(
//         clientSecret,
//         {
//             payment_method:{
//                 card:card,
//                 billing_details:{
//                     name:'annonymous',
//                     email:'unknown'
//                 }
//             }
//         }
//     )
//     if(confirmError){
//         console.log(confirmError);
//     }
//     console.log(paymentIntent);
//     // if (!error) {
//     //   try {
//     //     const { id } = paymentMethod;
//     //     const response = await axios.post("https://localhost:5000/payment", {
//     //       amount: 1000,
//     //       id,
//     //     });

//     //     if (response.data.success) {
//     //       console.log("Successful Payment");
//     //       setSuccess(true);
//     //     }
//     //   } catch (error) {
//     //     console.log("Error", error);
//     //   }
//     // } else {
//     //   console.log(error.message);
//     // }
//   };

//   return (
//     <>
//       {!success ? (
//          <form onSubmit={handleSubmit}>
//          <CardElement
//            options={{
//              style: {
//                base: {
//                  fontSize: '16px',
//                  color: '#424770',
//                  '::placeholder': {
//                    color: '#aab7c4',
//                  },
//                },
//                invalid: {
//                  color: '#9e2146',
//                },
//              },
//            }}
//          />
//          <button type="submit" disabled={!stripe ||!clientSecret}>
//            Pay
//          </button>
//        </form>
//     //    {cardError && <p>{error.message}</p>}
//       ) : (
//         <div>
//           <h1>SUCCESS</h1>
//         </div>
//       )}
//     </>
//   );
// };

// export default PaymentForm;
