import React from 'react'
import AllUsers from '../components/friends/AllUsers'
import styles from '../styles/components-style/friends.module.css'

export default function Friends() {
  
  return (
    <div className={styles.main} >
      <AllUsers/>
    </div>
  )
}
