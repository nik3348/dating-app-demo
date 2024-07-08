import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/jwt-utils";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isLoggedIn()) {
        return <Navigate to="/" />;
    }
    return children;
};
