import React, { useEffect, useState } from 'react'
import FriendsDataService from '../../services/friends-data'
import DataService from '../../services/user-data'
import styles from '../../styles/components-style/user.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserData {
  email: string;
  description: string;
  userName: string;
  profileImage: string;
  username: string;
  _id: string;
}
const user = localStorage.getItem('user');

const User: React.FC<{ userKey: number; post: UserData }> = ({ userKey, post }) => {
  const [error, setError] = useState('');

  const profile = useNavigate();

  const viewProfile = (userId: string) => {
    profile(`/profile/${userId}`);
  };

  const addFriend = async (friendId: string) => {
    try {
      await FriendsDataService.addFriend(friendId);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message);
      } 
    }
  };

  return (
    <div key={userKey} className={styles.user_box}>
      <div className={styles.profile_user}>
        <img onClick={() => viewProfile(post._id)} className={styles.profile_image} src={`data:image/jpeg;base64,${post.profileImage}`} alt="Profile" />
        <button className={styles.add_friend_button} onClick={() => addFriend(post._id)}>+</button>
      </div>
      <div className={styles.profile_low_box}>
        <p className={error ? styles.error_message_show : styles.error_message}>{ error }</p>
        <p onClick={() => viewProfile(post._id)}>user: {post.username}</p>
        <p className={styles.profile_description}>{ post.description}</p>
      </div>
    </div>
  );
};

export default function AllUsers() {
  const [users, setUser] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DataService.getAllUsers();
        setUser(response.data)
        return response.data;
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, []);
  
  return (
    <div>
      <div>Users:</div>
      <div className={styles.display_users}>
        {users.map((post, index) => (
          <User key={index} userKey={index} post={post} />
        ))}
      </div>
    </div>
  )
}
