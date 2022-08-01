import { Button, CircularProgress, Divider, TextField } from "@mui/material";
import { useContext, useState } from "react";
import styles from "./AddTeacher.module.css";
import messageContext from "../../Context/messageContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";

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

function sendTeachersToServer(
  fieldsValue,
  setMessage,
  setShowMessage,
  setShowLoading,
  setValueOfTeachersFields,
  setDisabledSubmitButton
) {
  if (fieldValidations(fieldsValue)) {
    setShowLoading(true);
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
          setShowLoading(false);
          fieldsValue.teachers = [];
          setDisabledSubmitButton(true);
          setValueOfTeachersFields([{ fullName: "", email: "", id: uuidv4() }]);
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
  const [showLoading, setShowLoading] = useState(false);

  const { setMessage, setShowMessage } = useContext(messageContext);
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
  const [disabledEmailField, setDisabledEmailField] = useState(true);
  const [valueOfTeachersFields, setValueOfTeachersFields] = useState([
    { fullName: "", email: "", id: uuidv4(), deleteIcon: false },
  ]);
  const [errors, setErrors] = useState([]);
  const handleTeacherNameChange = (teacherField, index) => {
    fieldsValue.teachers[index] = {
      ...fieldsValue.teachers[index],
      fullName: "",
    };
    fieldsValue.teachers[index].fullName = event.target.value;
    const _valueOfTeachersFields = [...valueOfTeachersFields];
    _valueOfTeachersFields[index].fullName = event.target.value;
    setValueOfTeachersFields([..._valueOfTeachersFields]);
    setDisabledEmailField(false);
  };
  const handleTeacherEmailChange = (event, teacherField, index) => {
    fieldsValue.teachers[index] = { ...fieldsValue.teachers[index], email: "" };
    fieldsValue.teachers[index].email = event.target.value;
    const _valueOfTeachersFields = [...valueOfTeachersFields];
    _valueOfTeachersFields[index].email = event.target.value;
    setValueOfTeachersFields([..._valueOfTeachersFields]);
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
    setDisabledSubmitButton(true);
    const _valueOfTeachersFields = [...valueOfTeachersFields];
    _valueOfTeachersFields[0].deleteIcon = true;
    setValueOfTeachersFields([
      ..._valueOfTeachersFields,
      { fullName: "", email: "", id: uuidv4(), deleteIcon: true },
    ]);
  }

  function removeTeacherField(teacherFieldId, index) {
    let _valueOfTeachersFields = valueOfTeachersFields.filter(
      (teacherField) => teacherField !== teacherFieldId
    );
    fieldsValue.teachers.splice(index, 1);
    if (_valueOfTeachersFields.length === 1) {
      _valueOfTeachersFields[0].deleteIcon = false;
    }
    setValueOfTeachersFields([..._valueOfTeachersFields]);
  }
  return (
    <div className={styles.content}>
      <div className={styles.title}>Add teacher permission</div>
      {showLoading && (
        <CircularProgress sx={{ color: "rgba(133, 64, 245, 0.97)" }} />
      )}
      {!showLoading && (
        <>
          {valueOfTeachersFields.map((teacherField, index) => (
            <div key={teacherField}>
              <div className={styles.studentFieldDiv}>
                <div className={styles.studentFieldNum}>{index + 1}</div>

                <TextField
                  value={valueOfTeachersFields[index].fullName}
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
                  value={valueOfTeachersFields[index].email}
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
                {valueOfTeachersFields[index].deleteIcon && (
                  <DeleteIcon
                    style={{ width: "25px" }}
                    onClick={() => removeTeacherField(teacherField, index)}
                  />
                )}
                {!valueOfTeachersFields[index].deleteIcon && (
                  <div style={{ width: "25px" }}></div>
                )}
              </div>
              <Divider className={styles.divider} />
            </div>
          ))}
          <div
            className={styles.addBtn}
            key="addStudentField"
            onClick={addTeacherField}
          >
            + Add student
          </div>

          <div className={styles.submitDiv}>
            <Button
              disabled={disabledSubmitButton}
              sx={{
                background: "rgba(136, 67, 248, 0.97)",
              }}
              variant="contained"
              className={styles.submitButton}
              key="submit"
              type="submit"
              onClick={() =>
                sendTeachersToServer(
                  fieldsValue,
                  setMessage,
                  setShowMessage,
                  setShowLoading,
                  setValueOfTeachersFields,
                  setDisabledSubmitButton
                )
              }
            >
              Submit
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
