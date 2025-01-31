import express from "express"
import authRoutes from "./auth.routes.js"
import hotelRoutes from "./hotel.routes.js"
import userRoutes from "./user.routes.js"
import roomRoutes from "./room.routes.js"
const router = express.Router()
router.use("/hotels", hotelRoutes)
router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/rooms", roomRoutes)

export default router