import { Input, Button, Checkbox, Typography } from '@material-tailwind/react';
import { useState } from 'react';

const Address = ({ onSubmit, address, editing }) => {
    const [addressData, setAddressData] = useState(address);
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setAddressData({
            ...addressData,
            [name]: type === 'checkbox' ? checked : value
        });
        // console.log(name, value, type, checked);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSubmit(addressData);
    }

    return (
        <form onSubmit={handleFormSubmit} onChange={handleChange}>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col sm:flex-row gap-4'>
                    <Input
                        required
                        name="firstName"
                        label="First name"
                        defaultValue={addressData?.firstName ?? ''}
                    />
                    <Input
                        required
                        name="lastName"
                        label="Last name"
                        defaultValue={addressData?.lastName ?? ''}
                    />
                </div>

                <Input
                    required
                    name="mobileNumber"
                    label="Mobile Number"
                    defaultValue={addressData?.mobileNumber ?? ''}
                />
                <Input
                    required
                    name="address"
                    label="Address"
                    defaultValue={addressData?.address ?? ''}
                />
                <div className='flex flex-col sm:flex-row gap-4'>
                    <Input
                        required
                        name="city"
                        label="City"
                        defaultValue={addressData?.city ?? ''}
                    />
                    <Input
                        required
                        name="state"
                        label="State"
                        defaultValue={addressData?.state ?? ''}
                    />
                </div>
                <div className='flex flex-col sm:flex-row gap-4'>
                    <Input
                        required
                        name="pinCode"
                        label="Pin Code"
                        defaultValue={addressData?.pinCode ?? ''}
                    />
                    <Input
                        required
                        name="country"
                        label="Country"
                        defaultValue={addressData?.country ?? ''}
                    />
                </div>
                <Checkbox
                    name="isDefault"
                    defaultChecked={addressData?.isDefault === true}
                    label={
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                        >
                            Make this my default address
                        </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                />
            </div>
            <div className='space-x-2'>
                <Button type="submit">
                    Save
                </Button>
                <Button type="button" variant='outlined'
                    onClick={() => {
                        editing(false);
                    }}
                >
                    Cancel
                </Button>
            </div>

        </form>
    )
}

export default Address