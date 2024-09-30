// models/Order.js

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hotelName: {
        type: String,
        required: true,
    },
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    roomNumber: {
        type: Number,
        required: true,
    },
    namek: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    roomname: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: String,
        required: true,
    },
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
    },
    dates: [{ type: Date }],
    ProcessPayment: {
        type: String,
        default: "Pending Payment",
    },
    historiq: {

        type: String,
        default: "no",
    },
    date: {
        type: Number,
        default: () => new Date().getMonth() + 1 // Adding 1 because getMonth() returns zero-based index
      },
      
      dateyear: {
        type: Number,
        default: () => new Date().getFullYear()
      }
      

});


const Order = mongoose.model("Order", OrderSchema);

export { Order };
