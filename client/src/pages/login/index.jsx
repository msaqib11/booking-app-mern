import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginFail, loginStart, loginSuccess } from '../../store/slices/userSlice';
import { API_BASE_URL } from '../../config/api.js'
import {Link, useNavigate} from "react-router-dom"
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { error } = useSelector((state) => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add login logic here
        console.log('Login attempt', { username, password });
        try {
            dispatch(loginStart())
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password }, { withCredentials: true })
            dispatch(loginSuccess(response.data.details))
            navigate("/")
        } catch (error) {
            dispatch(loginFail(error.response.data.message))
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                    <Link to={"/"}> <span className="font-semibold text-2xl">Booking App</span></Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center text-blue-600 hover:text-blue-800">
                            <FontAwesomeIcon icon={faGlobe} className="mr-2 w-5 h-5" />
                            English (US)
                        </button>
                        <button className="text-blue-600 hover:text-blue-800">
                            List your property
                        </button>
                        <button className="text-blue-600 hover:text-blue-800">
                            Support
                        </button>
                    </div>
                </div>
            </header>

            {/* Login Container */}
            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Or <a href="#" className="font-medium text-blue-600 hover:text-blue-500">create a new account</a>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">user name</label>
                                <input
                                    id="email"
                                    name="username"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="username address"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <FontAwesomeIcon icon={faSignInAlt} className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white py-4 text-center text-sm text-gray-600">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Login;