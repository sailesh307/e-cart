import { Link, useNavigate } from 'react-router-dom';
import routeNames from '../constants/routeNames';
import { useDispatch, useSelector } from 'react-redux';

import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { logoutUser } from '../state/actions/authActions';
import Search from './Search';

const NavBar = () => {
    // Access the itemCount from the Redux store
    const itemCount = useSelector((state) => state.cart.itemCount);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = () => {
        // TODO : If logout successfull then redirect to login page
        navigate(routeNames.SIGNIN);
        dispatch(logoutUser());
        
    };

    return (
        <div className="bg-white sticky top-0 z-40">
            <header className="w-full bg-white">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            {/* Logo */}
                            <Link to={routeNames.HOME} className="m-4">
                                <img
                                    className="h-10 w-auto"
                                    src="../logo192.png"
                                    alt="E-Cart Logo"
                                />
                            </Link>



                            {/* Search */}
<Search />

                            <div className="ml-auto flex items-center">
                                {localStorage.getItem('token') ? ( 
                                // <p >fff</p> logout button
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <Link to={routeNames.PROFILE} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            {''}
                                        </Link>
                                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                        <Link to={routeNames.LOGOUT} className="text-sm font-medium text-gray-700 hover:text-gray-800" onClick={handleLogout}>
                                            Logout
                                        </Link>
                                    </div>
                                ) : 
                                    
                                    (<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <Link to={routeNames.SIGNIN} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                        Sign in
                                    </Link>
                                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                    <Link to={routeNames.SIGNUP} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                        Create account
                                    </Link>
                                </div>)}

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link to={routeNames.CART} className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{itemCount}</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default NavBar;
