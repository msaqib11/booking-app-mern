import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingDetails } = location.state || {
    bookingDetails: {
      hotelName: "Sample Hotel",
      checkIn: new Date().toLocaleDateString(),
      checkOut: new Date(Date.now() + 86400000).toLocaleDateString(),
      roomNumbers: ["101", "102"],
      totalRooms: 2,
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="text-center py-8 border-b border-gray-200">
          <div className="flex justify-center mb-4">
            <FontAwesomeIcon icon={"fas fa-check"} className="text-4xl text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Thank You for Your Reservation!</h1>
          <p className="mt-2 text-lg text-gray-600">
            Your booking has been confirmed and we are excited to host you.
          </p>
        </div>

        {/* Booking Details Section */}
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500">Hotel</p>
              <p className="text-lg font-medium text-gray-900">{bookingDetails.hotelName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Number of Rooms</p>
              <p className="text-lg font-medium text-gray-900">{bookingDetails.totalRooms}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Check-in Date</p>
              <p className="text-lg font-medium text-gray-900">{formatDate(bookingDetails.checkIn)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Check-out Date</p>
              <p className="text-lg font-medium text-gray-900">{formatDate(bookingDetails.checkOut)}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Room Numbers</h3>
            <div className="flex flex-wrap gap-2">
              {bookingDetails.roomNumbers.map((room, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  Room {room}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Return to Home
            </button>
            {/* <button
              onClick={() => window.print()}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Print Confirmation
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;