import React from 'react'
import styles from '../styles/components-style/spinner.module.css'

export default function Spinner() {
  return (
    <div className={styles.body}>
      <div className={styles.spinner}>
        <div className={styles.color}></div>
        <div className={styles.mask}></div>
      </div>
    </div>
  )
}
