import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography, Button } from '@material-tailwind/react';
import AddressList from './AddressList';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../state/actions/checkout';
import Loader from '../layout/loader/Loader';
import { Link } from 'react-router-dom';
import routeNames from '../../constants/routeNames';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const Checkout = () => {
  const checkoutDetails = useSelector(state => state.checkout);
  const dispatch = useDispatch();
  const { isPlacingOrder, isOrderPlaced, error } = checkoutDetails;
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(null);

  const handlePlaceOrder = async () => {
    const oNo = await dispatch(placeOrder());
    setOrderNumber(oNo);
    console.log('order no: ', oNo);
  }

  const handleNext = (e) => {
    if (e.target.value === 'Place order') {
      handlePlaceOrder();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressList />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ?
            isPlacingOrder ? <Loader /> : error ? <div>{error}</div> :
              (
                <>
                  <Typography variant="h5">
                    Thank you for your order.
                  </Typography>
                  <Typography variant="paragraph">
                    Your order number is <span className='font-bold'>#{orderNumber}</span>. We have emailed your order
                    confirmation, and will send you an update when your order has
                    shipped.
                  </Typography>
                  
                  <Link to={routeNames.ORDERS} className='flex flex-row justify-end'>
                    <Button variant='gradient'> View Orders</Button>
                  </Link>
                </>
              ) : (
              <>
                {getStepContent(activeStep)}
                <div className='flex justify-end gap-2 mt-2'>
                  {activeStep !== 0 && (
                    <Button variant='gradient' onClick={handleBack} >
                      Back
                    </Button>
                  )}

                  <Button
                    variant="gradient"
                    onClick={(e) => handleNext(e)}
                    value={activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </>
            )}
        </Paper>
      </Container>
    </>
  );
}

export default Checkout;