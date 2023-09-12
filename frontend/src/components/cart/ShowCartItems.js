import React from 'react'
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

const ShowCartItems = () => {
    const cart = useSelector((state) => state.cart);
    const { items } = cart;
    const products = items;
    return (
        <div className='p-4'>
            <h2 className='text-2xl font-semibold mb-4'>
                Shopping Cart
            </h2>
            {products.map((item, index) => (
                <CartItem key={ index } item={item} />
            ))
            }
        </div>
    )
}

export default ShowCartItems