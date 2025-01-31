import express from "express";
import cookieParser from "cookie-parser"
const app = express()
import routes from "./routes/index.js"
import { handleError } from "./middlewares/errorHandler.middleware.js"
import cors from "cors"

//Middleware
app.use(cors(
    {
        origin: ["http://localhost:5173","http://localhost:3001"], //client, admin
        credentials: true,
    }
))
app.use(cookieParser())
app.use(express.json())
app.use("/api/v1", routes)

app.use(handleError)

export default app;