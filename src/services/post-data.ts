import axios from '../axiosConfig';
import storageService from '../utils/storage';

const userId = storageService.getUser();
const posts = '/posts/'
const likes = '/posts/like/'
const comments = '/posts/comments/'

class PostService {

  // getAllPosts() {
  //   return axios.get(posts).then((response) => {
  //     return response;
  //   });
  // };

  getAllPosts(page = 1, limit = 3) {
    return axios.get('/posts', {
      params: { page, limit },
    }).then((response) => {
      return response;
    });
  }

  getSpecificPost() {
    return axios.get(`${posts}${userId}`).then((response) => {
      return response;
    });
  }

  async createNewPost(file: File) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await axios.post(`${posts}${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  addComment(postId:string, comment:string) {
    const payload = { userId, comment };
    return axios.post(`${comments}${postId}`, payload).then((response) => {
      return response;
    });
  }

  likePost(postId:string) {
    const payload = { userId };
    return axios.post(`${likes}${postId}`, payload).then((response) => {
      return response;
    });
  }
}

const postServiceInstance = new PostService();

export default postServiceInstance;