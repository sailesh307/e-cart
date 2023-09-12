import { useSelector } from 'react-redux';
import CartSummary from './CartSummary';
import ShowCartItems from './ShowCartItems';
import { useNavigate } from 'react-router-dom';
import routeNames from '../../constants/routeNames';

export default function Cart() {
    // if there is no cart, show this message
    const cart = useSelector((state) => state.cart);
    const { itemCount } = cart;
    const navigate = useNavigate();
    return (
        <>
            {
                itemCount === 0 ? (
                    <div className='flex items-center justify-center h-screen' >
                        <div className='text-center' >
                            <h1 className='text-3xl font-semibold mb-2' > Your cart is empty </h1>
                            <p className='text-gray-500 mb-2' > Looks like you haven 't added any items to the cart yet </p>
                            <button onClick={() => {
                                navigate(routeNames.HOME)
                            }}
                                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600' > Browse Products </button>
                        </div>
                    </div>
                ) :
                    (<div className='flex flex-col md:flex-row h-screen'>
                        {/* Show items */}
                        <div className='md:w-2/3 mb-40'>
                            <ShowCartItems />
                        </div>

                        {/* Divider */}
                        <div className='border border-gray-200'></div>

                        {/* Show checkout */}
                        <div className='md:w-1/3'>
                            <CartSummary />
                        </div>
                    </div>)

            }

        </>
    );
}
