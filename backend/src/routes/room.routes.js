import express from "express"
import { roomController } from "../controllers/index.js"
import { verifyAdmin } from "../middlewares/verifyToken.middleware.js"
const router = express.Router()

//create Room
router.post("/:hotelId",verifyAdmin,roomController.createRoom)
//update Room
router.put("/:id",verifyAdmin,roomController.updateRoom)
//delete Room
router.delete("/:id",verifyAdmin,roomController.deleteRoom)
//get all Rooms
router.get("/",roomController.getAllRooms)
//get Room by id   
router.get("/:id",roomController.getRoomById)
//ADD room DATES
router.put("/:id/availability",roomController.updateRoomAvailability)

export default router