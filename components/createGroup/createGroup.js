import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styles from "./createGroup.module.css";
import { useSession } from "next-auth/react";

const filedsValue = {
  students: [],
  tests: [],
  groupName: "",
};
export default function CreateGroup() {
  const { data: session } = useSession();
  let email = "";
  let teacherName = "";
  if (session) {
    email = session.user.email;
    teacherName = session.user.name;
  }
  const sendGroupToServer = async (filedsValue, email, teacherName) => {
    let groupIdAndEmail = {};
    if (filedsValue.students && filedsValue.groupName) {
      await fetch("/api/group", {
        method: "POST",
        body: JSON.stringify(filedsValue),
      })
        .then((res) => res.json())
        .then((group) => {
          groupIdAndEmail.groupId = group._id;
          console.log("From client side", group);
        })
        .catch(() => console.log("error"));

      groupIdAndEmail.email = email;
      groupIdAndEmail.teacherName = teacherName;
      console.log(groupIdAndEmail);
      console.log(filedsValue);

      fetch("/api/teacher", {
        method: "PATCH",
        body: JSON.stringify(groupIdAndEmail),
      })
        .then((res) => res.json())
        .then((teacerUpdate) => {
          console.log("the client side give-teacerUpdate:", teacerUpdate);
          alert("Your group has been save successfully");
        })
        .catch(() => console.log("error"));
    } else {
      alert("Please fill all fields");
    }
  };

  function handleGroupNameField(event) {
    filedsValue.groupName = event.target.value;
    console.log(filedsValue);
  }
  return (
    <>
      <h2>Create group</h2>
      <TextField
        sx={{ width: "650px", marginTop: "20px" }}
        id="groupNameField"
        label="Write here the group name"
        variant="outlined"
        key="groupName"
        required
        onChange={handleGroupNameField}
      />

      <h6>Please write a name and email for each student</h6>
      <StudentsFields filedsValue={filedsValue} />
      <div className={styles.submitButton}>
        <Button
          variant="contained"
          sx={{ margin: "15px", width: "150px" }}
          key="submit"
          type="submit"
          onClick={() => sendGroupToServer(filedsValue, email, teacherName)}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

function StudentsFields({ filedsValue }) {
  let [newStudentsField, setNewStudentsField] = useState([1]);
  const [disabledAddButton, setDisabledAddButton] = useState(true);
  const [disabledEmailField, setDisabledEmailField] = useState(true);

  const handleStudentNameChange = (studentField, index) => {
    filedsValue.students[index] = { fullName: "" };
    filedsValue.students[index].fullName = event.target.value;
    console.log(filedsValue);
    setDisabledAddButton(false);
    setDisabledEmailField(false);
  };
  const handleStudentEmailChange = (studentField, index) => {
    filedsValue.students[index].email = event.target.value;
    console.log(filedsValue);
    // setDisabledAddButton(false);
  };

  function addStudentField() {
    newStudentsField = [...newStudentsField, newStudentsField.length + 1];
    setNewStudentsField([...newStudentsField]);
  }

  function removeStudentField(studentFieldId, index) {
    if (newStudentsField.length > 1) {
      newStudentsField = newStudentsField.filter(
        (studentField) => studentField !== studentFieldId
      );
      filedsValue.students.splice(index, 1);
    }
    setNewStudentsField([...newStudentsField]);
  }
  return (
    <>
      <div>
        <div>
          {newStudentsField.map((studentField, index) => (
            <div className={styles.flex} key={studentField}>
              {index + 1}
              <TextField
                autoFocus
                sx={{ width: "300px", margin: "10px" }}
                type="text"
                label="Student full name"
                key="Student full name"
                variant="outlined"
                onChange={() => handleStudentNameChange(studentField, index)}
                required
              />
              <TextField
                sx={{ width: "300px", margin: "10px" }}
                type="email"
                label="Student email"
                key="Student email"
                variant="outlined"
                disabled={disabledEmailField}
                onChange={() => handleStudentEmailChange(studentField, index)}
              />
              <Button
                variant="outlined"
                sx={{ height: "40px", margin: "10px", width: "40px" }}
                key="removeStudentField"
                onClick={() => removeStudentField(studentField, index)}
              >
                -
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="outlined"
          sx={{ margin: "15px", width: "200px" }}
          disabled={disabledAddButton}
          key="addStudentField"
          onClick={addStudentField}
        >
          Add student
        </Button>
      </div>
    </>
  );
}
