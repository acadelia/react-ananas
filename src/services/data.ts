import axios from '../axiosConfig';

const detailsApi = '/users/details';

class DataService {

  getDetails() {
    return axios.get(detailsApi).then((response) => {
      return response;
    });
  }
}

const dataServiceInstance = new DataService();

export default dataServiceInstance;
