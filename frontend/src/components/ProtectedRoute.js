import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();
    const location = useLocation();

    // Show nothing while checking authentication
    if (loading) {
        return null;
    }

    if (!isLoggedIn) {
        // Save the intended path before redirecting
        localStorage.setItem('intendedPath', location.pathname);
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
