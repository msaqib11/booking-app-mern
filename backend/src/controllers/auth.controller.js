import { User } from "../models/index.js"
import bcrypt from "bcryptjs"
import fs from "fs"
import { cookieHelper } from "../utils/cookieHelper.js"
import { errorTypes } from "../middlewares/errorHandler.middleware.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
export const register = async (req, res, next) => {


    try {
        let CloudinaryPath = null; 
        // Check if an image is uploaded
        if (req.file) {
            const imagePath = req.file.path;
            CloudinaryPath = await uploadOnCloudinary(imagePath, "users");
            fs.unlinkSync(imagePath); // Remove the local file after uploading
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = await User({
            username: req.body.username,
            email: req.body.email,
            image: CloudinaryPath?.url,
            phoneNumber: req.body.phoneNumber,
            password: hashedPassword,
        })
        await newUser.save()
        res.status(201).json("User created successfully")
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(errorTypes.notFound("User not found"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(errorTypes.badRequest("Wrong Credentials"))
        //hiding sensitive data for response
        const { password, isAdmin, ...otherData } = user._doc
        //set cookie 
        cookieHelper.setTokenCookie(res, user._id, user.isAdmin)
        res.status(200).json({ details: { ...otherData }, isAdmin })
    } catch (error) {
        next(error)
    }
}