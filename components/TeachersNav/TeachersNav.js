// import { Link } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./TeachersNav.module.css";
// import functionsContext from "../../functionsContext/functionsContext";
// import { useContext } from "react";

export default function TeachersNav() {
  //   const {  } =
  // useContext(functionsContext);
  return (
    <div className={styles.navButton}>
      <Button
        sx={{ marginBottom: "15px" }}
        key="Tests"
        title="Create, Edit ,Delete"
        // onClick={}
      >
        Tests
      </Button>
      <Button
        sx={{ marginBottom: "15px" }}
        key="Student registration"
        title="Student registration"
        // onClick={}
      >
        Student registration
      </Button>
      <Button
        sx={{ marginBottom: "15px" }}
        key="Reports"
        title="Reports"
        // onClick={}
      >
        Reports
      </Button>
      <Button
        sx={{ marginBottom: "15px" }}
        key="Uploading questions"
        title="Uploading questions"
      >
        Uploading questions
      </Button>
    </div>
  );
}
