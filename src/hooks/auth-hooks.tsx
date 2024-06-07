import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth/auth';
import { LoginBody, SignUpBody } from '../types';
import axios from "axios";

export function useLogin() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (formData: LoginBody) => {
    try {
      await AuthService.login(formData);
      setError(null);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message);
      } 
    }
  };

  return { error, login };
}

export function useRegister() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const register = async (formData: SignUpBody) => {
    try {
      await AuthService.register(formData);
      setError(null);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message);
      }
    }
  };

  return { error, register }
};
// }
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthService from '../services/auth/auth';
// import axios from 'axios';
// import { AuthResponse, LoginBody, SignUpBody } from '../types';

// export function useAuth() {
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleAuth = async <T extends LoginBody | SignUpBody>(
//   authFunction: (formData: T) => Promise<AuthResponse>,
//   formData: T
// ) => {
//   try {
//     await authFunction(formData);
//     setError(null);
//     navigate('/');
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       setError(error.response?.data?.message);
//     }
//   }
// };

//   return { error, handleAuth };
// }

// export function useLogin() {
//   const { error, handleAuth } = useAuth();

//   const login = async (formData: LoginBody) => {
//     await handleAuth(AuthService.login, formData);
//   };

//   return { error, login };
// }

// export function useRegister() {
//   const { error, handleAuth } = useAuth();

//   const register = async (formData: SignUpBody) => {
//     await handleAuth(AuthService.register, formData);
//   };

//   return { error, register };
// }
