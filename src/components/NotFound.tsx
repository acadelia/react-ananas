import { Link } from "react-router-dom";
import styles from '../styles/components-style/not-found.module.css'

const NotFound = () => {
  
  return (
    <div className={styles.body}>
      <img src="/assets/background-desktop.jpeg" alt="" className={styles.img}/>
      <div className={styles.body_text}>
        <h1>404 NOT FOUND!</h1>
        <p>Sorry! The page you were looking for doesn't exist.</p>
        <button className={styles.body_button}>
          <Link to="/" className={styles.login_register_link}>Go Back</Link>
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default NotFound;