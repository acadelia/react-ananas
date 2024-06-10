class StorageService {
  saveUser(userId:string) {
    localStorage.setItem('user', userId);
  }

  getUser() {
    return localStorage.getItem('user');
  }

  removeUser() {
    return localStorage.removeItem('user');
  }
}

const StorageInstance = new StorageService();

export default StorageInstance;
