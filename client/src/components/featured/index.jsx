import { featuredData } from "../../utils/constants";
import useFetch from "../../hooks/useFetch.js";
const Featured = () => {
  const { data, loading, error } = useFetch("/hotels/countByCity?cities=delhi,miami")
 
  return (
    <div className="flex flex-col gap-6">
      {loading ? 'loading please wait' : (
        <>
          {/* First row with 2 items */}
          <div className="flex flex-wrap gap-6 justify-center cursor-pointer">
            <div
              className="w-full md:w-[calc(50%-12px)] h-80 bg-gray-100 rounded-lg overflow-hidden relative"
            >
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/688249.jpg?k=42442ea62b97c8d6b57b4b6171b406e6778a9b160b4ce0c69f53726b397c7d3e&o="
                alt="Lahore"
                className="w-full h-full object-cover"
              />
              <div className="flex gap-2 justify-between px-4 py-2 bg-white/80 absolute bottom-0 left-0 right-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">Lahore</span>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAtFBMVEX///8AAAAAAAAAAAAAAAD////3+Pfw9PHv7+/m7Obi6uPU39bK2MvI18vD08W8zb6yx7WwxLKtw6+kvKidt6GYs5uZs5uJp4yEpIiBooaAoIR4nH5ylXRrknBnjWpli2hchmFbhF5VgFtbf1tQfVRNe1NHdUpCckhBcEU/bUI6az46a0AyZjgwYjErYDEhWCgeWCUbVyMXUx4VUhwSUBkQTBcJSRAPSBALRBAPRA8GQQgGPQaUDIdTAAAABXRSTlMAESIzRJTdRHwAAADUSURBVBgZrcHNTsJgEIbR552ZGn9SuhGjceX935FegLJQQgKp8BXG+tUNyMbEc+DfCHFOSsHoiRMvIb6tONYpqBqO7CGojJGKnCqFUZmbNf2mcS/rYmYiUAINqF/dXSSbz6FNnKBypdZ2o1SXnWcmQRVK7Qigaz3BCKpLpTTsZ3tQQkkMMRKKK17NJVwjjInBXJvnbYQtexO4PIEHlNe53r4vPxZ5S2oRiB/DY/vWF+b3A4JgEgMMs67QUEBGUB1KAjvElkmAA8EpycRveRDinOTPvgBVx0dTBQSpBgAAAABJRU5ErkJggg==" alt="Lahore flag" className="h-5" />
                </div>
                <div>
                  <span className="text-lg font-medium">220 properties</span>
                </div>
              </div>
            </div>
            <div
              className="w-full md:w-[calc(50%-12px)] h-80 bg-gray-100 rounded-lg overflow-hidden relative"
            >
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/688249.jpg?k=42442ea62b97c8d6b57b4b6171b406e6778a9b160b4ce0c69f53726b397c7d3e&o="
                alt="Lahore"
                className="w-full h-full object-cover"
              />
              <div className="flex gap-2 justify-between px-4 py-2 bg-white/80 absolute bottom-0 left-0 right-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">Islamabad</span>
                  <img src="https://cf.bstatic.com/xdata/images/city/600x600/724981.jpg?k=d2a74ca55c128d783c4a6836713abe2ef7874ba2cc276b9f671df017ff24da19&o=" alt="Lahore flag" className="h-5" />
                </div>
                <div>
                  <span className="text-lg font-medium">17 properties</span>
                </div>
              </div>
            </div>
          </div>
          

          {/* Second row with 3 items */}
          <div className="flex flex-wrap gap-6 justify-center cursor-pointer">
            {featuredData.slice(2, 5).map((item, index) => (
              <div
                key={index}
                className="w-full md:w-[calc(33.33%-16px)] h-80 bg-gray-100 rounded-lg overflow-hidden relative"
              >
                <img
                  src={item.image}
                  alt={`Feature ${index + 2}`}
                  className="w-full h-full object-cover"
                />
                <div className="flex gap-2 items-center px-4 py-2 bg-white/80 absolute bottom-0 left-0 right-0">
                  <span className="text-lg font-medium">{item.title}</span>
                  <img src={item.flag} alt={`${item.title} flag`} className="h-5" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;