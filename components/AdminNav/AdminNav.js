import { Link } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./AdminNav.module.css";

export default function AdminNav() {
  return (
    <div className={styles.navButton}>
      <Link href="/admin/uploading-questions">
        <Button sx={{ marginBottom: "15px" }} key="Uploading questions">
          Uploading questions
        </Button>
      </Link>
      <Link href="/admin/check-new-questions">
        <Button sx={{ marginBottom: "15px" }} key="check-new-questions">
          Check new questions
        </Button>
      </Link>
      <Link href="/admin/add-teacher">
        <Button sx={{ marginBottom: "15px" }} key="dd-teacher">
          Add teacher
        </Button>
      </Link>
      <Link href="/admin/reports">
        <Button sx={{ marginBottom: "15px" }} key="reports">
          reports
        </Button>
      </Link>
    </div>
  );
}
