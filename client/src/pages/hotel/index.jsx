import { faBanSmoking, faBroom, faCircleArrowLeft, faDollarSign, faLocationDot, faPeopleRoof } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PhotosGalleryImages } from "../../utils/constants"
import { faProductHunt } from "@fortawesome/free-brands-svg-icons"
import { useContext, useState } from "react"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons/faCircleArrowRight"
import { useLocation, useNavigate } from "react-router-dom"
import useFetch from "../../hooks/useFetch.js"
import { Context } from "../../context/contextApi.jsx"
import { getDateRange } from "../../utils/dateUtil.js"
import { useSelector } from "react-redux"
import ReserveRoom from "../../components/reserve-room/index.jsx"
const Hotel = () => {
  const [sliderIndex, setSliderIndex] = useState(0)
  const Navigate = useNavigate()
  const [isSliderOPen, setIsSliderOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {bookingDate,bookingOPtions} = useContext(Context)
  const id = useLocation().pathname.split("/")[2]
  const { loading, error, data } = useFetch(`/hotels/find/${id}`)
  const getDatediff = getDateRange(bookingDate[0].startDate, bookingDate[0].endDate)
  const {currentUser} = useSelector((state) => state.user)
  function handleReserve() {
    if(currentUser){
     setIsModalOpen(true)
    }else{
      Navigate("/login")
    }
  }
  function handleSlider(i) {

    return () => {
      setSliderIndex(i)
      setIsSliderOpen(true)
    }
  }


  function handleClose() {
    setIsSliderOpen(false);
  }

  function handlePrev() {
    setSliderIndex(prev => (prev === 0 ? data.photos?.length - 1 : prev - 1));
  }

  function handleNext() {
    setSliderIndex(prev => (prev === data.photos?.length - 1 ? 0 : prev + 1));
  }
  return (
    <div className="flex justify-center mt-14 relative">
      {loading ? "loading please wait.." : (
        <div className="max-w-container w-full flex flex-col gap-3 md:p-0 p-3">
          {isSliderOPen && (
            (
              <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 text-4xl"
                  >
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </button>

                  {/* Navigation buttons */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 text-white hover:text-gray-300 z-50 text-4xl"
                  >
                    <FontAwesomeIcon icon={faCircleArrowLeft} />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 text-white hover:text-gray-300 z-50 text-4xl"
                  >
                    <FontAwesomeIcon icon={faCircleArrowRight} />
                  </button>

                  {/* Image container */}
                  <div className="max-w-5xl w-full max-h-[80vh] flex items-center justify-center">
                    <img
                      src={data.photos[sliderIndex]}
                      alt="photo-slider"
                      className="object-contain max-h-full w-auto max-w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          <h1 className="text-3xl font-semibold   ">{data.name}
          </h1>
          <div className="text-sm flex items-center gap-3">
            <FontAwesomeIcon icon={faLocationDot} />
            <span className="text-sm md:text-md">{data.address}, {data.distance} downTown
              Excellent location – rated 9.7/10!(score from 9 reviews)
              Real guests • Real stays • Real opinions
            </span>
          </div>
          <div>
            <span className="text-bookingBlue md:text-xl font-semibold text-sm">
              Book a stay over PKR 100K at this property and get a free airport taxi
            </span>
            <div className="mt-3 flex flex-wrap justify-between gap-1">
              {data.photos?.map((photo, index) => {
                return (
                  <div key={index} className="md:w-[33%] w-full cursor-pointer">
                    <img src={photo} alt="photo-gallery" onClick={handleSlider(index)} className="w-full object-cover" />
                  </div>
                )
              })}
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-5 mt-5">
              <div className="flex flex-col gap-2 flex-[3]">
                <p className="text-sm tracking-wide text-justify">{data.desc}

                  Distance in property description is calculated using © OpenStreetMap</p>
                <div>
                  <h1 className="font-semibold">Most popular facilities
                  </h1>
                  <div className="grid grid-cols-2 gap-3 md:gap-0 md:grid-cols-4 mt-4">
                    <div className="flex gap-2 items-center">
                      <FontAwesomeIcon icon={faProductHunt} className="text-[#008234]" />
                      <span>Free parking</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <FontAwesomeIcon icon={faPeopleRoof} className="text-[#008234]" />
                      <span>Family rooms
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <FontAwesomeIcon icon={faBanSmoking} className="text-[#008234]" />
                      <span>Non-smoking rooms
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <FontAwesomeIcon icon={faBroom} className="text-[#008234]" />
                      <span>Room service
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex  flex-col  gap-4 flex-1 bg-[#f0f6ff] p-5">
                <h1 className="text-md font-semibold">Property highlights
                </h1>
                <div className="flex gap-2">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p className="text-sm font-light">Top Location: Highly rated by recent guests (9.7)</p>
                </div>
                <div className="flex gap-2">
                  <FontAwesomeIcon icon={faProductHunt} />
                  <p className="text-sm font-light">Free Private Parking Available On Site
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon icon={faDollarSign} />
                  <p className="text-lg font-extrabold">{getDatediff * data.cheapestPrice * bookingOPtions.room} ({getDatediff} Nights)
                  </p>
                </div>
                <button className="bg-[#006ce4] text-white px-5 py-2" onClick={handleReserve}>Reserve </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <ReserveRoom setIsModalOpen={setIsModalOpen}  hotelID={id} />
      )}
    </div>
  )
}

export default Hotel