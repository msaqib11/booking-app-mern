import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from "../../config/api.js";
import axios from "axios";
import {Link} from "react-router-dom"

function Hotels() {
  const [hotels, setHotels] = useState([])
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/hotels`)
        setHotels(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchHotels()
  }, [])

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="flex  items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Hotels</h2>
        <Link to="/add-hotel" className='px-5 py-3 rounded-sm bg-yellow-400 text-black'
        >Add Hotel</Link>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">ID</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">type</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Photos</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {
                hotels.map(hotel => {
                  return (
                    <tr key={hotel._id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{hotel._id}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-800 dark:text-gray-100">{hotel.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{hotel.type}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                      <div className="w-32 h-w-32 shrink-0 mr-2 sm:mr-3">
                            <img className="" src={hotel.photos[0]} width="100" height="100" alt={hotel.name} />
                          </div>
                      </td>
                      <td className="p-2 flex justify-center gap-x-3">
                        <button className='px-5 py-3 rounded-sm bg-green-500 text-white  '>Edit</button>
                        <button className='px-5 py-3 rounded-sm bg-red-500 text-white '>Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default Hotels;
