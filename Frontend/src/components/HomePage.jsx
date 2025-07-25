import React from "react";
import { Link } from "react-router-dom";
import '../style/styles.css';

const HomePage = () => {
    return (
        <div className="page-container">
            <div className="content-card">
                <h2>Welcome to Our App!</h2>
                <p>This is a sample application to demonstrate JWT authentication with React.</p>
                <div className="form-links">
                    <p>
                        Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to continue.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;