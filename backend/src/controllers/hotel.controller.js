import Hotel from "../models/hotel.model.js"
import Room from "../models/room.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
//Create hotel
export const createHotel = async (req, res, next) => {
  let cloudinaryPath = [];
  try {
    if (req.files && req.files.length > 0) {
      await Promise.all(req.files.map(async (file) => {
        // Add existence check here
        if (!fs.existsSync(file.path)) {
          console.error('File not found:', file.path);
          return;
        }
        const cloudinaryRes = await uploadOnCloudinary(file.path, "hotels")
        // Safely unlink the file
        try {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path)
          }
        } catch (unlinkError) {
          console.error('Error deleting temp file:', unlinkError)
          // Continue execution even if unlink fails
        }
        if (cloudinaryRes?.url) {
          cloudinaryPath.push(cloudinaryRes.url)
        }
      }))
    }
    const hotelData = {
      ...req.body,
      photos: cloudinaryPath  // This is now an array of URLs
    }

    const hotel = new Hotel(hotelData)
    const savedHotel = await hotel.save()
    res.status(201).json(savedHotel)
  } catch (error) {
    next(error)
  }
}


//update hotel
export const updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }

}

//delete hotel
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).send("Hotel deleted successfully")
  } catch (error) {
    next(error)
  }
}

// get all hotels
export const getAllHotes = async (req, res, next) => {
  const { isFeatured, limit, min, max, cities } = req.query
  try {
    let query = {};

    // Only add isFeatured to query if it exists in req.query
    if (isFeatured !== undefined) {
      // Convert string to boolean properly
      query.isFeatured = isFeatured === 'true';
    }
    // Add price range filter if min or max exists
    if (min || max) {
      query.cheapestPrice = {};
      if (min) query.cheapestPrice.$gte = Number(min);
      if (max) query.cheapestPrice.$lte = Number(max);
    }

    if (cities) {
      query.city = { $in: cities.split(",").map((city) => city.trim()) }
    }
    const hotels = await Hotel.find(query).collation({ locale: "en", strength: 2 }).limit(Number(limit) || 0)
    res.status(200).json(hotels)
  } catch (error) {
    next(error)
  }
}

//get hotel by id
export const getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
}

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",")
  try {
    const list = await Promise.all(cities.map(city => {
      return Hotel.countDocuments({
        $expr: {
          $eq: [{ $toLower: "$city" }, city.toLowerCase()]
        }
      })
    }))
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
}

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" })
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
    const resortCount = await Hotel.countDocuments({ type: "resort" })
    const villaCount = await Hotel.countDocuments({ type: "villa" })
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount }
    ])
  }
  catch (error) {
    next(error)
  }
}

export const getHotelRooms = async (req, res, next) => {
  const { id } = req.params
  try {
    const hotel = await Hotel.findById(id)
    const list = await Promise.all(hotel.rooms?.map(room => {
      return Room.findById(room)
    }))
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
}