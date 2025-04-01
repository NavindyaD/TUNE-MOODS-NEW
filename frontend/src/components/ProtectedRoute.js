// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth(); // Get login state from AuthContext

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />; // Redirect to login if not logged in
    }

    return children; // Render children (protected content) if logged in
};

export default ProtectedRoute;
