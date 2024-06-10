import Feed from '../components/dashboard/Feed';
import styles from '../styles/components-style/dashboard.module.css'

const Dashboard = () => {

  return (
    <div className={styles.dashboard_parent} >
      <div className={styles.dashboard_ch}>
        <Feed/>
      </div>
    </div>
  );
};

export default Dashboard;
