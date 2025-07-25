import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../services/authService';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: location.state?.email || ''
        }
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state?.email) {
            setValue('email', location.state.email);
        }
    }, [location.state?.email, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const resetData = {
                email: data.email,
                code: data.code,
                newPassword: data.newPassword,
            };

            const response = await resetPassword(resetData);

            setMessage(response.msg + " You will be redirected to the login page in 3 seconds.");

            setTimeout(() => {
                navigate('/login');
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
            <div className="div-container justify-content-center align-items-center">
                <h2>Reset Password</h2>
                <p>Enter your email, the code you received by email, and your new password.</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required' })}
                            readOnly={!!location.state?.email}
                            style={{ backgroundColor: location.state?.email ? '#e9ecef' : 'white' }}
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="code">6-digit Code:</label>
                        <input
                            type="text"
                            id="code"
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
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
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
                        <label htmlFor="confirmPassword">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: 'Please confirm your new password',
                                validate: value => value === getValues('newPassword') || 'Passwords do not match'
                            })}
                        />
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
            );
};

            export default ResetPassword;