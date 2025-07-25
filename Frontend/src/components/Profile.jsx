import React from "react";
import { useAuth } from "../context/authContext";
import { getUserProfile } from "../services/userService"; 
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const { user , logoutContext } = useAuth();
    const navigate = useNavigate()


    const handleLogout = () => {
        logoutContext()
        navigate('/')
    }

    return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}> 
        <div className="div-container justify-content-center align-items-center" >
            <h2>USER DATA</h2>
            <p><strong>Username:</strong>{user.UserName}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Surname:</strong> {user.surname}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
    );
}

export default Profile;