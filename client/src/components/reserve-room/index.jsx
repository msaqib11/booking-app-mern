import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useFetch from '../../hooks/useFetch'
import { useContext, useState } from 'react'
import { Context } from '../../context/contextApi'
import { getDateInRange } from '../../utils/dateUtil'
import axios from 'axios'
import { API_BASE_URL } from '../../config/api'
import { useNavigate } from 'react-router-dom'

const ReserveRoom = ({ setIsModalOpen, hotelID }) => {
    const { loading, error, data } = useFetch(`/hotels/${hotelID}/rooms`)
    const { bookingDate } = useContext(Context)
    const navigate = useNavigate()
    const [selectedRooms, setSelectedRooms] = useState([])
    function handleChecked(e) {
        const Checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(Checked ? [...selectedRooms, value] : selectedRooms.filter(room => room !== value)
        )
    }


    const allSelectedDates = getDateInRange(bookingDate[0].startDate, bookingDate[0].endDate)
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.availableDates.some((date) => allSelectedDates.includes(new Date(date).getTime()));
        return !isFound;
    };

    async function handleReserve() {
        try {
            await Promise.all(selectedRooms.map((roomId) => {
                const res = axios.put(`${API_BASE_URL}/rooms/${roomId}/availability`, { dates: allSelectedDates });
                return res
            }))
            setIsModalOpen(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
            {loading ? (
                <div className='flex items-center justify-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-white'></div>
                </div>
            ) : (
                <div className='relative max-h-[90vh] scrollbar-hide overflow-y-scroll w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl'>
                    <div className='flex items-center justify-between p-6 border-b border-gray-200'>
                        <h1 className='text-2xl font-semibold text-gray-900'>Reserve a Room</h1>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className='text-gray-400 hover:text-gray-600 transition-colors duration-200'
                        >
                            <FontAwesomeIcon icon={faClose} className='text-2xl' />
                        </button>
                    </div>

                    <div className='p-6'>
                        <h2 className='text-lg font-medium text-gray-700 mb-4'>Select Your Room</h2>

                        {data.map((item) => (
                            <div key={item._id} className='mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
                                <div className='mb-4'>
                                    <h3 className='text-xl font-bold text-gray-900'>{item.title}</h3>
                                    <p className='text-gray-600 mt-2'>{item.description}</p>
                                    <div className='mt-3 text-gray-700'>
                                        Max People: <span className='font-bold'>{item.maxPeople}</span>
                                    </div>
                                </div>

                                <div className='grid grid-cols-3 gap-3'>
                                    {item.roomNumbers.map((room) => (
                                        <div
                                            key={room._id}
                                            className='flex items-center space-x-2 bg-white p-3 rounded-md shadow-sm border border-gray-200'
                                        >
                                            <input
                                                type='checkbox'
                                                id={`room-${room._id}`}
                                                value={room._id}
                                                onChange={handleChecked}
                                                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:bg-gray-200 disabled:cursor-not-allowed'
                                                disabled={!isAvailable(room)}
                                            />
                                            <label
                                                htmlFor={`room-${room._id}`}
                                                className='text-sm text-gray-700 cursor-pointer'
                                            >
                                                Room {room.number}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className='flex items-center justify-center p-4 border-t border-gray-200'>

                            <button className="bg-[#006ce4] text-white px-5 py-2 w-96 disabled:cursor-not-allowed disabled:bg-black/50 " disabled={selectedRooms.length === 0}
                                onClick={handleReserve}
                            >Reserve Now </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default ReserveRoom