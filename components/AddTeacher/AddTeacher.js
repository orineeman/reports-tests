import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styles from "./AddTeacher.module.css";

function filedValidations(filedsValue) {
  if (filedsValue.teachers[0]) {
    for (let teacher of filedsValue.teachers) {
      if (!teacher.fullName || !teacher.email) {
        return false;
      }
    }
    return true;
  }
}

function sendTeachersToServer(filedsValue) {
  console.log("filedsValue", filedsValue);
  if (filedValidations(filedsValue)) {
    fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify(filedsValue.teachers),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          console.log("res.status", res.status);
          alert(
            "All teachers received permission, and an email was sent to the permissions holders"
          );
        } else {
          alert(
            `Some of these teachers have been licensed in the past: ${res}. the rest have been successfully registered and emailed to them`
          );
        }
      })

      .catch(() => console.log("error"));
  } else {
    alert("You have not filled in the fields");
  }
}

const filedsValue = {
  teachers: [],
};

export default function AddTeacher() {
  let [newTeacherField, setNewTeacherField] = useState([1]);
  const [disabledAddButton, setDisabledAddButton] = useState(true);
  const [disabledEmailField, setDisabledEmailField] = useState(true);

  const handleTeacherNameChange = (teacherField, index) => {
    filedsValue.teachers[index] = { fullName: "" };
    filedsValue.teachers[index].fullName = event.target.value;
    console.log(filedsValue);
    setDisabledAddButton(false);
    setDisabledEmailField(false);
  };
  const handleTeacherEmailChange = (teacherField, index) => {
    filedsValue.teachers[index].email = event.target.value;
    console.log(filedsValue);
    // setDisabledAddButton(false);
  };

  function addTeacherField() {
    newTeacherField = [...newTeacherField, newTeacherField.length + 1];
    setNewTeacherField([...newTeacherField]);
  }

  function removeTeacherField(teacherFieldId, index) {
    if (newTeacherField.length > 1) {
      newTeacherField = newTeacherField.filter(
        (teacherField) => teacherField !== teacherFieldId
      );
      filedsValue.teachers.splice(index, 1);
    }
    setNewTeacherField([...newTeacherField]);
  }
  return (
    <>
      <div>
        <div>
          {newTeacherField.map((teacherField, index) => (
            <div className={styles.flex} key={teacherField}>
              {index + 1}
              <TextField
                autoFocus
                sx={{ width: "300px", margin: "10px" }}
                type="text"
                label="Teacher full name"
                key="Teacher full name"
                variant="outlined"
                onChange={() => handleTeacherNameChange(teacherField, index)}
                required
              />
              <TextField
                sx={{ width: "300px", margin: "10px" }}
                type="email"
                label="Teacher email"
                key="Teacher email"
                variant="outlined"
                required
                disabled={disabledEmailField}
                onChange={() => handleTeacherEmailChange(teacherField, index)}
              />
              <Button
                variant="outlined"
                sx={{ height: "40px", margin: "10px", width: "40px" }}
                key="removeTeacherField"
                onClick={() => removeTeacherField(teacherField, index)}
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
          key="addTeacherField"
          onClick={addTeacherField}
        >
          Add teacher
        </Button>
        <div className="">
          <Button
            variant="contained"
            sx={{ margin: "15px", width: "150px" }}
            key="submit"
            type="submit"
            onClick={() => sendTeachersToServer(filedsValue)}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
