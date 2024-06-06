import { useState } from "react";
import styles from '../styles/auth-style/auth.module.css'
import { Link, useNavigate } from "react-router-dom";
import AuthService from '../services/auth/auth'

const initialFormState = {
  userName: '',
  email: '',
  password: '',
};

const Register = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
      const response = await AuthService.signUpAndLogin(formState);
      const token = response.data;
      navigate('/');
    } catch (error) {
    }
  };
  return (
        <div className={styles.login}>
      <img src="/assets/background-desktop.jpeg" alt="" className={styles.img}/>
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <h1 className={styles.login_title}>Register</h1>
        <div className={styles.login_inputs}>
          <div className={styles.login_box}>
            <input
              type="text"
              onChange={handleChange}
              name="username"
              id="username"
              value={formState.userName}
              className={styles.login_input}
              placeholder="username"/>
          </div>
          <div className={styles.login_box}>
            <input
              type="text"
              onChange={handleChange}
              name="email"
              id="email"
              value={formState.email}
              className={styles.login_input}
              placeholder="email"/>
          </div>
          <div className={styles.login_box}>
            <input
              type="text"
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
        </div>
        <div className={styles.login_check}>
          <div className={styles.login_check_box}>
            <input type="checkbox" className={styles.login_check_input} id="user-check"/>
            <label htmlFor="user-check" className={styles.login_check_label}>Remember me</label>
          </div>
        </div>
        <button type="submit" className={styles.login_button}>Register</button>
        <div className={styles.login_register}>
          Already have an account? <Link to="/login" className={styles.login_register_link}>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
