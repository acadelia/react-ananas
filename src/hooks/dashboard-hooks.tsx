import { useEffect, useState } from 'react';
import DataService from '../services/user-data';

interface UserData {
  profileImage: string;
}

const useUserData = (userId:string, incrementLoading: () => void, decrementLoading: () => void): { userData: UserData | null; refetchUserData: () => void } => {
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    incrementLoading();
    try {
      const response = await DataService.getUser(userId);
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      decrementLoading();
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, incrementLoading, decrementLoading]);

  const refetchUserData = () => {
    fetchData();
  };

  return { userData, refetchUserData };
};

export default useUserData;
