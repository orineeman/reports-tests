import { Link } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./StudentsNav.module.css";

export default function StudentNav() {
  return (
    <div className={styles.navButton}>
      <Link href="/students/tests" className={styles.link}>
        <Button sx={{ marginBottom: "15px" }} key="Tests to be done">
          Tests to be done
        </Button>
      </Link>
    </div>
  );
}
