import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    photos: {
      type: [String],
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
    },
    desc: {
      type: String,
      required: true,
    },
    namek: {
      type: String,
    },
    type: {
      type: String,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
    amenities: {
      type: [String], // Add amenities as an array of strings
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
