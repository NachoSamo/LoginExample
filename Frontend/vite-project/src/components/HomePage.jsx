import React from "react";

const HomePage = () => {
    return (
        <div className="home-container">
        <h1>Welcome to the Home Page</h1>
        <p>This is the main page of the application.</p>
        <p><a href="/login">Login</a> or <a href="/register">Register</a></p>
        </div>
    );
    }

export default HomePage;