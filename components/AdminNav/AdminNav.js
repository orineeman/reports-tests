import { Link } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./AdminNav.module.css";

export default function AdminNav() {
  return (
    <div className={styles.navButton}>
      <Link href="/admin/uploading-questions" className={styles.link}>
        <Button sx={{ marginBottom: "15px" }} key="Uploading-questions">
          Uploading questions
        </Button>
      </Link>
      <Link href="/admin/check-new-questions" className={styles.link}>
        <Button sx={{ marginBottom: "15px" }} key="check-new-questions">
          Check new questions
        </Button>
      </Link>
      <Link href="/admin/add-teacher" className={styles.link}>
        <Button sx={{ marginBottom: "15px" }} key="add-teacher">
          Add teacher
        </Button>
      </Link>
      <Link href="/admin/reports" className={styles.link}>
        <Button sx={{ marginBottom: "15px" }} key="reports">
          Reports
        </Button>
      </Link>
      <Link href="/admin/base-data-updates" className={styles.link}>
        <Button sx={{ marginBottom: "15px" }} key="base-data-updates">
          Base data updates
        </Button>
      </Link>
    </div>
  );
}
