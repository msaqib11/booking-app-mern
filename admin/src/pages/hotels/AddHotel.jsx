import React, { use, useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import useFetch from '../../hooks/useFetch';
import { API_BASE_URL } from '../../config/api.js';
import axios from 'axios';
const AddHotel = () => {
    const [info, setInfo] = useState({})
    const [isFeatured, setIsFeatured] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([])
    const [preview, setPreview] = useState([])
    const [roomsId, setRoomsId] = useState([])
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const { loading, error, data } = useFetch(`/rooms`)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleFileChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };
    const handleFeatured = (e) => {
        setIsFeatured(e.target.checked)
    }
    const handleSubmit = async (e) => {
        setIsUploading(true)
        setUploadProgress(0)
        e.preventDefault();
        try {
            const data = new FormData();
              // Append all form fields
              Object.keys(info).forEach(key => {
                data.append(key, info[key]);
            });
            selectedFiles.forEach((file) => {
                data.append("photos[]", file)
            })
            roomsId.forEach((roomId) => {
                data.append("rooms[]", roomId)
            })

            data.append("isFeatured", isFeatured)
            const res = await axios.post(`${API_BASE_URL}/hotels`,data,{withCredentials:true,
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                onUploadProgress:(ProgressEvent)=>{
                    setUploadProgress(Math.round((ProgressEvent.loaded/ProgressEvent.total)*100))
                }
            })
            if(res.data){
                navigate("/hotels")
            }

            console.log("FormData entries:", Array.from(data.entries())); // ✅ Shows all entries
        } catch (error) {
            console.log(error, "add hotel error")
        }
    };

    const handleRoomsChange = (e) => {
        const values = Array.from(e.target.selectedOptions, (option) => option.value)
        setRoomsId(values)
    }

    useEffect(() => {
        if (!selectedFiles) return;
        const ObjectUrl = selectedFiles.map((file) => URL.createObjectURL(file))
        setPreview(ObjectUrl)

        return () => {
            ObjectUrl.forEach((url) => URL.revokeObjectURL(url))
        }
    }, [selectedFiles])

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Add New Hotel</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">Hotel Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium mb-2">Type</label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full p-2 border rounded-md"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium mb-2">Rating</label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            className="w-full p-2 border rounded-md"
                            onChange={handleChange}
                            required
                        />
                    </div>

                </div>

                {/* Location Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            className="w-full p-2 border rounded-md"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-2">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            className="w-full p-2 border rounded-md"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="distance" className="block text-sm font-medium mb-2">Distance</label>
                        <input
                            type="text"
                            id="distance"
                            name="distance"
                            className="w-full p-2 border rounded-md"
                            placeholder="e.g., 500m"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Pricing & Featured */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="cheapestPrice" className="block text-sm font-medium mb-2">Starting Price</label>
                        <input
                            type="number"
                            id="cheapestPrice"
                            name="cheapestPrice"
                            className="w-full p-2 border rounded-md"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex items-center pt-5">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="isFeatured"
                                name="isFeatured"
                                checked={isFeatured}
                                onChange={handleFeatured}
                                className="rounded text-blue-600"
                            />
                            <span className="text-sm">Featured Property</span>
                        </label>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="desc" className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        id="desc"
                        name="desc"
                        rows="4"
                        className="w-full p-2 border rounded-md"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="countries_multiple" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Room</label>
                    <select multiple id="countries_multiple" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleRoomsChange}
                    >
                        {loading ? "loading..." : (
                            data.map((room) => (
                                <option value={room._id} key={room._id}>{room.title}</option>
                            ))
                        )}
                    </select>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium mb-2">Hotel Images</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col w-full h-32 border-2 border-dashed rounded-md hover:border-blue-500 transition-all">
                            <div className="flex flex-col items-center justify-center pt-7">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <p className="pt-1 text-sm text-gray-600">Upload hotel images</p>
                            </div>
                            <input
                                type="file"
                                name="photos"
                                className="opacity-0"
                                multiple
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </label>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Upload up to 10 images</div>
                    <div>
                        {preview.length > 0 &&
                            <div className="flex flex-wrap justify-center">
                                {preview.map((url, index) => (
                                    <img key={index} src={url} className="w-20 h-20 m-2" alt="preview" />
                                ))}
                            </div>
                        }

                    </div>
                </div>

                {isUploading && (
                    <div className="w-full">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                            <span>Uploading photos...</span>
                            <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                    </div>
                )}
                <button
                    type="submit"
                    disabled={isUploading}
                    className={`${isUploading
                        ? "bg-blue-600/50 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        } text-white p-2 rounded font-medium mt-2`}
                >
                    {isUploading ? "uploading Hotel images" : "Create Hotel"}
                </button>
            </form>
        </div>
    );
};

export default AddHotel;