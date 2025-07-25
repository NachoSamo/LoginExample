import React from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { register as registerService } from '../services/authService';

const Register = () => {

  const { register, handleSubmit, reset, formState: { errors }, setError } = useForm();

  const navigate = useNavigate()

  const handleClean = () => {
    reset();
  };

  const handleCancel = () => {
    navigate("/login")
  }


  const onSubmit = async (data) => {
    try {
      const userData = { // creamos un map con toda la data que se ingresa en los inputs del form wachoo
        name: data.name,
        surname: data.surname,
        userName: data.username,
        email: data.email,
        password: data.password
      };

      await registerService(userData); // si esta funcion tira la buena procede a confirmar la creacion del usuario

      alert("Registation succesfull complete!");
      navigate("/login");
      window.location.reload();

    } catch (error) {
      console.error("Registration failed:", error);
      setError('root.serverError', {
        type: 'manual',
        message: error.response?.data?.msg || 'Error during registration'
      });
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}> 
      <div className="div-container justify-content-center align-items-center ">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.root?.serverError && <p style={{ color: 'red' }}>{errors.root.serverError.message}</p>}
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
          <button type="button" onClick={handleClean}> Clean </button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
        <p>Already have an account? <a
          href="#"
          onClick={e => {
            e.preventDefault();
            handleCancel();
          }}
          style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
        >
          Login here
        </a></p>
      </div>
    </div>
      );
}

      export default Register;