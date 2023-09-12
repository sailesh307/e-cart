import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons from react-icons
import { Link, useNavigate } from 'react-router-dom';
import routeNames from '../constants/routeNames';
import { useDispatch } from 'react-redux';
import { signupUser } from '../state/actions/authActions';

const Signup = () => {
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();



    ///////// ui
    const [formData, setFormData] = useState({
        username: 'vision',
        email: 'vision@gmail.com',
        password: '123456',
        cpassword: '123456',
        role: 'customer',
    });

    const [passwordVisible, setPasswordVisible] = useState({
        password: false,
        cpassword: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        // check if password and confirm password are same
        if (formData.password !== formData.cpassword) {
            alert('Password and Confirm Password do not match');
            return;
        }
        await dispatch(signupUser(formData.username, formData.email, formData.password, formData.role));
        if (localStorage.getItem('token')) {
            navigate(routeNames.HOME);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="./logo192.png"
                    alt="Your Company"
                />
                <h2 className="mt-10 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSignup} className="space-y-6" autoComplete='false'>
                    <div>
                        <div className="mt-4 flex items-center">
                            <FaUser className="text-gray-500 mr-2" />
                            <label htmlFor="username" className="block text-gray-700">Username</label>
                        </div>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <div className="mt-4 flex items-center">
                            <FaEnvelope className="text-gray-500 mr-2" />
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <div className="mt-4 flex items-center">
                            <FaLock className="text-gray-500 mr-2" />
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                        </div>
                        <div className="flex items-center justify-between">
                            <input
                                type={passwordVisible.password ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setPasswordVisible({
                                        ...passwordVisible,
                                        password: !passwordVisible.password,
                                    });
                                }}
                                className="text-gray-500 ml-2 focus:outline-none"
                            >
                                {passwordVisible.password ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="mt-4 flex items-center">
                            <FaLock className="text-gray-500 mr-2" />
                            <label htmlFor="cpassword" className="block text-gray-700">Confirm Password</label>
                        </div>
                        <div className="flex items-center justify-between">
                            <input
                                type={passwordVisible.cpassword ? 'text' : 'password'}
                                id="cpassword"
                                name="cpassword"
                                value={formData.cpassword}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setPasswordVisible({
                                        ...passwordVisible,
                                        cpassword: !passwordVisible.cpassword,
                                    });
                                }}
                                className="text-gray-500 ml-2 focus:outline-none"
                            >
                                {passwordVisible.cpassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="mt-4 flex items-center">
                            <FaUserPlus className="text-gray-500 mr-2" />
                            <label htmlFor="role" className="block text-gray-700">Role</label>
                        </div>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="customer">Customer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to={routeNames.SIGNIN} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
