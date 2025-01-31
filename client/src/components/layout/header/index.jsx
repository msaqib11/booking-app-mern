import { faBed, faCalendarDays, faCar, faChevronDown, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react";

import { DateRange } from "react-date-range"
import { format } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Context } from "../../../context/contextApi";
import {  useNavigate } from "react-router-dom";
const Header = ({ type }) => {
    const { bookingDate, setBookingDate, bookingOPtions, bookingLocation,setBookingLocation } = useContext(Context);
    const [isDatePickerOpen, setIsDatePcikerOpen] = useState(false)
    const [isOPtionsOPen, setIsOPtionsOPen] = useState(false)
    const navigate = useNavigate()
    function handleDatePicker() {
        setIsDatePcikerOpen(!isDatePickerOpen)
    }

    function handleOptionToggle() {
        setIsOPtionsOPen(!isOPtionsOPen)
    }

    function handleLocationInput(e){
        setBookingLocation(e.target.value)
    }

    function submitSearchData(){
        navigate("/hotels",{state:{bookingLocation,timestamp:new Date()},replace:true})
    }
    return (
        <div className="bg-bookingBlue text-white flex justify-center relative">
            <div className="w-full max-w-container mt-5 md:mb-24 text-sm">
                <div className={`flex gap-10 ${type === "default" && "md:mb-20"} flex-wrap p-5 md:p-0`}>
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>
                {type === "default" && (
                    <div className="hidden md:block">
                        <h1 className="md:text-5xl font-extrabold">Find your next stay
                        </h1>
                        <p className="my-3 text-2xl">Search deals on hotels, homes, and much more...</p>
                    </div>
                )}
                {/* search */}
                <div className="md:h-8 w-full p-1 md:max-w-container bg-[#ffb700] border-2 border-[#ffb700] rounded-sm md:py-[34px] flex md:flex-row flex-col items-center justify-around gap-1 md:absolute md:-bottom-8 md:mt-0 mt-4">
                    <div className="relative bg-white rounded-sm md:w-96 w-full md:overflow-hidden">
                        <FontAwesomeIcon
                            icon={faBed}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl"
                        />
                        <input
                            type="text"
                            placeholder="Where are you going?"
                            className="py-5 pl-10 pr-3 border-none w-full focus:outline-none text-black placeholder:text-black placeholder:pl-3"
                            value={bookingLocation}
                            onChange={handleLocationInput}
                        />
                    </div>


                    <div className="bg-white w-full md:w-96 px-3 py-5  text-black flex items-center gap-3 rounded-sm cursor-pointer relative"

                    >
                        <FontAwesomeIcon icon={faCalendarDays} className="search-icons text-xl" />
                        <span
                            onClick={handleDatePicker}
                        >{`${format(bookingDate[0]?.startDate, "eee, MMM d")}`} - {`${format(bookingDate[0]?.endDate, "eee, MMM d")}`}</span>
                        {isDatePickerOpen &&
                            <DateRange
                                className="absolute top-[68px] left-0 shadow-sm rounded-md z-50 md:w-auto w-full"
                                editableDateInputs={true}
                                onChange={(item) => setBookingDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={bookingDate}
                            />

                        }
                    </div>
                    <div className="md:flex-1 w-full  bg-white py-5 px-3  text-black flex items-center gap-3 rounded-sm cursor-pointer relative">
                        <FontAwesomeIcon icon={faPerson} className="search-icons text-xl" />
                        <span
                            onClick={handleOptionToggle}
                        >{bookingOPtions.adults} adults · {bookingOPtions.children} children · {bookingOPtions.room} room</span>
                        <div className="ml-auto ">
                            <FontAwesomeIcon icon={faChevronDown}
                                onClick={handleOptionToggle}
                            />
                        </div>
                        {isOPtionsOPen && <BookingOptions />}
                    </div>
                    <div className="w-full md:w-auto">
                        <button className="bg-blue-600 py-4 px-6 text-xl rounded-sm w-full md:w-auto "
                        onClick={submitSearchData}
                        >Search</button> 
                    </div>
                </div>

            </div>
        </div>
    )
}


function BookingOptions() {
    const { bookingOPtions, setBookingOPttions } = useContext(Context)
    const minValues = Object.freeze({
        adults: 1,
        children: 0,
        room: 1
    });
    function handleOptions(name, operation) {
        return () => {
            setBookingOPttions((prev) => {
                return {
                    ...prev,
                    [name]: operation === "i" ? bookingOPtions[name] + 1 : bookingOPtions[name] - 1
                }
            })
        }
    }
    return (
        <div className="absolute top-[68px] left-0 shadow-sm rounded-md p-8 min-w-96 flex flex-col gap-1 z-40 bg-white">
            <div className="options-item">
                <div className="options-title">Adults</div>
                <div className="options-counter">
                    <button className="counter-button disabled-counter" onClick={handleOptions("adults", "d")}
                        disabled={bookingOPtions.adults <= minValues.adults}
                    > - </button>
                    <span> {bookingOPtions.adults} </span>
                    <button className="counter-button " onClick={handleOptions("adults", "i")}> + </button>
                </div>
            </div>
            <div className="options-item">
                <div className="options-title">Children</div>
                <div className="options-counter">
                    <button className="counter-button disabled-counter" onClick={handleOptions("children", "d")}
                        disabled={bookingOPtions.children <= minValues.children}
                    > - </button>
                    <span> {bookingOPtions.children} </span>
                    <button className="counter-button" onClick={handleOptions("children", "i")}> + </button>
                </div>
            </div>
            <div className="options-item">
                <div className="options-title">Rooms</div>
                <div className="options-counter">
                    <button className="counter-button disabled-counter" onClick={handleOptions("room", "d")}
                        disabled={bookingOPtions.room <= minValues.room}
                    > - </button>
                    <span> {bookingOPtions.room} </span>
                    <button className="counter-button" onClick={handleOptions("room", "i")}> + </button>
                </div>
            </div>
        </div>
    )
}

export default Header