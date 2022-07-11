import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styles from "./AddTeacher.module.css";

export default function AddTeacher({ filedsValue }) {
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
