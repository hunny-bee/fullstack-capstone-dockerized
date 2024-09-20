const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController")

//process payment
router.post("/process", paymentController.processPayment);

//get payment details by Id
router.get("/:id", paymentController.getPaymentById);

module.exports = router;