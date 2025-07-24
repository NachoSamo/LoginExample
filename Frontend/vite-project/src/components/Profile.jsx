import React from "react";
import { useAuth } from "../context/authContext";
import { getUserProfile } from "../services/userService"; 
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const { user , logoutContext } = useAuth();
    const navigate = useNavigate()

    if (!user) {
        return <p>Loading user data or user not found...</p>;
    }

    const handleLogout = () => {
        logoutContext()
        navigate('/')
    }

    return (
        <div className="profile container mt-5
            d-flex flex-column align-items-center">
            <h2>USER DATA</h2>
            <p><strong>Username:</strong>{user.UserName}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Surname:</strong> {user.surname}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;