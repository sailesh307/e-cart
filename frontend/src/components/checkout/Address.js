import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useState } from 'react';

const Address = ({ onSubmit, address, editing }) => {
    const [addressData, setAddressData] = useState(address);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setAddressData({
            ...addressData,
            [name]: type === 'checkbox' ? checked : value
        });
        console.log(name, value, type, checked);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSubmit(addressData);
    }

    return (
        <form onSubmit={handleFormSubmit} onChange={handleChange}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        variant="standard"
                        value={addressData?.firstName ?? ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        variant="standard"
                        value={addressData?.lastName ?? ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="mobileNumber"
                        name="mobileNumber"
                        label="Mobile Number"
                        fullWidth
                        variant="standard"
                        value={addressData?.mobileNumber ?? ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address"
                        name="address"
                        label="Address"
                        fullWidth
                        variant="standard"
                        value={addressData?.address ?? ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        variant="standard"
                        value={addressData?.city ?? ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="state"
                        name="state"
                        label="State"
                        fullWidth
                        variant="standard"
                        value={addressData?.state ?? ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="pinCode"
                        name="pinCode"
                        label="Pin Code"
                        fullWidth
                        variant="standard"
                        value={addressData?.pinCode ?? ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        variant="standard"
                        value={addressData?.country ?? ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="isDefault" value={addressData?.isDefault ?? false} />}
                        label="Make this my default address"
                    />
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" type="submit">
                Save
            </Button>
            <Button variant="contained" color="secondary" type="button"
                onClick={() => {
                    editing(false);
                } }
            >
                Cancel
            </Button>
        </form>

    )
}

export default Address