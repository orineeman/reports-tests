import LeftMainNav from "../components/LeftMainNav/LeftMainNav";
import styles from "../styles/Home.module.css";
export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <LeftMainNav />
      </div>
      <div className={styles.contents}>
        <p>
          The essence of the site - a site where there will be a selection of
          questions in the account, (classified by age, of course elementary
          age), where it will be possible to register as a teacher, the teacher
          will be able to a - pull questions from there to print a test, b -
          upload questions to the database Students, and get each child a
          password, then each child will be able to login and take the test on
          the site. This feature is the main thing because: the teacher will
          receive a total report - a grade for each student, execution time, an
          unusual question that several percent of the class failed, a question
          that took a long time. The intention is that later it will be possible
          to follow the students progress history, so that there is an accurate
          knowledge of his condition - (for example - a student who last year
          would answer a question in a few seconds and is now delayed - will
          light a red light for the teacher).
        </p>
      </div>
    </div>
  );
}
