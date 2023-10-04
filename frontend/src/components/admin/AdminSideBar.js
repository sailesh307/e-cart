import { Link, useNavigate } from 'react-router-dom';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '../../state/actions/userActions';
import routeNames from '../../constants/routeNames';
import { useSnackbar } from 'notistack';

const navMenu = [
    {
        icon: <EqualizerIcon />,
        label: "Dashboard",
        ref: "/admin/dashboard",
    },
    {
        icon: <ShoppingBagIcon />,
        label: "Orders",
        ref: "/admin/orders",
    },
    {
        icon: <InventoryIcon />,
        label: "Products",
        ref: "/admin/products",
    },
    {
        icon: <AddBoxIcon />,
        label: "Add Product",
        ref: "/admin/new_product",
    },
    {
        icon: <GroupIcon />,
        label: "Users",
        ref: "/admin/users",
    },
    {
        icon: <AccountBoxIcon />,
        label: "My Profile",
        ref: "/account",
    },
    {
        icon: <LogoutIcon />,
        label: "Logout",
    },
];

const AdminSideBar = ({ activeTab, setSidebarOpen }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        navigate(routeNames.SIGNIN);
    }

    return (
        <aside className="sidebar z-50 min-h-screen fixed left-0 pb-14 max-h-screen bg-gray-800 text-white overflow-x-hidden border-r">
            <div className="flex items-center gap-3 bg-gray-700 p-2 rounded-lg shadow-lg my-4 mx-3.5">
                <Avatar
                    alt="Avatar"
                    src={user?.avatar?.url ?? 'https://assets.leetcode.com/users/avatars/avatar_1662869949.png' }
                />
                <div className="flex flex-col gap-0">
                    <span className="font-medium text-lg">{user?.firstName}</span>
                    <span className="text-gray-300 text-sm">{user?.email}</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="bg-gray-800 ml-auto rounded-full w-10 h-10 flex items-center justify-center">
                    <CloseIcon />
                </button>
            </div>

            <div className="flex flex-col w-full gap-0 my-8">
                {navMenu.map((item, index) => {
                    const { icon, label, ref } = item;
                    return (
                        <div key={index}>
                            {label === "Logout" ? (
                                <button onClick={handleLogout} className="w-full hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium">
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </button>
                            ) : (
                                <Link to={ref} className={`${activeTab === index ? "bg-gray-700" : "hover:bg-gray-700"} flex gap-3 items-center py-3 px-4 font-medium`}>
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </Link>
                            )}
                        </div>
                    )
                }
                )}
            </div>

            <div className="flex flex-col gap-1 bg-gray-700 p-3 rounded-lg shadow-lg mb-6  mx-3.5 overflow-hidden">
                <h5>Developed by:</h5>
                <div className="flex flex-col gap-0">
                    <a href="https://www.linkedin.com/in/sailesh307" target="_blank" rel="noreferrer" className="font-medium text-lg hover:text-blue-500">Sailesh Kumar</a>
                    <a href="mailto:sailesh953@gmail.com" className="text-gray-300 text-sm hover:text-blue-500">sailesh953@gmail.com</a>
                </div>
            </div>
        </aside>
    )
};

export default AdminSideBar