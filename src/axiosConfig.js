import axios from 'axios';
import tokenService from "./utils/token"
import AuthService from './services/auth/auth'

const app = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

app.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

app.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await AuthService.refreshToken();
        originalRequest.headers.Authorization = `Bearer ${token.data.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        AuthService.signOut();
      }
    }

    return Promise.reject(error);
  }
);

export default app;
