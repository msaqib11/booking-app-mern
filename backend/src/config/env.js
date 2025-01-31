
import dotenv from "dotenv"
dotenv.config()
export const PORT = process.env.PORT || 3000
export const MONGO_URI = process.env.MONGO_URI
export const NODE_ENV = process.env.NODE_ENV
export const JWT_SECRET = process.env.JWT_SECRET
export const CLOUDINARY_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
export const ADMIN_URI = process.env.ADMIN_URI
export const CLIENT_URI = process.env.CLIENT_URI