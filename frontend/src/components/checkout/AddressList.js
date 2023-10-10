import { useEffect, useState } from 'react';
import { Axios } from '../../Axios';
import API_URLS from '../../constants/apiUrls';
import Address from './Address';
import Loader from '../layout/loader/Loader';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setDeliveryAddress } from '../../state/actions/checkout';
import { enqueueSnackbar } from 'notistack';
import { Card, Button, Typography, Radio } from '@material-tailwind/react';

const AddressList = () => {
    const dispatch = useDispatch();
    const deliveryAddress = useSelector((state) => state.checkout.address);
    const handleDeliveryAddressChange = (address) => {
        dispatch(setDeliveryAddress(address));
    }

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addressToUpdate, setAddressToUpdate] = useState({});

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);


    // Rerender the addresses when the addresses array changes
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                setLoading(true);
                const response = await Axios.get(API_URLS.ADDRESS, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                const { data } = response;
                setAddresses(data);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchAddresses();
    }, []);

    useEffect(() => {
    }, [dispatch]);

    const handleAddAddress = async (addressData) => {
        try {
            setLoading(true);
            const response = await Axios.post(API_URLS.ADDRESS, addressData, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            const { data } = response;
            // Trigger a rerender by updating the addresses state
            setAddresses([...addresses, data]);
            enqueueSnackbar('Address added successfully', { variant: 'success' });
        }
        catch (error) {
            console.log(error);
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
        finally {
            setLoading(false);
            setIsAdding(false);
        }
    }

    const handleUpdateAddress = async (addressData) => {
        try {
            setLoading(true);
            const response = await Axios.put(API_URLS.ADDRESS + '/' + addressData._id
                , addressData, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            const { data } = response;
            // Trigger a rerender by updating the addresses state
            setAddresses(addresses.map((address) => {
                if (address._id === data._id) {
                    return data;
                }
                return address;
            }));
            enqueueSnackbar('Address updated successfully', { variant: 'success' });
        }
        catch (error) {
            console.log(error);
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
        finally {
            setLoading(false);
            setIsEditing(false);
            setAddressToUpdate({});
        }
    }

    const handleDeleteAddress = async (id) => {
        try {
            setLoading(true);
            const response = await Axios.delete(`${API_URLS.ADDRESS}/${id}`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            const { data } = response;
            // console.log(data);
            // Trigger a rerender by updating the addresses state
            setAddresses(addresses.filter((address) => address._id !== id));
            enqueueSnackbar('Address deleted successfully', { variant: 'success' });
        }
        catch (error) {
            console.log(error);
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
        finally {
            setLoading(false);
        }
    }





    const renderAddresses = () => {
        return addresses.map((address) => (
            <Card key={address._id}
                // if selectedaddress then add a border to it 
                className={
                    `${deliveryAddress?._id === address._id ? 'bg-gray-200' : ''
                    } p-3 hover:border-gray-300 border-2 hover:cursor-pointer`
                }
                onClick={() => {
                    handleDeliveryAddressChange(address);
                }}
            >
                <Radio
                    name='deliveryAddress'
                    label="Select"
                    defaultChecked={deliveryAddress?._id === address._id}
                />

                <Typography variant="h6">Address</Typography>
                <Typography>{address.firstName} {address.lastName}</Typography>
                <Typography>{address.address}</Typography>
                <Typography>{address.city}, {address.state}, {address.country}, {address.pinCode}</Typography>
                <Typography>{address.mobileNumber}</Typography>

                <div className='space-x-2'>
                    <Button variant='outlined' color='gray' size='sm' onClick={
                        () => {
                            setIsEditing(true);
                            setAddressToUpdate(address);
                        }
                    }>
                        <Edit />
                    </Button>
                    <Button variant='outlined' color='red' size='sm' onClick={() => handleDeleteAddress(address._id)}>
                        <Delete />
                    </Button>
                </div>

            </Card>
        ));
    };
    return loading ?
        <Loader /> : (
            <>
                <Typography variant="h5" className='mb-4'>
                    {isAdding ? 'Add' : isEditing ? 'Edit' : 'Shipping'} address
                </Typography>
                {
                    isAdding ? (
                        <Address onSubmit={handleAddAddress} editing={setIsAdding} />
                    ) :
                        isEditing ? (
                            <Address onSubmit={handleUpdateAddress} address={addressToUpdate} editing={setIsEditing} />
                        ) :
                            <div className='space-y-4'>
                                {renderAddresses()}
                                <Button onClick={() => setIsAdding(true)}>
                                    Add Address
                                </Button>
                            </div>

                }
            </>
        );
}

export default AddressList;