import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import '../style/styles.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userData = { userName: data.userName, password: data.password };
      await login(userData);
      navigate("/profile");
      window.location.reload(); 
    } catch (error) {
      setError('root.serverError', {
        type: 'manual',
        message: error.response?.data?.msg || "Login failed. Please check your credentials."
      });
    }
  };

  return (
    <div className="page-container">
      <div className="content-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.root?.serverError && <p className="error-message" style={{ textAlign: 'center' }}>{errors.root.serverError.message}</p>}

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              {...register('userName', { required: "Username is required" })}
            />
            {errors.userName && <p className="error-message">{errors.userName.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              {...register('password', { required: "Password is required" })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <div className="button-group">
            <button type="submit" className="form-button btn-primary">Login</button>
            <button type="button" onClick={() => navigate("/")} className="form-button btn-secondary">Cancel</button>
          </div>
        </form>

        <div className="form-links">
          <Link to="/forgot-password">Forgot your password?</Link>
          <p style={{ marginTop: '10px' }}>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;