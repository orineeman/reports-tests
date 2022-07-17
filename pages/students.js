import StudentNav from "../components/StudentsNav/StudentsNav";
import styles from "../styles/Home.module.css";

export default function Students() {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <StudentNav />
      </div>
      <div className={styles.contents}>
        <h1>welcome mr. student</h1>
      </div>
    </div>
  );
}

Students.authStudents = true;
