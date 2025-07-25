import apiClient from "./api";

const register = async (userData) => {
    try {
        const response = await apiClient.post('auth/register', userData);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user)); // stringify es una función que convierte un objeto JavaScript en una cadena JSON
        }
        return response.data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
};

const login = async (credentials) => {
    try {
        const response = await apiClient.post('auth/login', credentials);

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);

            localStorage.setItem('user', JSON.stringify(response.data.user))
        }
    return response.data;
    }
    catch(error) {
        console.error("Error during login:", error.response.data);
        throw error;
    }
};

const logout = async() => {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
};

const forgotPassword = async (email) => {
    try {
        const response = await apiClient.post('auth/forgot-password', { email });
        return response.data;
    } catch (error) {
        console.error("Error during forgot password:", error);
        throw error;
    }
}

const resetPassword = async (data) => {
    try {
        const response = await apiClient.post('auth/reset-password', data);
        return response.data;
    } catch (error) {
        console.error("Error during reset password:", error);
        throw error;
    }
}


export {
    logout,
    login,
    register,
    forgotPassword,
    resetPassword
}
