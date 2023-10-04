import { useState } from 'react'
import routeNames from '../../../constants/routeNames'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../state/actions/userActions'
import { Link, useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Avatar,
} from "@material-tailwind/react";

const defaultUser = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'

const DropDown = () => {
    const { token, user } = useSelector((state) => state.user);
    const firstName = user?.firstName;
    const avatar = user?.avatar;
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
            {!token && <div className="flex items-center justify-center">
                <Link to={routeNames.SIGNIN} className="hover:text-gray-500 p-2">
                    Sign In
                </Link>
            </div>}
            {token &&
                <Menu>
                    <MenuHandler>
                        <Avatar
                            variant="circular"
                            alt="U"
                            size='lg'
                            className="cursor-pointer p-1.5"
                            src={avatar || defaultUser}
                        />
                    </MenuHandler>
                    <MenuList >
                        <MenuItem>{firstName}</MenuItem>
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