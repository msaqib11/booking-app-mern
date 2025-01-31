import express from "express"
import { authController } from "../controllers/index.js"
import { upload } from "../middlewares/multer.middleware.js"
const router = express.Router()


//create a user
router.post("/",upload.single("image"),authController.register)
//login a user
router.post("/login",authController.login)

export default router