import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./SendingTest.module.css";

function getDataFromServer(
  groupsArr,
  setGroupsArr,
  testsArr,
  setTestsArr,
  email
) {
  // const reqBody = { pleaseGet: "groups and tests", email };
  fetch("/api/teacher", {
    method: "GET",
    headers: { pleaseGet: "groups and tests", email },
  })
    .then((res) => res.json())
    .then((teacherDetails) => {
      // console.log(teacherDetails);
      // if (teacherDetails.groups[0]) {
      // console.log(4);
      // setGroupsArr(...groupsArr, {
      // groupName: "You have not yet created a group",
      // });
      // } else {
      setGroupsArr(teacherDetails.groups);
      console.log(teacherDetails);
      // }
      // if (teacherDetails.tests[0]) {
      // setTestsArr(...testsArr, {
      // testName: "You have not yet created a test",
      // });
      // } else {
      setTestsArr(teacherDetails.tests);
      // }
    })
    .catch(() => setGroupsArr(["error"]));
}

const filedsValue = {
  testId: "",
  groupId: "",
  message: "",
  email: "",
  teacherName: "",
  date: "",
};

export default function SendingTest() {
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
    // console.log("email", email);
    if (email) {
      getDataFromServer(groupsArr, setGroupsArr, testsArr, setTestsArr, email);
      filedsValue.email = email;
      filedsValue.teacherName = teacherName;
      filedsValue.date = Date();
    }
  }, [email]);

  function handleFieldMessage() {
    filedsValue.message = event.target.value;
    // console.log(filedsValue);
  }

  function sendDataToServer(filedsValue) {
    console.log(filedsValue);
    if (
      filedsValue.groupId &&
      filedsValue.testId &&
      filedsValue.email &&
      filedsValue.teacherName
    ) {
      fetch("/api/sendtest", {
        method: "POST",
        body: JSON.stringify(filedsValue),
      })
        .then((res) => res.json())
        .then((Confirm) => {
          console.log("the server Approves sending the email", Confirm);
          alert("Your test is sent to students");
        })
        .catch(() => console.log("error"));
    } else {
      alert("Please select group and test");
    }
  }

  return (
    <>
      <h2>Sending a test to students</h2>
      <h6>Select a test and group and click Submit</h6>
      <div className={styles.flex}>
        <div>
          <SelectTest testsArr={testsArr} />
        </div>
        <div>
          <SelectGroup groupsArr={groupsArr} />
        </div>
      </div>
      <TextField
        sx={{ width: "650px", marginTop: "20px" }}
        id="field-question"
        label="Write here a message to the group"
        variant="outlined"
        name="content"
        key="content"
        onChange={handleFieldMessage}
      />
      <div className={styles.submitButton}>
        <Button
          variant="contained"
          sx={{ margin: "15px", width: "150px" }}
          key="submit"
          type="submit"
          onClick={() => sendDataToServer(filedsValue)}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

function SelectTest({ testsArr }) {
  const [test, setTest] = useState("");
  const handleSelectTest = (event) => {
    setTest(event.target.value);
    filedsValue.testId = event.target.value;
    // console.log(event.target.value);
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
        {testsArr.map((test) => (
          <MenuItem key={test._id} value={test._id}>
            {test.testName}
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
    filedsValue.groupId = event.target.value;
    console.log(filedsValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="group-select">Group</InputLabel>
      <Select
        sx={{ width: "300px" }}
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
            {group.groupName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
