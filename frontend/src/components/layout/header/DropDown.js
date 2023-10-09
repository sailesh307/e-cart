import routeNames from '../../../constants/routeNames'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../state/actions/userActions'
import { Link, useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem
} from "@material-tailwind/react";
import { PersonOutline } from '@mui/icons-material'

const DropDown = () => {
    const { token, user } = useSelector((state) => state.user);
    const firstName = user?.firstName;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(logoutUser());
        enqueueSnackbar('Logout Successful', { variant: 'success' });
        navigate(routeNames.SIGNIN);
    };

    return (
        <>
            {/* if not token */}
            {!token &&
                <Link to={routeNames.SIGNIN} className="flex flex-row items-center">
                    <span className='text-sm whitespace-nowrap'>Sign in</span>
                    <PersonOutline className='scale-125'/>
                </Link>
            }
            {token &&
                <Menu>
                    <MenuHandler>
                        <button className="flex flex-row items-center">
                            <span className='text-sm whitespace-nowrap'>{firstName}</span>
                            <PersonOutline className='scale-125' />
                        </button>
                    </MenuHandler>
                    <MenuList >
                        <MenuItem>My Profile</MenuItem>
                        <MenuItem>Orders</MenuItem>
                        <MenuItem onClick={handleLogout}>
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            }
        </>

    )
}

export default DropDown