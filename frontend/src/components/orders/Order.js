import { Card, CardBody, CardHeader, Tooltip, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import OrderItem from './OrderItem';
import { formatPrice } from '../../utils/formating';
import { KeyboardArrowDown } from '@mui/icons-material';

const Order = ({ order }) => {
    let { _id, orderDate, orderDetails, totalAmount, orderStatus, shippingAddressId: address } = order;
    orderDate = new Date(orderDate).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    totalAmount = formatPrice(totalAmount)

    const getDeliveryDate = () => {
        const currentDate = new Date();
        const randomNumberOfDays = Math.floor(Math.random() * 12) + 1;
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + randomNumberOfDays);

        // Format the date as "Tuesday, 10 October"
        var options = { weekday: 'long', day: 'numeric', month: 'long' };
        var formattedDate = futureDate.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    const deliveryDate = getDeliveryDate();

    const renderStatusComponant = () => {
        return (
            <Typography variant='h6' color='black'>{orderStatus !== 'delivered' ? `Arriving ${deliveryDate}` : ''}</Typography>
        );
    }

    return (
        <Card className="rounded flex border-2 border-gray-200 m-1">
            <CardHeader
                floated={false}
                shadow={false}
                className='rounded-none bg-blue-gray-50 border-b-2  m-0 p-4 flex flex-col md:flex-row gap-2 md:gap-6'
            >
                <div className=''>
                    <Typography variant='small' className=''>ORDER PLACED</Typography>
                    <Typography variant='small' className=''>{orderDate}</Typography>
                </div>
                <div>
                    <Typography variant='small' className=''>TOTAL</Typography>
                    <Typography variant='small' className=''>{totalAmount}</Typography>
                </div>
                <div>
                    <Typography variant='small' className=''>SHIP TO</Typography>
                    <Tooltip
                        content={<div>
                            <Typography variant='h6'>{address.firstName + " " + address.lastName}</Typography>
                            <Typography variant='small'>{address.address}</Typography>
                            <Typography variant='small'>{address.city + ", " + address.country}</Typography>
                            <Typography variant='small'>{address.pinCode}</Typography>
                        </div>}
                        className='bg-white text-gray-600 rounded-sm border border-gray-700'

                    >
                        <Typography variant='small' className='hover:cursor-pointer hover:border-b w-min hover:border-indigo-900 hover:text-indigo-900'>
                            <span className='whitespace-nowrap'>{address.firstName}<KeyboardArrowDown /></span>
                        </Typography>
                    </Tooltip>
                </div>
                <div className='md:ml-auto'>
                    <Typography variant='small'>
                        ORDER # {_id}
                    </Typography>
                    <div className='flex gap-4'>
                        <Typography variant='small' className='whitespace-nowrap hover:cursor-pointer hover:border-b w-min hover:border-indigo-900 hover:text-indigo-900'>View order details</Typography>
                        <Typography variant='small' className='whitespace-nowrap hover:cursor-pointer hover:border-b w-min hover:border-indigo-900 hover:text-indigo-900'>Invoice<KeyboardArrowDown /></Typography>
                    </div>

                </div>
            </CardHeader>
            <CardBody className='flex flex-col-reverse md:flex-row justify-between'>
                <div className='md:w-3/4'>
                    {renderStatusComponant()}
                    {orderDetails.map((item, index) => {
                        return <OrderItem key={index} item={item} />;
                    })}
                </div>
                <div className='md:w-1/4 p-2 flex flex-col items-center justify-center'>

                    <div className='space-y-2 w-full'>
                        <Button fullWidth className='normal-case py-2'>
                            Track package
                        </Button>
                        <Button variant='outlined' fullWidth className='normal-case py-2'>
                            View or edit order
                        </Button>
                    </div>
                </div>
            </CardBody>

        </Card>
    )
}

export default Order