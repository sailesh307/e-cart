import { useState, useEffect } from 'react';
import { Axios } from '../../Axios';
import API_URLS from '../../constants/apiUrls';
// import sampleData from './sampleData.json'
import Order from './Order';
import { enqueueSnackbar } from 'notistack';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Make the API call using Axios
        Axios.get(API_URLS.ALL_ORDERS, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                enqueueSnackbar(error, 'error')
                console.error('Error fetching orders:', error);
            });
    }, []); 
    return (
        <div className='min-h-screen p-4'>
            <h2 className='text-2xl font-semibold mb-4'>
                My Orders
            </h2>
            <ul>
                {orders.map((order) => (
                    <Order key={order._id} order={order} />
                ))}
            </ul>
        </div>
    );
};

export default OrderPage;
