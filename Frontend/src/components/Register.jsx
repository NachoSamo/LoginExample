import React from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerService } from '../services/authService';
import '../style/styles.css';

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors }, setError, watch } = useForm();
  const navigate = useNavigate();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      await registerService(userData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      setError('root.serverError', {
        type: 'manual',
        message: error.response?.data?.msg || 'Error during registration'
      });
    }
  };

  return (
    <div className="page-container">
      <div className="content-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {errors.root?.serverError && <p className="error-message" style={{ textAlign: 'center' }}>{errors.root.serverError.message}</p>}

          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-input" {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Surname</label>
            <input className="form-input" {...register('surname', { required: 'Surname is required' })} />
            {errors.surname && <p className="error-message">{errors.surname.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" {...register('userName', { required: 'Username is required' })} />
            {errors.userName && <p className="error-message">{errors.userName.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-input" {...register('confirmPassword', { required: 'Please confirm your password', validate: value => value === password || "The passwords do not match" })} />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
          </div>

          <div className="button-group">
            <button type="submit" className="form-button btn-primary">Register</button>
            <button type="button" onClick={() => navigate("/login")} className="form-button btn-secondary">Cancel</button>
          </div>
        </form>

        <div className="form-links">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;