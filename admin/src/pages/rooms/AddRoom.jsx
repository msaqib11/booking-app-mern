import React, { use, useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import useFetch from '../../hooks/useFetch';
import { API_BASE_URL } from '../../config/api.js';
import axios from 'axios';
const AddRoom = () => {
    const [info, setInfo] = useState({})
    const [roomNumbers, setRoomNumbers] = useState([])
    const [hotelId, setHotelId] = useState("")
    const { loading, error, data } = useFetch(`/hotels`)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const handleRoomNumbers = (e) => {
        const roomNumbersArr = e.target.value.split(',')
        const rooms = roomNumbersArr.map(room => ({
            number: room
        }))
         setRoomNumbers(rooms)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const roomData = {
                ...info,  
                roomNumbers: roomNumbers  
            };

            const res = await axios.post(`${API_BASE_URL}/rooms/${hotelId}`,roomData,{withCredentials:true,})
            if(res.data){
                navigate("/rooms")
            }
            console.log("FormData entries:", Array.from(data.entries())); // ✅ Shows all entries
        } catch (error) {
            console.log(error, "add room error")
        }
    };



    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Add New Room</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
                        <input
                            type="title"
                            id="title"
                            name="title"
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium mb-2">price</label>
                        <input
                            type="price"
                            id="price"
                            name="price"
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="maxPeople" className="block text-sm font-medium mb-2">Max People</label>
                        <input
                            type="number"
                            id="maxPeople"
                            name="maxPeople"
                            className="w-full p-2 border rounded-md"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="roomNumbers" className="block text-sm font-medium mb-2">Add Room Number</label>
                        <input
                            type="text"
                            id="roomNumbers"
                            name="roomNumbers"
                            placeholder='add room number comma seperated'
                            className="w-full p-2 border rounded-md"
                            onChange={handleRoomNumbers}
                            required
                        />
                    </div>

                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        className="w-full p-2 border rounded-md"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="hotels" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Hotel</label>
                    <select id="hotels" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setHotelId(e.target.value)}
                    >
                        {loading ? "loading..." : (
                            data.map((hotel) => (
                                <option value={hotel._id} key={hotel._id}

                                >{hotel.name}</option>
                            ))
                        )}
                    </select>
                </div>
                <button
                    type="submit"
                    className={"bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-medium mt-2"}
                >
                    Create Room
                </button>
            </form>
        </div>
    );
};

export default AddRoom;