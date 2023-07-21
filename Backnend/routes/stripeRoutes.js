const express = require("express");
const router = express.Router();
const stripeController = require("../controller/paymentController");

router.post("/create-payment-intent",stripeController.createPaymentIntent);

module.exports = router;