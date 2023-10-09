import React from 'react'
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({ children }) => {
    const { loading, token, user } = useSelector(state => state.user);
    return (
        <>
            {loading === false && (
                !token || user.role !== 'admin' ? children : children
            )}
        </>
    )
}

export default ProtectedRoutes