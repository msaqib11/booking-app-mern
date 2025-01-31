import { useState, useEffect } from "react"
import { API_BASE_URL } from '../config/api.js'

import axios from "axios"
function useFetch(url) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // This is the fetch function that will be used both initially and for refetching
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${API_BASE_URL}/${url}`)
            setData(response.data)
            setLoading(false)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [url])
    // Expose refetch function to manually trigger new fetches below is the use case of refetching
    // const { data, reFetch } = useFetch("/api/hotels");
    // const handleDelete = async (id) => {
    //   await deleteHotel(id);
    //   reFetch(); // Refresh the list after deletion
    // };
    const refetch = () => {
        fetchData()
    }
    return { data, loading, error, refetch }
}

export default useFetch

