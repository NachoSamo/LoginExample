import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { register, handleSubmit, formState:{ errors }, setError } = useForm()

  const onSubmit = async (data) =>{

    try {
      
      const userData = {
      userName: data.userName,
      password: data.password,} // un array con los datos del login 

      await login(userData);
      // le pasamos a login() los parametros para que ande, esa funcion luego se 
      // encarga de validar si las credenciales son correctas

      navigate("/profile"); //redirigimos a profile
      window.location.reload(); //forzamos la recarga de la pagina je


    } catch (error) {

      console.error("Login failed:", error)
      setError('root.serverError', {
        type: 'manual',
        message: error.response?.data?.msg || "Error al iniciar sesión"})

    }
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/")
  }

  const handleRegister = () =>
  {
    navigate("/register")
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.root?.serverError && <p style={{color: 'red'}}>{errors.root.serverError.message}</p>}
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-input"
            {...register('userName', { required: "username is obligatory" })}
          />
          {errors.userName && <p>{errors.userName.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            className="form-input"
            type="password"
            {...register('password', { required: "password is obligatory" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
      <p>
        Don't have an account?{" "}
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            handleRegister();
          }}
          style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
        >
          Register here
        </a>
      </p>
    </div>
  );
}

export default Login;