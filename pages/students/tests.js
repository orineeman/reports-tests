import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import StudentNav from "../../components/StudentsNav/StudentsNav";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";

function getDataFromServer(setTestsArr, email) {
  fetch("/api/student", {
    method: "GET",
    headers: { pleaseGet: "tests", email },
  })
    .then((res) => res.json())
    .then((studentsTests) => {
      setTestsArr(studentsTests);
    })
    .catch(() => setTestsArr(["error"]));
}

const fieldsValue = {
  testId: "",
  email: "",
};

export default function TestsOfStudents() {
  const router = useRouter();
  const [testsArr, setTestsArr] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const { data: session } = useSession();
  let email = "";
  if (session?.user?.email) {
    email = session.user.email;
  }
  useEffect(() => {
    if (email) {
      getDataFromServer(setTestsArr, email);
      fieldsValue.email = email;
    }
  }, [email]);
  return (
    <Grid container>
      <StudentNav />
      <div className={styles.titlesDiv}>
        <div className={styles.title2}>Select a test</div>
        <SelectTest testsArr={testsArr} setDisabled={setDisabled} />
        <div style={{ marginTop: "30px" }}>
          <Button
            className={styles.submitButton}
            variant="contained"
            sx={{ margin: "15px", background: "rgba(133, 64, 245, 0.97)" }}
            key="submit"
            type="submit"
            disabled={disabled}
            onClick={() => router.push(`/test/${fieldsValue.testId}`)}
          >
            Start test
          </Button>
        </div>
      </div>
    </Grid>
  );
}

function SelectTest({ testsArr, setDisabled }) {
  const [test, setTest] = useState("");
  const handleSelectTest = (event) => {
    setTest(event.target.value);
    fieldsValue.testId = event.target.value;
    setDisabled(false);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="test-select">Test</InputLabel>
      <Select
        sx={{ width: "300px" }}
        labelId="test_select_label"
        id="test_select"
        value={test}
        label="test"
        name="test"
        onChange={handleSelectTest}
      >
        {testsArr.map(
          (test) =>
            test.test && (
              <MenuItem key={test.test._id} value={test.test._id}>
                {test.test.label}
              </MenuItem>
            )
        )}
      </Select>
    </FormControl>
  );
}
TestsOfStudents.authStudents = true;
