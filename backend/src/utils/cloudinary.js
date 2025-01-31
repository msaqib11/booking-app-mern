import {v2 as cloudinary} from "cloudinary";
import fs from "fs"
import dotenv from "dotenv";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from "../config/env.js";
dotenv.config();

cloudinary.config({
    cloud_name: CLOUDINARY_NAME ,
    api_key: CLOUDINARY_API_KEY,
    api_secret : CLOUDINARY_API_SECRET
});
const uploadOnCloudinary = async (LocalfilePath,folder)=>{
    try {
        if(!LocalfilePath) return null;
        const response = await cloudinary.uploader.upload(LocalfilePath,
           {
            resource_type: "auto",
            folder: "booking-app-smit/"+folder,
           }
        )
        console.log("file uploaded successfully",response.url);
        return response

    } catch (error) {
        
        fs.unlinkSync(LocalfilePath);
        return null;
    }
}

export {uploadOnCloudinary};