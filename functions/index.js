const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const { response, request } = require('express');
const stripe = require("stripe")('sk_test_51HsNIrFcYf00CUd2oJ8tuRiQqHS24UH16JqUH0NXifbK8eYRZrgzsFi18oEpkL2s1L5O5BfRWzuqiXVhb3sq9jLM00pNtPLozf')

// API

// App config
const app = express();
// Middlewares
app.use(cors({origin: true}));
app.use(express.json());
// API routes
app.get('/',(request, response) => response.status(200).send('hello world awards'))
app.post('/payments/create', async(request,response) => {
    const total = request.query.total;
    console.log('Payment Request received for this amt', total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr"
    });

    // ok created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
        })
})
// Listen command
exports.api = functions.https.onRequest(app)

// ex end point
// http://localhost:5001/awards-81ab2/us-central1/api