import axios from "axios";


// Create an Axios instance with a base URL and default headers
// This instance can be used to make API requests throughout the application
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/",
    headers: {
    "Content-Type": "application/json",
    }
});

// este interceptor agrega el token de autorización a cada solicitud
// lo que permite acceder a rutas protegidas
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
    
