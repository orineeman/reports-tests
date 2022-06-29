import Button from "@mui/material/Button";
import styles from "./AdminNav.module.css";

export default function AdminNav() {
  return (
    <div className={styles.navButton}>
      <Button sx={{ marginBottom: "15px" }} key="Uploading questions">
        Uploading questions
      </Button>
      <Button
        sx={{ marginBottom: "15px" }}
        key="Check new questions"
        // onClick={}
      >
        Check new questions
      </Button>
      <Button
        sx={{ marginBottom: "15px" }}
        key="reports"
        // onClick={}
      >
        reports
      </Button>
    </div>
  );
}
