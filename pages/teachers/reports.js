import TeacherReports from "../../components/TeacherReports/TeacherReports";
import TeachersNav from "../../components/TeachersNav/TeachersNav";
import styles from "../../styles/Home.module.css";

export default function Teachers() {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <TeachersNav />
      </div>
      <div className={styles.contents}>
        <TeacherReports />
      </div>
    </div>
  );
}
