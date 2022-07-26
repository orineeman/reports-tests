import { Grid } from "@mui/material";
import LeftMainNav from "../components/LeftMainNav/LeftMainNav";
import styles from "../styles/Home.module.css";

export default function About() {
  return (
    <Grid container>
      <LeftMainNav />
      <div className={styles.titlesDiv}>
        <div className={styles.title}>About Test-reports</div>
        <p className={styles.lobby}>
          The website has a selection of calculus questions, (classified by age,
          subject and difficulty), where you can register as a teacher. The
          teacher will be able to:
          <br />
          <br />
          A - pull questions from the database to create a test.
          <br />
          <br />
          B - create a group of students, and send the test to the group.
          <br />
          <br />
          C- Add questions to the question database.
          <br />
          <br />
          Every student will be able to log in and access the test on the
          website (he receives a link by email).
          <br />
          <br />
          The teacher will receive an overall report - grade for each student,
          execution time, an unusual question that what percentage of the class
          failed, a question that took a lot of time.
          <br />
          <br />
          In exceptional cases, the site administrator changes the details of
          the failing questions.
        </p>
      </div>
    </Grid>
  );
}
