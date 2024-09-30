import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};


export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const deleteUnavailableDate = async (req, res, next) => {
  const { roomname, roomNumber } = req.params; // Changed from objectId to roomName
  const { dateToDelete } = req.body;

  try {
    const room = await Room.findOne({ name: roomname }); // Changed to use roomName
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Find the specified room number
    const targetRoomNumber = room.roomNumbers.find(num => num.number === parseInt(roomNumber));
    if (!targetRoomNumber) {
      return res.status(404).json({ message: "Room number not found" });
    }

    // Find the index of the date to delete in the specified room number
    const index = targetRoomNumber.unavailableDates.findIndex(date => date.toISOString() === new Date(dateToDelete).toISOString());
    if (index === -1) {
      return res.status(404).json({ message: "Date not found in specified room number" });
    }

    // Delete the date from the specified room number
    targetRoomNumber.unavailableDates.splice(index, 1);

    // Save the updated room
    const updatedRoom = await room.save();
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
