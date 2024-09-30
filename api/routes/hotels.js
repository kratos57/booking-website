// Import necessary modules
import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
  submitRating,
  getTopRatedHotels,
  getTotalRatings,
  getTypeAndCities,
  getHotelTypes,
} from "../controllers/hotel.js";
import { verifyAdmin, } from "../utils/verifyToken.js";

// Create a new router instance
const router = express.Router();

// Route for creating a new hotel
router.post("/", verifyAdmin, createHotel);

// Route for updating a hotel
router.put("/:id", verifyAdmin, updateHotel);

// Route for deleting a hotel
router.delete("/:id", verifyAdmin, deleteHotel);

// Route for retrieving a specific hotel by ID
router.get("/find/:id", getHotel);

// Route for retrieving all hotels
router.get("/", getHotels);

// Route for counting hotels by city
router.get("/countByCity", countByCity);

// Route for counting hotels by type
router.get("/countByType", countByType);

// Route for retrieving rooms of a specific hotel
router.get("/room/:id", getHotelRooms);

// Route for submitting ratings
router.post("/:id/rate", submitRating);


// Route for fetching hotel details by ID
router.get("/:id", getHotel); // This route should return hotel details by ID


// New route for fetching total ratings of a hotel by ID
router.get("/:id/totalRatings", getTotalRatings);
// Route for adding a hotel to user's favorites
// Add this to your routes file

router.get("/hotels/top-rated", getTopRatedHotels);
router.get('/hotels/type-and-cities', getTypeAndCities);
router.get('/hotels/types', getHotelTypes); 
// Export the router for use in other parts of the application
export default router;
