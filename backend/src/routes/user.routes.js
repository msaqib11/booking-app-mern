import express from "express"
import { userController } from "../controllers/index.js"
import { verifyAdmin, VerifyToken, verifyUser } from "../middlewares/verifyToken.middleware.js"
const router = express.Router()


router.get("/testingtoken",VerifyToken,(req,res,next)=>{
    res.send("hello user")
})

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//update user
router.put("/:id",verifyUser,userController.updateUser)
//delete user
router.delete("/:id",verifyUser,userController.deleteUser)
//get all users
router.get("/",verifyAdmin,userController.getAllUsers)
//get user by id   
router.get("/:id",verifyUser,userController.getUserById)


export default router