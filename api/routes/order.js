import express from "express";
import {generateOrderPdf,getTopHotels, createOrder, getOrders, getUserOrders, updateOrder, updateOrderDate, getOrderYears,getTotalPriceByDateAndDateYear,getTotalPriceByDateAndDateYearand,getTotalPriceByDateAndDateYearAndNameAndHotelName  } from "../controllers/orders.js";

const router = express.Router();

// POST route for creating a new order
router.post("/", createOrder);

// GET route for fetching existing orders
router.get("/", getOrders);


// Define route for fetching order years
router.get("/years", getOrderYears);

// GET route for fetching user-specific orders

router.get("/user/:username/orders", getUserOrders);

// PUT route for updating an order
router.put("/:id", updateOrder);

// PUT route for updating order date
// PUT route for updating an order
router.put("/:orderId/update-order-date", updateOrderDate);

// GET route for fetching orders with date and totalPrice
router.get("/totalprice", getTotalPriceByDateAndDateYear);
router.get('/total', getTotalPriceByDateAndDateYearand);
router.get('/totalname', getTotalPriceByDateAndDateYearAndNameAndHotelName );
router.get('/tophotels', getTopHotels );
router.get('/:orderId/pdf', generateOrderPdf);
export default router;
