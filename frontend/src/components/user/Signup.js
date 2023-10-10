import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import routeNames from '../../constants/routeNames';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, signupUser } from '../../state/actions/userActions';
import { Card, Input, Checkbox, Button, Typography, Spinner, Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import { enqueueSnackbar } from 'notistack';

const Signup = () => {
    const { loading, error, user } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'customer',
    });

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleRoleChange = (role) => {
        setFormData({ ...formData, role })
    }

    const handleChange = (e) => {
        if (e.target.type === 'checkbox') {
            togglePasswordVisibility()
            return;
        }
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        dispatch(signupUser(formData));
    };

    useEffect(() => {
        if (user) {
            enqueueSnackbar('Signup Successful', { variant: 'success' });
            if (user.role === 'customer') {
                navigate(routeNames.HOME);
            } else {
                navigate(routeNames.ADMIN_DASHBOARD);
            }
        }
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
    }, [error, user, dispatch, navigate]);

    return (
        <div className='flex flex-1 min-h-full justify-center py-12'>
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to register.
                </Typography>
                <form
                    onSubmit={handleSignup}
                    onChange={handleChange}
                    className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                >
                    <div className="mb-4 flex flex-col gap-6">
                        <Input required size="lg" label="First Name" name='firstName' />
                        <Input required size="lg" label="Last Name" name='lastName' />
                        <Input required type='email' size="lg" label="Email" name='email' />
                        <Input required type={!passwordVisible ? "password" : 'text'} size="lg" label="Password" name='password' />
                        {/* select role */}
                        <Tabs value="customer">
                            <TabsHeader className='bg-gray-300'>
                                <Tab value='customer' onClick={() => handleRoleChange('customer')}>Customer</Tab>
                                <Tab value='seller' onClick={() => handleRoleChange('seller')}>Seller</Tab>
                            </TabsHeader>
                        </Tabs>
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="font-normal"
                            >
                                Show password
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button type='submit' fullWidth className="mt-6 flex items-center justify-center" >
                        {loading ? <Spinner  /> : 'Sign Up'}
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <Link to={routeNames.SIGNIN} className="font-medium text-gray-900">
                            Sign In
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default Signup;
