import AdminNav from "../../components/AdminNav/AdminNav";
import styles from "../../styles/Home.module.css";
import AddTeacher from "../../components/AddTeacher/AddTeacher";

export default function Admin() {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <AdminNav />
      </div>
      <div className={styles.contents}>
        <AddTeacher />
      </div>
    </div>
  );
}
Admin.authAdmin = true;
