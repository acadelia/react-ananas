import { useEffect, useState } from 'react';
import DataService from '../services/data';
import AuthService from '../services/auth/auth'

const refreshToken = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await AuthService.refreshToken();
    } catch (error) {
    }
};

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DataService.getDetails();
        setData(response.data.message);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Dashboard, to be done later</p>
      <button onClick={refreshToken}>trigger refresh</button>
      <div>
        {loading ? <p>Loading...</p> : <pre>
          {JSON.stringify(data, null, 2)}
        </pre>}
      </div>
    </div>
  );
};

export default Dashboard;
