
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import HotelList from './pages/hotel-list'
import Hotel from './pages/hotel'
import Layout from './components/layout'
import AppContext from './context/contextApi'
import { Provider } from "react-redux"
import { store } from './store/store'
import Login from './pages/login'
import ThankYouPage from './pages/thank-you/index.jsx'
function App() {

  return (
    <Provider store={store}>
      <AppContext>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/hotels' element={<HotelList />} />
              <Route path='/hotel/:id' element={<Hotel />} />
              <Route path="/thank-you" element={<ThankYouPage/>} />
            </Route>
            <Route >
              <Route path='/login' element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext>
    </Provider>
  )
}

export default App
