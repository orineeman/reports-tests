import { Button, Divider, TextField } from "@mui/material";
import { useContext, useState } from "react";
import styles from "./AddTeacher.module.css";
import messageContext from "../../Context/messageContext";
import DeleteIcon from "@mui/icons-material/Delete";

function fieldValidations(fieldsValue) {
  if (fieldsValue.teachers[0]) {
    for (let teacher of fieldsValue.teachers) {
      if (!teacher.fullName || !teacher.email) {
        return false;
      }
    }
    return true;
  }
}

function sendTeachersToServer(fieldsValue, setMessage, setShowMessage) {
  if (fieldValidations(fieldsValue)) {
    fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify(fieldsValue.teachers),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          setShowMessage(true);
          setMessage(
            "All teachers received permission, and an email was sent to the permissions holders"
          );
        } else {
          setShowMessage(true);
          setMessage(
            `Some of these teachers have been licensed in the past: ${res}. the rest have been successfully registered and emailed to them`
          );
        }
      })

      .catch(() => console.log("error"));
  } else {
    setShowMessage(true);
    setMessage("You have not filled in the fields");
  }
}

const fieldsValue = {
  teachers: [],
};

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function AddTeacher() {
  const { setMessage, setShowMessage } = useContext(messageContext);
  let [newTeacherField, setNewTeacherField] = useState([1]);
  // const [disabledAddButton, setDisabledAddButton] = useState(true);
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
  const [disabledEmailField, setDisabledEmailField] = useState(true);
  const [errors, setErrors] = useState([]);
  const handleTeacherNameChange = (teacherField, index) => {
    fieldsValue.teachers[index] = {
      ...fieldsValue.teachers[index],
      fullName: "",
    };
    fieldsValue.teachers[index].fullName = event.target.value;
    // setDisabledAddButton(false);
    setDisabledEmailField(false);
  };
  const handleTeacherEmailChange = (event, teacherField, index) => {
    fieldsValue.teachers[index] = { ...fieldsValue.teachers[index], email: "" };
    fieldsValue.teachers[index].email = event.target.value;
    if (!isValidEmail(event.target.value)) {
      const _errors = [...errors];
      _errors[index] = true;
      setErrors(_errors);
      setDisabledSubmitButton(true);
    } else {
      const _errors = [...errors];
      _errors[index] = false;
      setErrors(_errors);
      setDisabledSubmitButton(false);
    }
  };

  function addTeacherField() {
    newTeacherField = [...newTeacherField, newTeacherField.length + 1];
    setNewTeacherField([...newTeacherField]);
    setDisabledSubmitButton(true);
  }

  function removeTeacherField(teacherFieldId, index) {
    if (newTeacherField.length > 1) {
      newTeacherField = newTeacherField.filter(
        (teacherField) => teacherField !== teacherFieldId
      );
      fieldsValue.teachers.splice(index, 1);
    }
    setNewTeacherField([...newTeacherField]);
  }
  return (
    <div className={styles.content}>
      <div className={styles.title}>Add teacher permission</div>

      {newTeacherField.map((teacherField, index) => (
        <div key={teacherField}>
          <div className={styles.studentFieldDiv}>
            <div className={styles.studentFieldNum}>{index + 1}</div>

            <TextField
              className={styles.textField}
              sx={{ width: "300px", margin: "10px" }}
              autoFocus
              type="text"
              label="Teacher full name"
              variant="outlined"
              onChange={() => handleTeacherNameChange(teacherField, index)}
              required
            />
            <TextField
              className={styles.textField}
              sx={{ width: "300px", margin: "10px" }}
              type="email"
              label="Teacher email"
              variant="outlined"
              required
              error={errors[index]}
              disabled={disabledEmailField}
              onChange={() =>
                handleTeacherEmailChange(event, teacherField, index)
              }
            />
            <DeleteIcon
              onClick={() => removeTeacherField(teacherField, index)}
            />
          </div>
          <Divider className={styles.divider} />
        </div>
      ))}
      <div
        className={styles.addBtn}
        // disabled={disabledAddButton}
        key="addStudentField"
        onClick={addTeacherField}
      >
        + Add student
      </div>

      <div className={styles.submitDiv}>
        <Button
          disabled={disabledSubmitButton}
          variant="contained"
          className={styles.submitButton}
          key="submit"
          type="submit"
          onClick={() =>
            sendTeachersToServer(fieldsValue, setMessage, setShowMessage)
          }
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
