import { Link } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./TeachersNav.module.css";

export default function TeachersNav() {
  return (
    <div className={styles.navButton}>
      <Link href="/teachers/sending-test">
        <Button
          sx={{ marginBottom: "15px" }}
          key="Tests"
          title="Sending a test to students"
        >
          Sending test
        </Button>
      </Link>
      <Link href="/teachers/create-tests">
        <Button
          sx={{ marginBottom: "15px" }}
          key="Tests"
          title="Create, Edit ,Delete"
        >
          Create tests
        </Button>
      </Link>
      <Link href="/teachers/create-group">
        <Button
          sx={{ marginBottom: "15px" }}
          key="classes"
          title="create group"
        >
          create group
        </Button>
      </Link>
      <Button sx={{ marginBottom: "15px" }} key="Reports" title="Reports">
        Reports
      </Button>
      <Link href="/teachers/uploading-questions">
        <Button
          sx={{ marginBottom: "15px" }}
          key="Uploading questions"
          title="Uploading questions"
        >
          Uploading questions
        </Button>
      </Link>
    </div>
  );
}
