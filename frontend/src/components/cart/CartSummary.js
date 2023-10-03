import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import routeNames from '../../constants/routeNames';
import { formatPrice } from '../../utils/formating';
import { setProducts } from '../../state/actions/checkout';

const CartSummary = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    let { total, itemCount } = cart;
    const navigate = useNavigate();
    total = formatPrice(total);

    const handleCheckout = (e) => {
        e.preventDefault();
        // ADD Products to Order
        dispatch(setProducts(cart.items));
        navigate(routeNames.CHECKOUT);
    }

    return (
        <div>
            {/* Sticky order summary for mobile */}
            <div className='md:hidden fixed bottom-0 left-0 w-full bg-white p-4'>
                <h2 className='text-lg font-semibold mb-2'>
                    Summary
                </h2>
                <p className='text-gray-500'>
                    Total Amount: {total}
                </p>
                {/* Add "Order Now" button or any other checkout functionality */}
                <button
                    className='bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 w-full'
                    onClick={handleCheckout}
                >
                    Proceed to Buy ({itemCount} {itemCount > 1 ? 'items' : 'item'})
                </button>
            </div>

            {/* Desktop devices */}
            <div className='fixed hidden md:block'>
                <div className='bg-white p-4'>
                    <h2 className='text-lg font-semibold mb-2'>
                        Summary
                    </h2>
                    <p className='text-gray-500'>
                        Total Amount: {total}
                    </p>
                    {/* Add "Order Now" button or any other checkout functionality */}
                    <button
                        className='bg-blue-500 max-w-full text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 '
                        onClick={handleCheckout}
                    >
                        Proceed to Buy ({itemCount} {itemCount > 1 ? 'items' : 'item'})
                    </button>

                </div>
            </div>
        </div>
    )
}

export default CartSummary