// import React, { useState } from 'react';
// import storageService from '../../utils/storage';
// import PostService from '../../services/post-data';
// import styles from '../../styles/components-style/post.module.css';

// const userId = storageService.getUser() || '';

// const CreatePost: React.FC = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [imageLoading, setImageLoading] = useState(false);

//   const handleFileUpload = (event: any) => {
//     setImageLoading(true);
//     const file = event.target.files[0];
//     setImage(file);
//     setImageLoading(false);
//   };

//   const handlePostUpload = async (e: any) => {
//     const file = e.target.files[0];
//     try {
//       await PostService.createNewPost(file);
//     } catch (error) {
//     }
//   };

//   return (
//     <div className={styles.createPost}>
//       <div className={styles.createPostForm}>
//         <div>
//           {imageLoading ? <p>Loading...</p> : image && <img className={styles.profileImage} src={URL.createObjectURL(image)} alt="Profile" />}
//         </div>
//         <input type="file" onChange={handlePostUpload} />
//         <button onClick={handlePostUpload}>Make a new post</button>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;
import React, { useState } from 'react';
import PostService from '../../services/post-data';
import styles from '../../styles/components-style/post.module.css';

const CreatePost = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const handleFileUpload = (event: any) => {
    setImageLoading(true);
    const file = event.target.files[0];
    setImage(file);
    setImageLoading(false);
  };

  const handlePostUpload = async () => {
    if (image) {
      try {
        await PostService.createNewPost(image);
        setImage(null); 
      } catch (error) {
      }
    }
  };

  return (
    <div className={styles.createPost}>
      <div className={styles.createPostForm}>
        <div>
          {imageLoading ? <p>Loading...</p> : image && <img className={styles.profileImage} src={URL.createObjectURL(image)} alt="Profile" />}
        </div>
        <input type="file" onChange={handleFileUpload} />
        <button onClick={handlePostUpload}>Make a new post</button>
      </div>
    </div>
  );
};

export default CreatePost;
