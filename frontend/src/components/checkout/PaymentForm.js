import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPayment } from '../../state/actions/checkout';
import { Input, Button, Typography, Tabs, TabsHeader, TabsBody, Tab, TabPanel, Card, CardHeader, CardBody } from '@material-tailwind/react';
import { CreditCard, Lock } from '@mui/icons-material';

function formatCardNumber(value) {
    const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
        return parts.join(" ");
    } else {
        return value;
    }
}

function formatExpires(value) {
    return value
        .replace(/[^0-9]/g, "")
        .replace(/^([2-9])$/g, "0$1")
        .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
        .replace(/^0{1,}/g, "0")
        .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}

const PaymentForm = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState('cod');
    const [cardNumber, setCardNumber] = useState('')
    const [cardExpires, setCardExpires] = useState('')
    const [paymentDetails, setPaymentDetails] = useState({});

    // TODO: Handle payment details change

    const handletypeChange = (type) => {
        setType(type);
        dispatch(setPayment({ paymentMethod: type, paymentDetails }))
    }
    return (
        <Card>
            <CardHeader floated={ false } shadow={false}>
                <Typography>* Currently Only Cash On Delivery Available</Typography>
            </CardHeader>
            <CardBody>
                <Tabs value={type} className='overflow-visible'>
                    <TabsHeader className="relative z-0 " onChange={handletypeChange}>
                        <Tab value='card' onClick={() => handletypeChange('card')}>Pay with Card</Tab>
                        <Tab value='cod' onClick={() => handletypeChange('cod')}>Cash On Delivery</Tab>
                    </TabsHeader>
                    <TabsBody>
                        <TabPanel value='card' className='p-0'>
                            <form className="flex flex-col gap-4">
                                <div className="my-6">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-4 font-medium"
                                    >
                                        Card Details
                                    </Typography>

                                    <Input
                                        label="Card Number"
                                        maxLength={19}
                                        value={formatCardNumber(cardNumber)}
                                        onChange={(event) => setCardNumber(event.target.value)}
                                        icon={
                                            <CreditCard className="h-5 w-5 text-blue-gray-300" />
                                        }
                                    />
                                    <div className="my-4 flex items-center gap-4">
                                        <Input
                                            label="Expires"
                                            maxLength={5}
                                            value={formatExpires(cardExpires)}
                                            onChange={(event) => setCardExpires(event.target.value)}
                                            containerProps={{ className: "min-w-[72px]" }}
                                        />
                                        <Input
                                            label="CVC"
                                            maxLength={4}
                                            containerProps={{ className: "min-w-[72px]" }}
                                        />
                                    </div>
                                    <Input label="Holder Name" />
                                </div>
                                <Button size="lg">Pay Now</Button>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                                >
                                    <Lock className="-mt-0.5 h-4 w-4" />
                                    Payments are secure and encrypted
                                </Typography>
                            </form>
                        </TabPanel>
                        <TabPanel value='cod' className='p-0'>
                            <div className='h-80 p-8'>
                                <Typography variant="small">
                                    You will pay in cash when your order is delivered.
                                </Typography>

                            </div>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </CardBody>
        </Card>
    );
}

export default PaymentForm;