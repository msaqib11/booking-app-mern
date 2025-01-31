import express from "express"
import { hotelController } from "../controllers/index.js"
import { verifyAdmin } from "../middlewares/verifyToken.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"
const router = express.Router()

//create hotel
router.post("/",verifyAdmin,upload.array("photos[]"),hotelController.createHotel)
//update hotel
router.put("/:id",verifyAdmin,hotelController.updateHotel)
//delete hotel
router.delete("/:id",verifyAdmin,hotelController.deleteHotel)
//get all hotels
router.get("/",hotelController.getAllHotes)
//get hotel by id   
router.get("/find/:id",hotelController.getHotelById)
//get hotel room
router.get("/:id/rooms",hotelController.getHotelRooms)

router.get('/countByCity',hotelController.countByCity)
router.get('/countByType',hotelController.countByType)

export default router