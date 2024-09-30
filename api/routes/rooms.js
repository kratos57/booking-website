import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
  deleteUnavailableDate,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
router.delete("/:id",verifyAdmin, deleteRoom);
router.delete("/unavailable-date/:roomname/:roomNumber", deleteUnavailableDate); // Changed parameter name from objectid to roomName
router.get("/:id", getRoom);
router.get("/", getRooms);

export default router;
