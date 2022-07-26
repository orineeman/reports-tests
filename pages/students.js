import { Grid } from "@mui/material";
import StudentNav from "../components/StudentsNav/StudentsNav";
import styles from "../styles/Home.module.css";

export default function Students() {
  return (
    <Grid container>
      <StudentNav />
      <div className={styles.title}>
        <h1>welcome mr. student</h1>
      </div>
    </Grid>
  );
}

Students.authStudents = true;
