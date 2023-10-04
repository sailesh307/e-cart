import Grid from '@mui/material/Grid';
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
    console.log(address, payment);
    return (
        <>
            <Typography variant="h6" >
                Order summary
            </Typography>
            <List>
                {products.map((product) => {
                    const {_id, image, name, price, quantity } = product;
                    return (
                        <ListItem key={_id}>
                            <ListItemPrefix>
                                <Avatar variant="square" alt={name} src={image} />
                            </ListItemPrefix>
                            <div className='flex-1 overflow-hidden'>
                                <Typography variant="h6" color="blue-gray" className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                                    {name}
                                </Typography>
                                <Typography variant="small" color="gray">
                                    {quantity} x {formatPrice(price)}
                                </Typography>
                            </div>
                            <ListItemSuffix>
                                <Typography variant="h6" color="blue-gray">
                                    {formatPrice(quantity * price)}
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
                        {formatPrice(products.reduce((acc, product) => acc + product.price * product.quantity, 0))}
                    </ListItemSuffix>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{addressDetails}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography gutterBottom>{paymentMethod}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Review;