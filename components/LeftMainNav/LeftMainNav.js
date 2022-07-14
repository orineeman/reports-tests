import { Link } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./LeftMainNav.module.css";

export default function LeftMainNav() {
  return (
    <div
      className={styles.navButton}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Link href="/students" className={styles.link}>
        <Button sx={{ marginBottom: "10px" }} key="student-login">
          Students
        </Button>
      </Link>
      <Link href="/teachers" className={styles.link}>
        <Button sx={{ marginBottom: "10px" }} key="teachers-registr">
          Teachers
        </Button>
      </Link>
    </div>
  );
}
