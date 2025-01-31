import useFetch from "../../hooks/useFetch"
import { browseByPropertyData } from "../../utils/constants"
const BrowseByProperty = () => {
  const { loading, error, data } = useFetch("/hotels/countByType")
  return (
    <div className="mt-5">

      <h1 className="text-2xl text-left font-bold mt-4">Browse By Property</h1>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3">
        {loading ? 'loading please wait' : (
          <>
            {browseByPropertyData.map((item,index) => (
              <PropertyItem key={index} item={item} type={data[index]}  />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default BrowseByProperty

function PropertyItem(props) {
  const { item,type} = props 
  return (

    <div className="flex flex-col gap-3 drop-shadow-md cursor-pointer ">
      <img src={item.image} className="w-full h-full object-cover rounded-md" alt="hotels" />
      <span className="font-semibold text-xl">{type?.count} <span className="capitalize">{type?.type}</span></span>
    </div>
  )
}