import Feed from '../components/dashboard/Feed';
import PostList from '../components/dashboard/Post';
import { LoaderProvider } from '../context/Loadercontext';
import styles from '../styles/components-style/dashboard.module.css'

const Dashboard = () => {
  return (
    <LoaderProvider>
      <div className={styles.main}>
        <Feed />
        <PostList />
      </div>
    </LoaderProvider>
  );
};

export default Dashboard;
