import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import '../style/styles.css';

const Profile = () => {
    const { user, logoutContext } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutContext();
        navigate('/');
    };

    if (!user) {
        return <div className="page-container"><p>Loading profile...</p></div>;
    }

    return (
        <div className="page-container"> 
            <div className="content-card">
                <h2>User Profile</h2>
                <div className="profile-data">
                    <p><strong>Username:</strong> {user.userName}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Surname:</strong> {user.surname}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
                <div className="button-group">
                    <button onClick={handleLogout} className="form-button btn-primary">Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;