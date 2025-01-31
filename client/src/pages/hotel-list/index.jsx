import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { accommodations } from "../../utils/constants"
import { faHeart, faThumbsUp } from "@fortawesome/free-regular-svg-icons"
import { useLocation, useNavigate } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import { useContext, useEffect, useState } from "react"
import { Context } from "../../context/contextApi"
const HotelList = () => {
  const location = useLocation();
  const { bookingLocation } = useContext(Context);
  const [destination, setDestination] = useState("");
  const [minPrice, setMinPrice] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined);
  function getMinPrice(min) {
    setMinPrice(min);
  }
  function getMaxPrice(max) {
    setMaxPrice(max);
  }
  // Effect to update destination when location.state or bookingLocation changes
  useEffect(() => {
    const newDestination = location.state?.bookingLocation || bookingLocation || "";
    setDestination(newDestination);
  }, [location.state?.bookingLocation, location.state?.timestamp, bookingLocation]);
  const { loading, data } = useFetch(
    `/hotels?isFeatured=true&cities=${destination}${minPrice !== undefined ? `&min=${minPrice}` : ''
    }${maxPrice !== undefined ? `&max=${maxPrice}` : ''}`
  )
  return (
    <div className="flex justify-center mt-14">
      <div className="w-full max-w-container flex-col md:flex-row flex p-3 md:p-0 gap-6 md:gap-20">
        {/* filters */}
        <AccommodationFilter minPrice={getMinPrice} maxPrice={getMaxPrice} />
        <div className="flex-1">
          {loading ? "loading please wait" : (
            <>
              <div className="p-5 md:border grid grid-cols-1 gap-4">
                <div>
                  <h1 className="text-xl font-bold">{data.length} properties found in {destination}</h1> 
                </div>
                {data?.map((property) => <Hotels key={property.id} property={property}  />)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HotelList

function AccommodationFilter({ minPrice, maxPrice }) {

  function handleMinPrice(e) {
    minPrice(e.target.value);
  }
  function handleMaxPrice(e) {
    maxPrice(e.target.value);
  }
  return (
    <div className="border p-5 rounded-md w-full h-fit md:w-72 md:sticky top-4 drop-shadow-sm">
      <h1 className="font-bold">Filter by:</h1>
      <hr />
      <div className="mt-3">
        <div className="flex flex-col gap-2 items-center mb-4">
          <input type="text" placeholder="min price" className="w-full border border-gray-400 rounded-md p-2 text-sm" onChange={handleMinPrice} />
          <input type="text" placeholder="max price" className="w-full border border-gray-400 rounded-md p-2 text-sm" onChange={handleMaxPrice} />
        </div>
        <div className="mb-2">
          <h1 className=" font-bold">Sort by:</h1>
        </div>
        {accommodations.map((list, index) => (
          <div key={index} className="flex justify-between text-sm">
            <div className="flex gap-3 items-center">
              <div >
                <input type="checkbox" className="w-4 h-4 cursor-pointer" />
              </div>
              <div>{list.name}</div>
            </div>
            <div>{list.count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Hotels({ property }) {
  const navigate = useNavigate()
  const { _id: id, name, photos: imageUrl, address: location, desc: description, distance, rating, reviewCount = 190 } = property
  return (
    <div className={`flex flex-col md:flex-row gap-4 w-full  p-4 ${id === 1 ? "border-[#a3d7fc] shadow-[0_0_8px_#a3d7fc] bg-[#f0f6ff]" : "border border-[#e7e7e7] drop-shadow-sm"}`}>
      <div className="relative">
        <div className=" cursor-pointer md:w-52 border border-white">
          <img src={imageUrl[0]} alt="hotel-image" className="rounded-sm w-full" />
        </div>
        <div className="w-8 h-8 rounded-full bg-white  flex items-center justify-center absolute top-2 right-2 cursor-pointer hover:bg-white/95">
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
      <div className="w-full">
        <div className="flex  justify-between">
          <div className="flex gap-2 items-center">
            <h1 className="font-bold text-bookingBlue text-xl">{name}</h1>
            <FontAwesomeIcon icon={faThumbsUp} className="hidden md:block" />
          </div>
          <div className="flex gap-2 ">
            <div className="flex flex-col "><span className="font-semibold text-sm hidden md:block">Very Good</span>
              <span className="text-xs text-slate-600 hidden md:block">{reviewCount} Reviews</span>
            </div>
            <div>
              <div className="bg-[#003b95] w-9 h-9 flex items-center justify-center text-sm text-white rounded-md">
                {rating}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex text-sm gap-3">
            <span className="text-blue-600">{location}</span>
            <span className="text-slate-600">{distance} downTown</span>
          </div>
          <div className=" flex md:flex-row flex-col  gap-4 mt-4 text-wrap">
            <div className="flex-1">
              <p className="text-sm">{description}</p>
            </div>
            <div className="mt-3 md:mt-0">
              <button className="px-3 py-2 text-nowrap bg-blue-600 text-white rounded-sm" onClick={() => navigate(`/hotel/${id}`)} >Show Prices</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}