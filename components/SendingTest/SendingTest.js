import { Button, CircularProgress, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import messageContext from "../../Context/messageContext";
import getDate from "../../utils/getDate";
import PrintTest from "../PrintTest/PrintTest";
import styles from "./SendingTest.module.css";

function getDataFromServer(setGroupsArr, setTestsArr, email) {
  fetch("/api/teacher", {
    method: "GET",
    headers: { pleaseGet: "groups and tests", email },
  })
    .then((res) => res.json())
    .then((teacherDetails) => {
      setGroupsArr(teacherDetails.groups);
      setTestsArr(teacherDetails.tests);
    })
    .catch(() => console.log("err"));
}

const fieldsValue = {
  testId: "",
  groupId: "",
  message: "",
  email: "",
  teacherName: "",
  date: "",
};

function getTestToPrint(setTestToPrint) {
  if (fieldsValue.testId) {
    fetch(`/api/print-test/${fieldsValue.testId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((test) => {
        setTestToPrint(test);
      })
      .catch(() => console.log("error"));
  }
}

export default function SendingTest() {
  const { setMessage, setShowMessage } = useContext(messageContext);
  const [testToPrint, setTestToPrint] = useState({});
  const [displayPrint, setDisplayPrint] = useState("none");
  const [showLoading, setShowLoading] = useState(false);
  const [testsArr, setTestsArr] = useState([]);
  const [groupsArr, setGroupsArr] = useState([]);
  const { data: session } = useSession();
  let email = "";
  let teacherName = "";
  if (session?.user?.email) {
    email = session.user.email;
    teacherName = session.user.name;
  }
  useEffect(() => {
    if (email) {
      getDataFromServer(setGroupsArr, setTestsArr, email);
      fieldsValue.email = email;
      fieldsValue.teacherName = teacherName;
      fieldsValue.date = getDate();
    }
  }, [email, teacherName]);

  function handleFieldMessage() {
    fieldsValue.message = event.target.value;
  }

  function sendDataToServer(fieldsValue) {
    if (
      fieldsValue.groupId &&
      fieldsValue.testId &&
      fieldsValue.email &&
      fieldsValue.teacherName
    ) {
      setShowLoading(true);
      fetch("/api/sendtest", {
        method: "POST",
        body: JSON.stringify(fieldsValue),
      })
        .then((res) => res.json())
        .then(() => {
          setShowLoading(false);
          setShowMessage(true);
          setMessage("Your test is sent to students");
          fieldsValue.testId = "";
          fieldsValue.groupId = "";
          fieldsValue.message = "";
        })
        .catch(() => console.log("error"));
    } else {
      setShowLoading(false);
      setShowMessage(true);
      setMessage("Please select group and test");
    }
  }

  return (
    <div className={styles.content}>
      <div className={styles.title}>Sending a test to students</div>
      {showLoading && (
        <CircularProgress sx={{ color: "rgba(133, 64, 245, 0.97)" }} />
      )}
      {!showLoading && (
        <>
          <div className={styles.subTitle}>
            Select a test and group and click Submit
          </div>

          <div className={styles.selectsDiv}>
            <div>
              <SelectTest
                testsArr={testsArr}
                setDisplayPrint={setDisplayPrint}
                setTestToPrint={setTestToPrint}
              />
            </div>
            <div>
              <SelectGroup groupsArr={groupsArr} />
            </div>
          </div>
          <TextField
            className={styles.textField}
            sx={{ marginTop: "20px" }}
            id="field-question"
            label="Write here a message to the group"
            variant="outlined"
            name="content"
            key="content"
            onChange={handleFieldMessage}
          />
          <div className={styles.submitDiv}>
            <PrintTest
              fieldsValue={fieldsValue}
              displayPrint={displayPrint}
              testToPrint={testToPrint}
            />
            <Button
              className={styles.submitButton}
              variant="contained"
              sx={{
                background: "rgba(136, 67, 248, 0.97)",
                margin: "15px",
              }}
              key="save"
              type="submit"
              onClick={() => sendDataToServer(fieldsValue)}
            >
              Save
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function SelectTest({ testsArr, setDisplayPrint, setTestToPrint }) {
  const [test, setTest] = useState("");
  const handleSelectTest = (event) => {
    setTest(event.target.value);
    fieldsValue.testId = event.target.value;
    getTestToPrint(setTestToPrint);
    setDisplayPrint("block");
  };
  return (
    <FormControl>
      <InputLabel id="test-select">Test</InputLabel>
      <Select
        className={styles.selectField}
        labelId="test_select_label"
        id="test_select"
        value={test}
        label="test"
        name="test"
        key="test"
        onChange={handleSelectTest}
      >
        {testsArr.map((test) => (
          <MenuItem key={test._id} value={test._id}>
            {test.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function SelectGroup({ groupsArr }) {
  const [group, setGroup] = useState("");

  const handleSelectGroup = (event) => {
    setGroup(event.target.value);
    fieldsValue.groupId = event.target.value;
  };

  return (
    <FormControl>
      <InputLabel id="group-select">Group</InputLabel>
      <Select
        className={styles.selectField}
        labelId="group_select_label"
        id="group_select"
        label="group"
        value={group}
        name="group"
        key="group"
        onChange={handleSelectGroup}
      >
        {groupsArr.map((group) => (
          <MenuItem key={group._id} value={group._id}>
            {group.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
