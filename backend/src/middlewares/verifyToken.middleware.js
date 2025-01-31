import { errorTypes } from "./errorHandler.middleware.js"
import jwt from "jsonwebtoken"


//verify token
export const VerifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return next(errorTypes.unauthorized("No token provided"))
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return next(errorTypes.forbidden("Invalid token"))
            req.user = decoded
            next()
        })
    } catch (error) {
        next(error)
    }
}
//verify user
export const verifyUser = (req, res, next) => {
    VerifyToken(req, res, (err) => {
        if (err) return next(err);
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(errorTypes.forbidden("You are not Authorized!"))
        }
    })
}
//verify admin
export const verifyAdmin = (req, res, next) => {
    VerifyToken(req, res, () => {
        if(!req.user) {
            return next(errorTypes.unauthorized("User not authenticated"))
        }
        if(req.user.isAdmin){
            next()
        }else{
            return next(errorTypes.forbidden("Admin access required"))
        }
    })
}