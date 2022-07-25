import CreateGroup from "../../components/CreateGroup/CreateGroup";
import TeachersNav from "../../components/TeachersNav/TeachersNav";
import styles from "../../styles/Home.module.css";

export default function Teachers() {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <TeachersNav />
      </div>
      <div className={styles.contents}>
        <CreateGroup />
      </div>
    </div>
  );
}
Teachers.authTeachers = true;
