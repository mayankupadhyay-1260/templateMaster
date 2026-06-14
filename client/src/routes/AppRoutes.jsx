import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
import OTP from "../pages/OTP";
import Home from "../pages/Home";
import Products from "../pages/Products";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        children
    ) : (
        <Navigate to="/" />
    );
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/otp"
                    element={<OTP />}
                />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}