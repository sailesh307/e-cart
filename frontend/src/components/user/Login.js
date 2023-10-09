import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import routeNames from "../../constants/routeNames";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser } from "../../state/actions/userActions";
import { Card, Input, Checkbox, Button, Typography, Spinner } from "@material-tailwind/react";
import { enqueueSnackbar } from "notistack";

const Login = () => {
    const { loading, error, user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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


    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginUser(formData.email, formData.password));
    };

    useEffect(() => {
        if (user) {
            enqueueSnackbar('Login Successful', { variant: 'success' });
            if (user.role !== 'admin') {
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
                    Sign In
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to Login.
                </Typography>
                <form
                    onSubmit={handleLogin}
                    onChange={handleChange}
                    className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                >
                    <div className="mb-4 flex flex-col gap-6">
                        <Input required type='email' size="lg" label="Email" name='email' />
                        <Input required type={!passwordVisible ? "password" : 'text'} size="lg" label="Password" name='password' />
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
                        {loading ? <Spinner /> : 'Sign In'}
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Create new E-Cart account?{" "}
                        <Link to={routeNames.SIGNUP} className="font-medium text-gray-900">
                            Sign Up
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    )
}

export default Login;