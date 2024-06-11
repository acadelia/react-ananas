import React, { useState } from 'react';
import PostService from '../../services/post-data';
import styles from '../../styles/components-style/post.module.css';

const CreatePost = ({ onPostCreated }: { onPostCreated: () => void }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handlePostUpload = async () => {
    if (image) {
      try {
        await PostService.createNewPost(image);
        setImage(null); 
        setImageUrl(null);
        onPostCreated(); 
      } catch (error) {
      }
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
    <div className={styles.create_post}>
      <div className={styles.create_post_form}>
        <div className={styles.post_image}>
          <img
            src={imageUrl ? imageUrl : "/image-plus.svg"}
            alt="Default img upload"
            className={styles.added_image}
            onClick={handleImageClick} />
        </div>
        <button onClick={handlePostUpload}>Make a new post</button>
      </div>
    </div>
  );
};

export default CreatePost;
