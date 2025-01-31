import { Outlet, useLocation } from "react-router-dom"
import Footer from "./footer"
import Header from "./header"
import Navbar from "./navbar"

const Layout = () => {
  const location = useLocation()
  const isHotelPage = location.pathname === "/hotels"
  const headerType = isHotelPage ? "hotels" : "default"
  return (
    <div>
      <Navbar />
      <Header type={headerType} />
      <Outlet />
      <Footer />

    </div>
  )
}

export default Layout