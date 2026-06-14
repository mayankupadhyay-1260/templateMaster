import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext =
    createContext();

export const AuthProvider = ({
    children,
}) => {
    const [token, setToken] =
        useState(
            localStorage.getItem(
                "token"
            )
        );

    const [
        isAuthenticated,
        setIsAuthenticated,
    ] = useState(!!token);

    useEffect(() => {
        if (token) {
            localStorage.setItem(
                "token",
                token
            );

            setIsAuthenticated(true);
        } else {
            localStorage.removeItem(
                "token"
            );

            setIsAuthenticated(false);
        }
    }, [token]);

    const login = (jwt) => {
        setToken(jwt);
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>
    useContext(AuthContext);