import  { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/slices/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faSignOutAlt, 
  faCog, 
  faBookmark, 
  faCreditCard 
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="h-14 bg-bookingBlue flex justify-center p-4 md:p-0">
      <div className="flex items-center justify-between w-full max-w-container text-white">
        <Link to={"/"}> 
          <span className="font-semibold text-2xl">Booking App</span>
        </Link>
        
        {currentUser ? (
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md"
            >
              <FontAwesomeIcon icon={faUser} />
              <span>{currentUser.username}</span>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                <div className="py-1">
                  <Link 
                    to="/profile" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-3" /> Profile
                  </Link>
                  <Link 
                    to="/bookings" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={faBookmark} className="mr-3" /> My Bookings
                  </Link>
                  <Link 
                    to="/settings" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={faCog} className="mr-3" /> Settings
                  </Link>
                  <Link 
                    to="/payments" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={faCreditCard} className="mr-3" /> Payments
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link 
              to="/register" 
              className="ml-2 border-none py-2 rounded-sm px-3 bg-white text-bookingBlue cursor-pointer text-sm"
            >
              Register
            </Link>
            <Link 
              to="/login" 
              className="ml-2 border-none py-2 rounded-sm px-3 bg-white text-bookingBlue cursor-pointer text-sm"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;