import { NODE_ENV } from "../config/env.js"

//create error responses for different situations
const createError = (statusCode, message) => {
    const error = new Error(message)
    error.statusCode = statusCode
    error.status = `${statusCode}`.startsWith("4") ? "fail" : "error"
    return error
}
const errorTypes = {
    badRequest: (message) => createError(400, message || "Bad Request"),
    unauthorized: (message) => createError(401, message || "Unauthorized"),
    forbidden: (message) => createError(403, message || "Forbidden"),
    notFound: (message) => createError(404, message || "Not Found"),
    serverError: (message) => createError(500, message || "Server Error"),
}

const handleError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    // Send different responses based on environment
    if (NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err
        });
    } else {
        // Production: don't leak error details
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

}
export { errorTypes, createError, handleError }