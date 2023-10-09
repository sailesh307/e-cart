import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import routeNames from '../../constants/routeNames';
import { formatPrice } from '../../utils/formating';
import { setProducts } from '../../state/actions/checkout';
import { Button, Card, Typography } from '@material-tailwind/react';

const CartSummary = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    let { subTotal, shippingFee, itemCount } = cart;
    const navigate = useNavigate();
    subTotal = formatPrice(subTotal);

    const handleCheckout = (e) => {
        e.preventDefault();
        // ADD Products to Order
        dispatch(setProducts(cart.items));
        navigate(routeNames.CHECKOUT);
    }

    return (
        <div>
            <Card className='static bottom-0 md:top-0 w-full p-4 m-2'>
                <Typography variant='small'>
                    Shipping Fee: {shippingFee}
                </Typography>
                <Typography variant='lead'>
                    Subtotal: {subTotal}
                </Typography>
                {/* Add "Order Now" button or any other checkout functionality */}
                <Button
                    className='w-full md:w-auto'
                    onClick={handleCheckout}
                >
                    Proceed to Buy ({itemCount} {itemCount > 1 ? 'items' : 'item'})
                </Button>
            </Card>
        </div>
    )
}

export default CartSummary