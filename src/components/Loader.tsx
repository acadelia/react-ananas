import styles from "../styles/components-style/loader.module.css";
import React from 'react'

type Loader = {
  message: string | undefined;
};

export const Loader: React.FC<Loader> = ({ message }) => {
  return (
    <div className={styles.body}>
      <div className={styles.spinner}>
        <div className={styles.color}></div>
        <div className={styles.mask}></div>
      </div>
    </div>
  )
}
