import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../styles/components-style/post.module.css';
import PostService from '../../services/post-data';
import { useLoading } from '../../context/LoadingContext';

interface PostData {
  image: string;
  likes: number;
  comments: string[];
  createdAt: string;
  userId: {
    id: number;
    profileImage: string;
  };
  likedBy: string[];
  _id: string;
}

const user = localStorage.getItem('user') || '';

const Post: React.FC<{ postKey: number; post: PostData }> = ({ postKey, post }) => {
  const [liked, setLiked] = useState(post.likedBy.includes(user));

  const likePost = async () => {
    try {
      await PostService.likePost(post._id);
      setLiked(!liked);
    } catch (error) {
      console.error('Error for liking post:', error);
    }
  };

  return (
    <div key={postKey} className={styles.post_body}>
      <div className={styles.post_profile_container}>
        <img className={styles.post_profile_image} src={`data:image/jpeg;base64,${post.userId.profileImage}`} alt="Profile" />
      </div>
      <img className={styles.post_image} src={`data:image/jpeg;base64,${post.image}`} alt="Posted" />
      <div className={styles.post_likes_comments}>
        <span>Likes: {post.likes}</span>
        <img
          className={styles.post_like}
          src={liked ? '/assets/hovered-like.svg' : '/assets/empty-like.svg'}
          alt={liked ? 'Unlike post' : 'Like post'}
          onClick={likePost}
        />
        <span>Comments: {post.comments.length}</span>
      </div>
    </div>
  );
};

const PostList = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const { isLoading, setIsLoading } = useLoading();

  const getAllPosts = async (page: number) => {
    try {
      const response = await PostService.getAllPosts(page);
      setTotalPage(response.data.totalPages)
      return response.data.posts;
    } catch (error) {
      return [];
    }
  };

  const loadMorePosts = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (page !== totalPages) {
      const newPosts = await getAllPosts(page + 1);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
    }
    setIsLoading(false);
  }, [isLoading, page, totalPages]);

  useEffect(() => {
    getAllPosts(1).then((initialPosts) => {
      setPosts(initialPosts);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight } = document.documentElement;
      const clientHeight = window.innerHeight;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMorePosts]);

  return (
    <div>
      {posts.map((post, index) => (
        <Post key={index} postKey={index} post={post} />
      ))}
    </div>
  );
};

export default PostList;
