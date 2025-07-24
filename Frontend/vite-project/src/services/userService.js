import axios from 'axios';
import apiClient from './api';

const getAllUsers = async () => {
    try {
        const response = await apiClient.get('usuarios');
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

const getUserProfile = async (id) => {
    try {
        const response = await apiClient.get(`usuarios/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
} 

export {
    getAllUsers,
    getUserProfile,
};


