import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DataService from '../../services/user-data'
import styles from '../../styles/components-style/profile.module.css'
import storageService from '../../utils/storage'

interface UserData {
  email: string;
  userName: string;
  profileImage: string;
  username: string;
  _id: string;
  description: string;
}
const userId = storageService.getUser();

export default function EditProfile() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserData | null>(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await DataService.getUser(id!);
        setUser(response.data);
        setImage(`data:image/jpeg;base64,${response.data.profileImage}`);
      } catch (error) {
      }
    };

    fetchUserData();
  }, [id]);

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    try {
      await DataService.uploadProfilePicture(file);
      const response = await DataService.getUser(userId!);
      setImage(`data:image/jpeg;base64,${response.data.profileImage}`);
    } catch (error) {
    }
  };

  const handleImageClick = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.onchange = handleFileUpload;
    inputElement.click();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
      <div className={styles.edit_profile_box}>
        <img className={styles.profile_image} src={image} alt="Profile" onClick={handleImageClick} />
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Description: {user.description}</p>
      </div>
  );
}
