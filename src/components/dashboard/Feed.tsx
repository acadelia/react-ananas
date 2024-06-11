import React, { useEffect, useState } from 'react';
import styles from '../../styles/auth-style/auth.module.css';
import user from '../../styles/components-style/user.module.css';
import dashboard from '../../styles/components-style/dashboard.module.css';
import { Link } from 'react-router-dom';
import { Modal } from '..';
import CreatePost from './CreatePost';
import storageService from '../../utils/storage';
import { useLoader } from '../../context/Loadercontext';
import useUserData from '../../hooks/dashboard-hooks';

const userId = storageService.getUser();

const Feed: React.FC = () => {
  const { incrementLoading, decrementLoading } = useLoader();
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const {userData, refetchUserData} = useUserData(userId!, incrementLoading, decrementLoading);

  useEffect(() => {
    if (userData) {
      setImage(`data:image/jpeg;base64,${userData.profileImage}`);
      setIsLoading(false);
    }
  }, [userData]);

  if (isLoading) {
    return null;
  }

  const handlePostCreated = () => {
    setShowModal(false);
    refetchUserData();
  };

  return (
    <div className={dashboard.feed}>
      <div className={styles.login_form}>
        <div>
          <img className={user.profile_image} src={image} alt="Profile" />
        </div>
          <button className={styles.openModalButton} onClick={openModal}>
            Create Post
          </button>
          <Link to="/friends">Find friends</Link>
          <Modal show={showModal} onClose={closeModal}>
            <CreatePost onPostCreated={handlePostCreated} />
          </Modal>
        </div>
      </div>
    );
};

export default Feed;