import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setMessage('');
        setError('');
        try {
            const response = await forgotPassword(data.email);
            setMessage(response.msg + ' You will be redirected in 3 seconds.');

            setTimeout(() => {
                navigate('/reset-password', { state: { email: data.email } });
            }, 3000);

        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div className="div-container justify-content-center align-items-center ">
                <h2>Recover Password</h2>
                <p>Please enter your email address to receive a password recovery code.</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Code'}
                    </button>
                </form>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="links">
                    <Link to="/login">Back to Login</Link>
                </div>
            </div>
        </div>
            );
};

            export default ForgotPassword;

