import React from "react";
import {useForm} from 'react-hook-form';

const Register = (onSave, onCancel) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleCancel = () => {
    reset();
    if (onCancel) onCancel();
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            className="form-input"
            {...register('name', { required: 'Name is obligatory' })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            {...register('surname', { required: 'Surname is obligatory' })}
          />
          {errors.surname && <p>{errors.surname.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            {...register('username', { required: 'Username is obligatory' })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is obligatory',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'Password is obligatory',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d).+$/,
                message: 'Password must contain at least one uppercase letter and one number'
              }
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            {...register('confirmPassword', {
              required: 'Confirm password is obligatory',
              validate: (value, formValues) =>
                value === formValues.password || 'Passwords do not match'
            })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">Register</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
}

export default Register;