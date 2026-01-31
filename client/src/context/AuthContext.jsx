import { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService, register as registerService, logout as logoutService, getCurrentUser } from '../api/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = getCurrentUser();
        setUser(user);
        setLoading(false);
    }, []);

    const login = async (userData) => {
        const user = await loginService(userData);
        setUser(user);
        return user;
    };

    const register = async (userData) => {
        const user = await registerService(userData);
        setUser(user);
        return user;
    };

    const logout = () => {
        logoutService();
        setUser(null);
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};