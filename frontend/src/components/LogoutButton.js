// src/components/Logout.js
import { useDispatch } from 'react-redux';
import { logoutUser } from '../state/actions/authActions';

const LogoutButton = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default LogoutButton;
