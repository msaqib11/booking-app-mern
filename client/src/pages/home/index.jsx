import Featured from "../../components/featured"
import BrowseByProperty from "../../components/browse-by-property"
import WeekendDeals from "../../components/weekend-deals"
const Home = () => {
  return (
    <div className="mt-12 flex flex-col gap-4  w-full max-w-container mx-auto md:p-0 p-4 ">
      <h1 className="text-2xl text-left font-bold mt-2">Trending destinations</h1>
      <p className="text-sm font-light">Most popular choices for travelers from Pakistan</p>
      <Featured/>
      <BrowseByProperty/>
      <WeekendDeals/>
    </div>
  )
}

export default Home