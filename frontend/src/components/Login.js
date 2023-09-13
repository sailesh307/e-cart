import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import routeNames from "../constants/routeNames";
import { useDispatch } from "react-redux";
import { loginUser } from "../state/actions/authActions";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /// ui 
    const [formData, setFormData] = useState({
        email: 'vision@gmail.com',
        password: '123456',
    });

    const [passwordVisible, setPasswordVisible] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        await dispatch(loginUser(formData.email, formData.password));
        if (localStorage.getItem('token')) {
            navigate(routeNames.HOME);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="../logo192.png"
                        alt="Company Logo"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" autoComplete="false" onSubmit={handleLogin}>
                        <div>
                            <div className="flex items-center">
                                <FaEnvelope className="text-gray-500 mr-2" />
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                            </div>

                            <div className="mt-2">
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
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <FaLock className="text-gray-500 mr-2" />
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                        Forgot password?
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
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
                                        setPasswordVisible(!passwordVisible);
                                    }}
                                    className="text-gray-500 ml-2 focus:outline-none"
                                >
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to={routeNames.SIGNUP} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;