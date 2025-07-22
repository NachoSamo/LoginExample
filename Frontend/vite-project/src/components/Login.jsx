import React from "react";
import { useForm } from "react-hook-form";
import Register from "./register";

const Login = (onSave) => {

  const { register, handleSubmit, formState:{ errors }} = useForm()

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input type="text" 
          className="form-input" {...register('username', {required: "username is obligatory"})}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input className="form-input"
          {...register('password', {required:"password is obligatory"})} />
          {errors.password && <p>{errors.password.message }</p>}
        </div>
        <button type="submit">Login</button>
      </form>
        <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
}

export default Login;