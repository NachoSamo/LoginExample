import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import '../style/styles.css';

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
            setMessage(response.msg + ' You will be redirected shortly...');

            // Redirigir al usuario a la página de reseteo después de 3 segundos
            setTimeout(() => {
                // Pasamos el email en el 'state' de la navegación para pre-rellenar el campo en la siguiente página
                navigate('/reset-password', { state: { email: data.email } });
            }, 3000);

        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="content-card">
                <h2>Recover Password</h2>
                <p style={{ marginBottom: '25px', fontSize: '0.9em' }}>
                    Enter your email to receive a recovery code.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>

                    <div className="button-group">
                        <button type="submit" className="form-button btn-primary" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Code'}
                        </button>
                    </div>
                </form>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message" style={{ textAlign: 'center', marginTop: '15px' }}>{error}</p>}

                <div className="form-links">
                    <Link to="/login">Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;