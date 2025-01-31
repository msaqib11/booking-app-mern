import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from "../../config/api.js";
import axios from "axios";
import {Link} from "react-router-dom"

function Users() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`, { withCredentials: true })
        setUsers(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="flex  items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Users</h2>
        <Link to="/add-user" className='px-5 py-3 rounded-sm bg-yellow-400 text-black'
        >Add user</Link>
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
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Phone</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {
                users.map(user => {
                  return (
                    <tr key={user._id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{user._id}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={user.image} width="40" height="40" alt={user.username} />
                          </div>
                          <div className="font-medium text-gray-800 dark:text-gray-100">{user.username}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{user.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{user.phoneNumber}</div>
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

export default Users;
