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
