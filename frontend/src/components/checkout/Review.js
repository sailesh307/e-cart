import { formatPrice } from '../../utils/formating';
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Typography,
    ListItemSuffix,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux';

const Review = () => {
    const { products, address, payment } = useSelector(state => state.checkout);

    const addressDetails = [
        address?.firstName + ' ' + address?.lastName,
        address?.address,
        address?.city,
        address?.state,
        address?.pinCode,
        address?.country,
        address?.mobileNumber
    ].join(', ');

    const { paymentMethod, paymentDetails } = payment;
    // console.log(address, payment);
    return (
        <>
            <Typography variant="h6" >
                Order summary
            </Typography>
            <List>
                {products.map((product, index) => {
                    const { image, name, price, quantity } = product;
                    return (
                        <ListItem key={index}>
                            <ListItemPrefix>
                                <Avatar variant="square" alt={name} src={image} className='object-scale-down object-center' />
                            </ListItemPrefix>
                            <div className='flex-1 overflow-hidden'>
                                <Typography variant="h6" color="blue-gray" className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                                    {name}
                                </Typography>
                                <Typography variant="small" color="gray">
                                    {quantity} x {formatPrice(price.selling)}
                                </Typography>
                            </div>
                            <ListItemSuffix>
                                <Typography variant="h6" color="blue-gray">
                                    {formatPrice(quantity * price.selling)}
                                </Typography>
                            </ListItemSuffix>
                        </ListItem>
                    )
                })
                }
                <ListItem className='font-bold text-gray-900'>
                    Shipping
                    <ListItemSuffix>
                        Free
                    </ListItemSuffix>
                </ListItem>
                <ListItem className='font-bold text-gray-900'>
                    Total
                    <ListItemSuffix>
                        {formatPrice(products.reduce((acc, product) => acc + product.price.selling * product.quantity, 0))}
                    </ListItemSuffix>
                </ListItem>
            </List>
            <div className='grid grid-cols-1 sm:grid-cols-2'>
                <div className='w-auto'>
                    <Typography variant="h6">
                        Shipping
                    </Typography>
                    <Typography >{addressDetails}</Typography>
                </div>
                <div className='flex flex-col w-auto'>
                    <Typography variant="h6">
                        Payment details
                    </Typography>
                    <Typography>{paymentMethod}</Typography>
                </div>
            </div>
        </>
    );
}

export default Review;