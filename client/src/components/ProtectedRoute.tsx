import React from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { token } = React.useContext(AppContext);
    if (!token) {
        return <Navigate to="/" />;
    }
    return children;
};
