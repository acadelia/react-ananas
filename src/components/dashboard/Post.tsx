import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../styles/components-style/post.module.css';
import PostService from '../../services/post-data';
import { useLoader } from '../../context/Loadercontext';

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
  const [likesCount, setLikesCount] = useState(post.likes);

  const likePost = async () => {
    const originalLiked = liked;
    const originalLikesCount = likesCount;
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);

    try {
      await PostService.likePost(post._id);
    } catch (error) {
      setLiked(originalLiked);
      setLikesCount(originalLikesCount);
    }
  };

  return (
    <div key={postKey} className={styles.post_body}>
      <div className={styles.post_profile_container}>
        <img className={styles.post_profile_image} src={`data:image/jpeg;base64,${post.userId.profileImage}`} alt="Profile" />
      </div>
      <img className={styles.post_image} src={`data:image/jpeg;base64,${post.image}`} alt="Posted" />
      <div className={styles.post_likes_comments}>
        <span>Likes: {likesCount}</span>
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

const PostList: React.FC = () => {
  const { incrementLoading, decrementLoading } = useLoader();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllPosts = async (page: number) => {
    incrementLoading();
    try {
      const response = await PostService.getAllPosts(page);
      setTotalPage(response.data.totalPages);
      return response.data.posts;
    } catch (error) {
      return [];
    } finally {
      decrementLoading();
    }
  };

  const loadMorePosts = useCallback(async () => {
    if (!loading && page < totalPages) {
      decrementLoading();
      setLoading(true);
      const newPosts = await getAllPosts(page + 1);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }
  }, [page, totalPages, loading]);

  useEffect(() => {
    getAllPosts(1).then((initialPosts) => {
      setPosts(initialPosts);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight } = document.documentElement;
      const clientHeight = window.innerHeight;
      if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMorePosts]);

  return (
    <div className={styles.post_list}>
      {posts.map((post, index) => (
        <Post key={index} postKey={index} post={post} />
      ))}
    </div>
  );
};

export default PostList;
