import { useState } from "react";
import styles from '../styles/auth-style/auth.module.css'
import AuthService from '../services/auth/auth'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialFormState = {
  email: '',
  password: '',
};

const errors = '';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState(errors);

  const navigate = useNavigate();

  // const [remember, setRemember] = useState(false);

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await AuthService.login(formState.email, formState.password);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message);
      } 
    }
  };
  
  return (
    <div className={styles.login}>
      <img src="/assets/background-desktop.jpeg" alt="" className={styles.img}/>
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <h1 className={styles.login_title}>Login</h1>
        <div className={styles.login_inputs}>
          <div className={styles.login_box}>
            <input
              type="text"
              onChange={handleChange}
              name="email"
              id="email"
              value={formState.email}
              className={styles.login_input}
              placeholder="email" />
            <img
              src="/assets/email.svg" alt="display password icon"
              className={styles.login_email_icon}/>
          </div>
          <div className={styles.login_box}>
            <input
              type={ showPassword ? "text" : "password" }
              onChange={handleChange}
              name="password"
              id="password"
              value={formState.password}
              className={styles.login_input}
              placeholder="password" />
            <img
              src={showPassword ? "/assets/open-password.svg" : "/assets/close-password.svg"} alt="display password icon"
              className={styles.login_password_icon}
              onClick={() => setShowPassword((prev) => !prev)}/>
          </div>
          <div className={styles.login_error_message}>{ errorMessage }</div>
        </div>
        <div className={styles.login_check}>
          <div className={styles.login_check_box}>
            <input type="checkbox" className={styles.login_check_input} id="user-check"/>
            <label htmlFor="user-check" className={styles.login_check_label}>Remember me</label>
          </div>
          <Link to="/register" className={styles.login_register_link}>Forgot Password?</Link>
        </div>
        <button type="submit" className={styles.login_button}>Login</button>
        <div className={styles.login_register}>
          Don't have an account? <Link to="/register" className={styles.login_register_link}>Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
