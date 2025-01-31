import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";


async function connectDB() {
    try {
        const connect = await mongoose.connect(MONGO_URI)
        if (connect) {
            console.log("db connected to", connect.connection.host)
        }
        // Set up event listeners
        mongoose.connection.on("connected", () => {
            console.log("Mongoose is connected to the database.");
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Mongoose is disconnected from the database.");
        });

    } catch (error) {
        console.log("database connection error",error.message)
        throw error
    }
}

export default connectDB