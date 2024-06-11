import axios from '../axiosConfig';
import storageService from '../utils/storage';

const detailsApi = '/users/';
const getUserApi = '/users/';
const uploadApi = '/profile-picture/';
const getProfilePictureApi = '/profile-picture/';
const userId = storageService.getUser();

class DataService {

  getUser(userId: string) {
    return axios.get(`${getUserApi}${userId}`).then((response) => {
      return response;
    });
  }

  getAllUsers() {
    return axios.get(detailsApi).then((response) => {
      return response;
    });
  };

  async uploadProfilePicture(file: File) {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      
      const response = await axios.post(`/users${uploadApi}${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getProfilePicture() {
    try {
      const response = await axios.get(`/users${getProfilePictureApi}${userId}`);
      return response.data.profilePicture;
    } catch (error) {
      throw error;
    }
  }
}

const dataServiceInstance = new DataService();

export default dataServiceInstance;
