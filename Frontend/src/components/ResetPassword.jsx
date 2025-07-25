import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../services/authService';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/styles.css';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm({
        // Pre-rellena el email si viene del state de la navegación
        defaultValues: {
            email: location.state?.email || ''
        }
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const newPassword = watch("newPassword", "");

    const onSubmit = async (data) => {
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await resetPassword(data);
            setMessage(response.msg + " You will be redirected to the login page shortly.");

            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="content-card">
                <h2>Set New Password</h2>
                <p style={{marginBottom: '25px', fontSize: '0.9em'}}>
                    Enter the code you received and choose a new password.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            {...register('email', { required: 'Email is required' })}
                            readOnly={!!location.state?.email}
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="code">6-digit Code</label>
                        <input
                            type="text"
                            id="code"
                            className="form-input"
                            {...register('code', {
                                required: 'Code is required',
                                pattern: {
                                    value: /^\d{6}$/,
                                    message: 'Code must be 6 numeric digits'
                                }
                            })}
                        />
                        {errors.code && <p className="error-message">{errors.code.message}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="form-input"
                            {...register('newPassword', {
                                required: 'New password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                        />
                        {errors.newPassword && <p className="error-message">{errors.newPassword.message}</p>}
                    </div>

                    <div className='form-group'>
                        <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-input"
                            {...register('confirmPassword', {
                                required: 'Please confirm your new password',
                                validate: value => value === newPassword || 'The passwords do not match'
                            })}
                        />
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="button-group">
                        <button type="submit" className="form-button btn-primary" disabled={loading}>
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                </form>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message" style={{textAlign: 'center', marginTop: '15px'}}>{error}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;