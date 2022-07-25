import {
  Button,
  FormControl,
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

const filedsValue = {
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
      filedsValue.email = email;
    }
  }, [email]);
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <StudentNav />
      </div>
      <div className={styles.contents}>
        <h4>Select a test</h4>
        <SelectTest testsArr={testsArr} setDisabled={setDisabled} />
        <div style={{ marginTop: "30px" }}>
          <Button
            variant="contained"
            sx={{ margin: "15px", width: "150px" }}
            key="submit"
            type="submit"
            disabled={disabled}
            onClick={() => router.push(`/test/${filedsValue.testId}`)}
          >
            Start test
          </Button>
        </div>
      </div>
    </div>
  );
}

function SelectTest({ testsArr, setDisabled }) {
  const [test, setTest] = useState("");
  const handleSelectTest = (event) => {
    setTest(event.target.value);
    filedsValue.testId = event.target.value;
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
        key="test"
        onChange={handleSelectTest}
      >
        {testsArr.map(
          (test) =>
            test.test && (
              <MenuItem key={test.test.label} value={test.test._id}>
                {test.test.label}
              </MenuItem>
            )
        )}
      </Select>
    </FormControl>
  );
}
TestsOfStudents.authStudents = true;
