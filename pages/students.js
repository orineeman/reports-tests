import { Grid } from "@mui/material";
import StudentNav from "../components/StudentsNav/StudentsNav";
import styles from "../styles/Home.module.css";

export default function Students() {
  return (
    <Grid container>
      <StudentNav />
      <div className={styles.titlesDiv}>
        <div className={styles.title}>welcome mr. student</div>
      </div>
    </Grid>
  );
}

Students.authStudents = true;
