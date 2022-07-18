import styles from "../../styles/Home.module.css";
import AdminNav from "../../components/AdminNav/AdminNav";
import AdminReports from "../../components/AdminReports/AdminReports";

export default function Teachers() {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <AdminNav />
      </div>
      <div className={styles.contents}>
        <AdminReports />
      </div>
    </div>
  );
}
