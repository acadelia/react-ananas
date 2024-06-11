import React from 'react';
import styles from '../styles/components-style/profile.module.css'
import EditProfile from '../components/profile/EditProfile';
import Statistics from '../components/profile/Statistics';

export default function Profile() {
  
  return (
    <div className={styles.main}>
      <EditProfile />
      <Statistics/>
    </div>
  );
}
