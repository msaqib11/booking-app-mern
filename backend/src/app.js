import express from "express";
import cookieParser from "cookie-parser"
const app = express()
import routes from "./routes/index.js"
import { handleError } from "./middlewares/errorHandler.middleware.js"
import cors from "cors"
import { ADMIN_URI, CLIENT_URI } from "./config/env.js";

//Middleware
app.use(cors(
    {
        origin: [ADMIN_URI,CLIENT_URI],
        credentials: true,
    }
))
app.use(cookieParser())
app.use(express.json())
app.use("/api/v1", routes)

app.use(handleError)

export default app;