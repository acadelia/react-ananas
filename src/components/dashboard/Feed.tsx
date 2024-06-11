import React, { useEffect, useState } from 'react'
import styles from '../../styles/auth-style/auth.module.css'
import user from '../../styles/components-style/user.module.css'
import DataService from '../../services/user-data';
import dashboard from '../../styles/components-style/dashboard.module.css'
import { Link } from 'react-router-dom';
import { Modal } from '..';
import CreatePost from './CreatePost';
import Post from './Post';
import storageService from '../../utils/storage'
import { useLoading } from '../../context/LoadingContext';

const userId = storageService.getUser();

const Feed = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { isLoading, setIsLoading } = useLoading();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await DataService.getUser(userId!);
      setImage(`data:image/jpeg;base64,${response.data.profileImage}`);
      } catch (error) {
      } finally {
        setImageLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <>
     <div className={dashboard.feed}>
      <div className={styles.login_form}>
        <div>
          <img className={user.profile_image} src={image} alt="Profile" onClick={handleImageClick} />
        </div>
          <button className={styles.openModalButton} onClick={openModal}>
            Create Post
          </button>
          <Link to="/friends">Find friends</Link>
          <Modal show={showModal} onClose={closeModal}>
            <CreatePost />
          </Modal>
        </div>
        <Post/>
      </div>
    </>
  )
}

export default Feed;