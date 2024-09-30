import mongoose from "mongoose";

const AmenitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Ensure each amenity has a unique name
  },
  available: {
    type: Boolean,
    default: false // Default status is false (not available)
  }
});

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  // Add ratings array to store all ratings given to the hotel
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating' // Reference to the Rating model
    }
  ],
  // Add averageRating field to store the average rating of the hotel
  averageRating: { type: Number},
  // Add totalRatings field to store the total number of ratings received by the hotel
  totalRatings: {
    type: Number,
    default: 0,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  amenities: {
    type: [AmenitySchema], // Array of AmenitySchema objects
  },
  namek: {
    type: String,
  },
  att: {
    type: String,
  },
  map: {
    type: String,
  },
  gmail: {
    type: String,
  },
  tel: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,  
  },
  img: {
    type: String,
  },
  nameformature: {
    type: String,
    
  },
   gmailformature: {
    type: String,
    
  },
  telformature: {
    type: String,
    
  },
});

export default mongoose.model("Hotel", HotelSchema);
