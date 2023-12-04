import { useState } from 'react';
import PayButton from '../../component/PayButton';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const price=50;
    const [email,setEmail]=useState('');
    const checkout=()=>{
        fetch('https://payment-send-email-server.vercel.app/create-checkout-session',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            mode:"cors",
            body:JSON.stringify({
                items:[
                    {id:1,price:price}
                ]
            })
        })
        .then(res=>{
            if(res.ok) {
                // setEmail=data.customer_email;
                return res.json()}
            return res.json().then(json=>Promise.reject(json))
        })
        .then(({url})=>{
            window.location=url
        })
        .catch(e=>{
            console.log(e.error);
        })
    }
    return (
        <div>
            <div className="homeContainer">
                <div className="prodItem">
                <img src="" alt="" className="homeImg" />
                <div className="prodDesc">
                    <h3>Earring</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        Cupiditate autem accusantium assumenda ratione 
                        quasi voluptates aut amet alias totam doloribus.</p>
                </div>
                </div>
                <div className="prodItem">
                <img src="" alt="" className="homeImg" />
                <div className="prodDesc">
                    <h3>Earring</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        Cupiditate autem accusantium assumenda ratione 
                        quasi voluptates aut amet alias totam doloribus.</p>
                </div>
                </div>
                <div className="prodItem">
                <img src="" alt="" className="homeImg" />
                <div className="prodDesc">
                    <h3>Earring</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        Cupiditate autem accusantium assumenda ratione 
                        quasi voluptates aut amet alias totam doloribus.</p>
                </div>
                </div>
            </div>
            <button onClick={checkout}>Checkout</button>
        </div>
    );
};

export default Home;


// import { useEffect, useState } from 'react';
// import './home.css';
// import { Link } from 'react-router-dom';

// const ProductDisplay = () => (
//     <section>
//       <div className="product">
//         <img
//           src="https://i.imgur.com/EHyR2nP.png"
//           alt="The cover of Stubborn Attachments"
//         />
//         <div className="description">
//         <h3>Stubborn Attachments</h3>
//         <h5>$20.00</h5>
//         </div>
//       </div>
//       <form action="/create-checkout-session" method="POST">
//         <button type="submit">
//           Checkout
//         </button>
//       </form>
//     </section>
//   );
  
//   const Message = ({ message }) => (
//     <section>
//       <p>{message}</p>
//     </section>
//   );
// const Home = () => {
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//       // Check to see if this is a redirect back from Checkout
//       const query = new URLSearchParams(window.location.search);
  
//       if (query.get("success")) {
//         setMessage("Order placed! You will receive an email confirmation.");
//       }
  
//       if (query.get("canceled")) {
//         setMessage(
//           "Order canceled -- continue to shop around and checkout when you're ready."
//         );
//       }
//     }, []);
//     return message ? (
//         <Message message={message} />
//       ) : (
//         <ProductDisplay />
//       );
// };

// export default Home;