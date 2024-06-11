import Feed from '../components/dashboard/Feed';
import { LoadingProvider } from '../context/LoadingContext';
import styles from '../styles/components-style/dashboard.module.css'

const Dashboard = () => {

  return (
    <LoadingProvider>
      <div className={styles.main} >
        <Feed/>
      </div>
    </LoadingProvider>
  );
};

export default Dashboard;
