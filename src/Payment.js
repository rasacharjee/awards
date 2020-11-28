import React, { useEffect, useState } from 'react'
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from './StateProvider'
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from './reducer';
import axios from './axios';

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate stripe client key
        const getClientSecret = async() =>{
             const response  = await axios({
                 method: 'post',
                 url: '/payments/create?total=INR{getBasketTotal(basket)*100}'
             });
             setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    },[basket])

    const handleSubmit = async(event) =>{
        event.preventDefault();
        setProcessing(true);
        const payload  = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card : elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // confirmation
            setSucceeded(true);
            setError(null)
            setProcessing(false)

            history.replaceState('/orders')
        })
    }
    const handleChange = event =>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");

    }
    return (
        <div className="payment">
            <div className="payment_container">

                <h1>
                   Checkout (<Link to="./checkout">{basket?.length} items</Link>)
                </h1>

                {/*  delivery email address */ }
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Email Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                       <p>{user?.email}</p>
                    </div>
                </div>

                {/*  review items */ }
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket.map(item => (
                            <CheckoutProduct
                            id = {item.id}
                            title = {item.title}
                            image = {item.image}
                            price = {item.price}
                            rating = {item.rating} 
                            />
                        ))}
                    </div>

                </div>

                {/*  payment method */ }
                <div className="payment_section">
                    <h3>Payment Method</h3>
                    <div className="payment_details">
                        {/* Stripe method goes here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment_priceContainer">
                            <CurrencyFormat
                                 renderText={(value) => (
                                 <h3>Order Total : {value}</h3>
                                 )}
                                 decimalScale={2} value={getBasketTotal(basket)}
                                 displayType={"text"} thousandSeparator={true} prefix={"INR"}
                                 />
                                 <button disabled={processing || disabled || succeeded}>
                                 <span>{processing ? <p>Processing</p> : "Buy Now"
                                }</span>
                                 </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}

                        </form>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Payment
