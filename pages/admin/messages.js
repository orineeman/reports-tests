import AdminNav from "../../components/AdminNav/AdminNav";
import ReadMessages from "../../components/ReadMessages/ReadMessages";
import styles from "../../styles/Home.module.css";

export default function Admin() {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <AdminNav />
      </div>
      <div className={styles.contents}>
        <ReadMessages />
      </div>
    </div>
  );
}
Admin.authAdmin = true;
