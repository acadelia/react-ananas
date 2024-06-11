import { useEffect, useState } from "react";
import styles from '../styles/auth-style/auth.module.css'
import { Link } from "react-router-dom";
import { Input } from "../components";
import { useLogin } from "../hooks";
import BackgroundImage from "../components/BackgroundImage";
import AuthService from "../services/auth/auth";
import tokenService from '../utils/token'

const initialFormState = {
  email: '',
  password: '',
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { error, login } = useLogin();
//const [remember, setRemember] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    const token = tokenService.getToken();
    if (token) {
      setRedirectToHome(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formState);
  };

  if (redirectToHome) {
    AuthService.signOut();
    window.location.href = '/';
  }
  
  return (
    <div className={styles.login}>
      <BackgroundImage />
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <h1 className={styles.login_title}>Login</h1>
        <div className={styles.login_inputs}>
          <Input
            type="text"
            value={formState.email}
            onChange={handleChange}
            icon="/assets/email.svg"
            name="email"
            className={styles.login_email_icon} 
          />
          <Input
            type={showPassword ? "text" : "password"}
            value={formState.password}
            onChange={handleChange}
            name="password"
            icon={showPassword ? "/assets/open-password.svg" : "/assets/close-password.svg"}
            onIconClick={() => setShowPassword((prev) => !prev)}
            className={styles.login_password_icon} 
          />
          <div className={styles.login_error_message}>{ error }</div>
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
