import AdminNav from "../../components/AdminNav/AdminNav";
import CheckNewQuestions from "../../components/CheckNewQuestions/CheckNewQuestions";
// import  from "../../components/CheckNewQuestionsns/CheckNewQuestionsns";
import styles from "../../styles/Home.module.css";

export default function Admin() {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <AdminNav />
      </div>
      <div className={styles.contents}>
        <CheckNewQuestions />
      </div>
    </div>
  );
}
