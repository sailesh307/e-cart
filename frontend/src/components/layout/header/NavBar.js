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
            <header className="w-full bg-primary text-primary-text">
                <nav aria-label="Top" className="mx-auto p-1 px-2 md:px-8">
                    <div className="flex h-12 justify-between items-center">
                        {/* Logo */}
                        <Link to={routeNames.HOME} className="mr-2 p-1 hover:border">
                            <img
                                className="h-10 w-auto"
                                src='./logo.svg'
                                alt="E-Cart"
                            />
                        </Link>
                        {/* Searchbar for big screens*/}
                        <div className='w-full hidden md:block'>
                            <SearchBar />
                        </div>
                        <div className="ml-1 flex items-center ">
                            <div className='hover:border p-1'>
                                <DropDown />
                            </div>
                            {/* Cart */}
                            <Link to={routeNames.CART} className="p-2 hover:border">
                                <Badge
                                    invisible={!itemCount}
                                    content={itemCount}
                                    className='font-bold text-blue-gray-600 bg-transparent -translate-x-0 -translate-y-1.5'>
                                    <ShoppingCart
                                        className="text-white scale-125"
                                        aria-hidden="true"
                                    />
                                </Badge>
                            </Link>
                        </div>
                    </div>

                    {/* Searchbar for mobile */}
                    <div className='w-full mt-1 md:hidden'>
                        <SearchBar />
                    </div>

                </nav>
            </header>
        </div>
    );
}

export default NavBar;