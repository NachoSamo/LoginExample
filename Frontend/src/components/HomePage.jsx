import React from "react";

const HomePage = () => {
    return (
            <div style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div className="div-container justify-content-center align-items-center">
                    <h1>Welcome to the Home Page</h1>
                    <p>This is the main page of the application.</p>
                    <p><a href="/login">Login</a> or <a href="/register">Register</a></p>
                </div>
            </div>
        );
    }

            export default HomePage;