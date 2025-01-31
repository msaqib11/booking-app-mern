import Room from "../models/room.model.js"
import Hotel from "../models/hotel.model.js"
import { errorTypes } from "../middlewares/errorHandler.middleware.js";

export const createRoom = async (req, res, next) => {
  const { hotelId } = req.params;

  // Add hotel existence check
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return next(errorTypes.notFound("Hotel not found"));
    }

    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();

    // Update hotel with room ID
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id }
    });

    res.status(201).json(savedRoom);
  } catch (error) {
    next(error);
  }
}


//update Room
export const updateRoom = async (req, res, next) => {
  try {
    const Room = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json(Room)
  } catch (error) {
    next(error)
  }

}

//delete Room
export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id)
    res.status(200).send("Room deleted successfully")
  } catch (error) {
    next(error)
  }
}

// get all Rooms
export const getAllRooms = async (req, res, next) => {
  try {
    const Rooms = await Room.find()
    res.status(200).json(Rooms)
  } catch (error) {
    next(error)
  }
}

//get Room by id
export const getRoomById = async (req, res, next) => {
  try {
    const Room = await Room.findById(req.params.id)
    res.status(200).json("Room date added successfully")
  } catch (error) {
    next(error)
  }
}

export const updateRoomAvailability = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const { dates } = req.body; 

    const result = await Room.updateOne(
      { "roomNumbers._id": id },
      { $push: { "roomNumbers.$.availableDates": { $each: dates } } }
    );

    res.status(200).json("Room date added successfully.");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
