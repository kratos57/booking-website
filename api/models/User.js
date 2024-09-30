import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    taype: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    rib: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    subscribed: {
      type: Boolean,
      default: false,
    },
    taype: [{
      type: String,
    }],
    
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }]
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
