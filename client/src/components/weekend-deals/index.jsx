import { addDays, format } from "date-fns"
import useFetch from "../../hooks/useFetch";
const WeekendDeals = () => {
    const Today = new Date()
    const twoDaysLater = addDays(new Date(), 2);
    const { loading, data, error } = useFetch('/hotels?isFeatured=true&limit=4')
    return (
        <div className="mt-5">
            {loading ? "loading" : (
                <>
                    <h1 className="text-2xl text-left font-bold mt-4">Deals for the weekend</h1>
                    <p className="text-sm font-light text-slate-700 mt-2">Save on stays for {format(Today, "eeee, d")} - {format(twoDaysLater, 'eeee, d')}</p>
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3">
                        {data?.map(item => (
                            <PropertyItem key={item._id} item={item} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default WeekendDeals

function PropertyItem(props) {

    function formatPriceInPKR(price) {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }

    const { name: title, photos, address: location, rating: Rating, cheapestPrice, city } = props.item
    return (
        <div className="flex flex-col gap-3 drop-shadow-md ">
            <div className="flex flex-col cursor-pointer">
                <img src={photos[0]} className="w-full h-full object-cover rounded-md" alt="hotels" />
                <div className="flex flex-col bg-white  gap-2  p-2">
                    <p className="font-semibold">{title}</p>
                    <div className="flex items-center gap-2">
                        <span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px"><path d="M15 8.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0m1.5 0a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0M12 1.5a6.75 6.75 0 0 1 6.75 6.75c0 2.537-3.537 9.406-6.75 14.25-3.214-4.844-6.75-11.713-6.75-14.25A6.75 6.75 0 0 1 12 1.5M12 0a8.25 8.25 0 0 0-8.25 8.25c0 2.965 3.594 9.945 7 15.08a1.5 1.5 0 0 0 2.5 0c3.406-5.135 7-12.115 7-15.08A8.25 8.25 0 0 0 12 0"></path></svg></span>
                        <span className="text-xs text-slate-600">{location}, {city}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#003b95] w-8 h-8 flex items-center justify-center text-sm text-white rounded-md">
                                {Rating}
                            </div>
                            <span className="text-sm">Excellent. </span>
                        </div>
                        <div className="flex items-center ml-auto gap-1">
                            {/* <p className="text-xs">PKR <span className=" text-red-500 line-through">{formatPriceInPKR(original)}</span></p> */}
                            <p className="font-semibold text-md"><span>PKR {formatPriceInPKR(cheapestPrice)}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}