import { createContext, useState } from 'react'


export const Context = createContext()
const AppContext = (props) => {
    const [bookingDate, setBookingDate] = useState([{
        startDate : new Date(),
        endDate : new Date(),
        key : "selection"
    }])

    const [bookingOPtions,setBookingOPttions] = useState({
        adults : 1,
        children : 0,
        room : 1
    })

    const [bookingLocation,setBookingLocation] = useState("")
    return (
        <Context.Provider
            value={{
                bookingDate,
                setBookingDate,
                bookingOPtions,
                setBookingOPttions,
                bookingLocation,
                setBookingLocation
            }}
        >
            {props.children}
        </Context.Provider>
    )
}

export default AppContext