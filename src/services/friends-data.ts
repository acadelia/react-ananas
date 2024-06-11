import axios from '../axiosConfig';
import storageService from '../utils/storage';

const friendsApi = '/friends/';
const getUserApi = '/friends/';
const userId = storageService.getUser();

class FriendDataService {

  addFriend(friendId:string) {
    const payload = { userId, friendId };
    return axios.post(`${friendsApi}add`, payload).then((response) => {
      return response;
    });
  }

  removeFriend(friendId:string) {
    const payload = { userId, friendId };
    return axios.delete(`${friendsApi}remove`, { data: payload }).then((response) => {
      return response;
    });
  }

  getNumberOfFriends() {
    return axios.get(`${friendsApi}${userId}/number`).then((response) => {
      return response;
    });
  };

  getAllFriends() {
    return axios.get(`${friendsApi}${userId}/all`).then((response) => {
      return response;
    });
  }

  getFriend() {
    return axios.get(`${getUserApi}${userId}`).then((response) => {
      return response;
    });
  }
}

const friendDataServiceInstance = new FriendDataService();

export default friendDataServiceInstance;
