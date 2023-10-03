import { Link } from 'react-router-dom';
import routeNames from '../../../constants/routeNames';
import { useSelector } from 'react-redux';

import SearchBar from './SearchBar';
import DropDown from './DropDown';
import { Badge } from '@material-tailwind/react';
import { ShoppingCart } from '@mui/icons-material';

const NavBar = () => {
    const { itemCount } = useSelector((state) => state.cart);
    return (
        <div className="sticky top-0 z-40">
            <header className="w-full bg-gray-50 border-b-2">
                <nav aria-label="Top" className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-1">
                        <div className="flex h-16 items-center">
                            {/* Logo */}
                            <Link to={routeNames.HOME} className="mr-2">
                                <img
                                    className="h-10 w-auto"
                                    src="../logo192.png"
                                    alt="E-Cart Logo"
                                />
                            </Link>



                            {/* Search */}
                            <SearchBar />

                            <div className="ml-4 flex items-center">
                                <DropDown />

                                {/* Cart */}
                                <Link to={routeNames.CART} className="hover:opacity-90 p-2">
                                    <Badge
                                        invisible={!itemCount}
                                        content={itemCount}
                                        className='text-blue-gray-600 bg-transparent -translate-x-0 -translate-y-1.5'>
                                        <ShoppingCart
                                            className="text-gray-400 scale-125"
                                            aria-hidden="true"
                                        />
                                    </Badge>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default NavBar;
