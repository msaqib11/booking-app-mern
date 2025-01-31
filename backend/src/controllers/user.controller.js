import { User } from "../models/index.js"

//update user
export const updateUser = async (req, res,next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }

}

//delete user
export const deleteUser = async(req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send("User deleted successfully")
  } catch (error) {
   next(error)
  }
}

// get all hotels
export const getAllUsers = async(req,res,next)=>{
  
  try {
    const users = await User.find({ isAdmin: false })
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

//get User by id
export const getUserById = async(req,res,next)=>{
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}