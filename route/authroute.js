import express from "express";
import { loginContoller, registerController, testController } from "../controllers/authController.js";
import { braintreeTokenController,brainTreePaymentController } from "../controllers/paymentController.js";
import orderModel from '../models/orderModel.js'
import Products from '../models/productModels.js'


const router = express.Router();

// products function to fetch data
const productsController = async (req, res) => {
  try {
    //   const { _id } = req.body; // Access ID from query parameters for GET request

    // Retrieve product data using findById
    const product = await Products.find();

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return; 
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Routing
router.post("/register", registerController);
router.post("/login", loginContoller);
router.get("/products", productsController); // Assign the products function
router.get("/test", testController);

//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", brainTreePaymentController);


export default router;

