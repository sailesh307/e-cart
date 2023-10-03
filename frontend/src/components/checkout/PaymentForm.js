import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setPayment } from '../../state/actions/checkout';

const PaymentForm = () => {
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [paymentDetails, setPaymentDetails] = useState({});

    // TODO: Handle payment details change

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
        dispatch(setPayment({paymentMethod, paymentDetails}))
    }
    return (
        <>
            <FormControl component="fieldset">
                <FormLabel component="legend">Select Payment Method</FormLabel>
                <RadioGroup
                    row
                    aria-label="paymentMethod"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                >
                    <FormControlLabel
                        value="card"
                        control={<Radio />}
                        label="Credit Card"
                    />
                    <FormControlLabel
                        value="cod"
                        control={<Radio />}
                        label="Cash On Delivery"
                    />
                </RadioGroup>
            </FormControl>

            {paymentMethod === 'card' && (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardName"
                            label="Name on card"
                            fullWidth
                            autoComplete="cc-name"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardNumber"
                            label="Card number"
                            fullWidth
                            autoComplete="cc-number"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="expDate"
                            label="Expiry date"
                            fullWidth
                            autoComplete="cc-exp"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cvv"
                            label="CVV"
                            helperText="Last three digits on signature strip"
                            fullWidth
                            autoComplete="cc-csc"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                            label="Remember credit card details for next time"
                        />
                    </Grid>
                </Grid>
            )}
            {paymentMethod === 'cod' && (
                <Typography variant="body1">
                    You will pay in cash when your order is delivered.
                </Typography>
            )}
        </>
    );
}

export default PaymentForm;