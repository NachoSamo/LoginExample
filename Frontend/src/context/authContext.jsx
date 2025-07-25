import React, { createContext, useState, useContext, useEffect } from "react";
import { logout as logoutService } from "../services/authService";

//en este archivo se crea el contexto de autenticación que se usará en toda la aplicación para manejar el estado del usuario autenticado y su token de sesión.

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }},[])

    const loginContext = (userData, userToken) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userToken);
        setUser(userData);
        setToken(userToken);
    };

    const logoutContext = () => {
        logoutService();
        setUser(null);
        setToken(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, loginContext, logoutContext }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
    return useContext(AuthContext);
}; //custom hook para no tener que escribir useContext(AuthContext) cada vez que queramos usarlo.