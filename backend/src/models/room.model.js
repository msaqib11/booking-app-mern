import mongoose from "mongoose"
const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    roomNumbers: [{ number: Number, availableDates: { type: [Date] } }]
}, { timeStamps: true })

export default mongoose.model("Room", RoomSchema)