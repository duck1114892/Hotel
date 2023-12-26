import React, { useEffect, useState } from 'react';
import { Route, Redirect, Router } from 'react-router-dom';
import PermissionService from './PermissionService';

const PrivateRoute = ({ component: Component, requiredPermission, ...rest }) => {
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const fetchedPermissions = await PermissionService.getPermissions();
                setPermissions(fetchedPermissions);
            } catch (error) {
                console.error('Error fetching permissions:', error);
            }
        };

        fetchPermissions();
    }, []);

    const hasPermission = permissions.map(permission => permission.id).includes(requiredPermission);

    return (
        < Route
            {...rest}
            render={(props) =>
                hasPermission ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" /> // Chuyển hướng về trang chủ nếu không có quyền
                )
            }
        />

    );
};

export default PrivateRoute