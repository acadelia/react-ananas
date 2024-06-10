import { useState } from "react";
import styles from '../styles/auth-style/auth.module.css'
import { Link } from "react-router-dom";
import { Input } from "../components";
import { useRegister } from "../hooks";
import BackgroundImage from "../components/BackgroundImage";

const initialFormState = {
  username: '',
  email: '',
  password: '',
};

const Register = () => {
  const { error, register } = useRegister();
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
    await register(formState);
  };
  return (
    <div className={styles.login}>
      <BackgroundImage/>
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <h1 className={styles.login_title}>Register</h1>
        <div className={styles.login_inputs}>
          <Input
            type="text"
            value={formState.username}
            onChange={handleChange}
            name="username"
            icon="/assets/user.svg"
            className={styles.login_email_icon} 
          />
          <Input
            type="text"
            name="email"
            value={formState.email}
            onChange={handleChange}
            icon="/assets/email.svg"
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
          <Link to="/404" className={styles.login_register_link}>Can't Register?</Link>
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
