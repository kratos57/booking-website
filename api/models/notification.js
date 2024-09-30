// models/notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    namee: {
        type: String,
       
    },
    to: {
        type: String,
        required: true
    } ,
    img: {
        type: String,
      },
        date: {
    type: Date,
    default: Date.now,
  }, 
   date: {
    type: Date,
    default: Date.now,
  },
  num: {
    type: Number,
    default: 1
  },
  
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
