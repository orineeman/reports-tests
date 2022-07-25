import UploadingQuestions from "../../components/UploadingQuestions/UploadingQuestions";
import AdminNav from "../../components/AdminNav/AdminNav";
import styles from "../../styles/Home.module.css";

export default function Admin() {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <AdminNav />
      </div>
      <div className={styles.contents}>
        <UploadingQuestions />
      </div>
    </div>
  );
}
Admin.authAdmin = true;
