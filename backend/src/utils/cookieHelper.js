import { JWT_SECRET } from "../config/env.js"
import jwt from "jsonwebtoken"

const cookieHelper = {
    setTokenCookie: (res, userId, isAdmin) => {
        const token = jwt.sign({ id: userId, isAdmin: isAdmin }, JWT_SECRET)
        // Cookie options
        const cookieOptions = {
            httpOnly: true,        // Prevents JavaScript access
            secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
            sameSite: 'strict',    // Protection against CSRF
            maxAge: 24 * 60 * 60 * 1000,  // 24 hours in milliseconds
            path: '/'             // Cookie is accessible on all routes
        };
        res.cookie("access_token", token, cookieOptions)
    },
    clearTokenCookie:(res)=>{
        res.cookie('access_token', '', {
            httpOnly: true,
            expires: new Date(0),
            path : '/'
        })
    }

}

export {cookieHelper}