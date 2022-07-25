import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import styles from "./CreateGroup.module.css";
import { useSession } from "next-auth/react";
import messageContext from "../../Context/messageContext";

const filedsValue = {
  students: [],
  tests: [],
  label: "",
};

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function CreateGroup() {
  const { setMessage, setShowMessage } = useContext(messageContext);

  const { data: session } = useSession();
  let email = "";
  let teacherName = "";
  if (session) {
    email = session.user.email;
    teacherName = session.user.name;
  }

  const sendGroupToServer = async (filedsValue, email, teacherName) => {
    let groupIdAndEmail = {};
    if (filedsValue.students && filedsValue.label) {
      try {
        const json = await fetch("/api/group", {
          method: "POST",
          body: JSON.stringify(filedsValue),
        });
        const data = await json.json();
        // .then((group) => {
        groupIdAndEmail.groupId = data._id;
        // })
      } catch (err) {
        console.log("error", err);
      }

      groupIdAndEmail.email = email;
      groupIdAndEmail.teacherName = teacherName;

      fetch("/api/teacher", {
        method: "PATCH",
        body: JSON.stringify(groupIdAndEmail),
      })
        .then((res) => res.json())
        .then(() => {
          setShowMessage(true);
          setMessage("Your group has been save successfully");
        })
        .catch(() => console.log("error"));
    } else {
      setShowMessage(true);
      setMessage("Please fill all fields");
    }
  };

  function handleGroupNameField(event) {
    filedsValue.label = event.target.value;
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
  const [errors, setErrors] = useState([]);

  const handleStudentNameChange = (studentField, index) => {
    filedsValue.students[index] = { ...filedsValue.students[index], label: "" };
    filedsValue.students[index].label = event.target.value;
    setDisabledAddButton(false);
    setDisabledEmailField(false);
  };
  const handleStudentEmailChange = (studentField, index) => {
    filedsValue.students[index] = { ...filedsValue.students[index], email: "" };
    filedsValue.students[index].email = event.target.value;
    if (!isValidEmail(event.target.value)) {
      const _errors = [...errors];
      _errors[index] = true;
      setErrors(_errors);
      console.log(_errors);
    } else {
      const _errors = [...errors];
      _errors[index] = false;
      setErrors(_errors);
    }
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
                error={errors[index]}
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
