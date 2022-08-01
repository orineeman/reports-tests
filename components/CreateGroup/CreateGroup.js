import { Button, Divider, TextField } from "@mui/material";
import { useContext, useState } from "react";
import styles from "./CreateGroup.module.css";
import { useSession } from "next-auth/react";
import messageContext from "../../Context/messageContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";

const fieldsValue = {
  students: [],
  label: "",
};

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function fieldValidations(fieldsValue) {
  if (fieldsValue.students[0]) {
    for (let student of fieldsValue.students) {
      if (!student.label || !student.email) {
        return false;
      }
    }
    return true;
  }
}

export default function CreateGroup() {
  const { setMessage, setShowMessage } = useContext(messageContext);
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
  const [valueOfGroupNameField, setValueOfGroupNameField] = useState("");
  const [valueOfStudentsFields, setValueOfStudentsFields] = useState([
    { fullName: "", email: "", id: uuidv4(), deleteIcon: false },
  ]);

  const { data: session } = useSession();
  let email = "";
  let teacherName = "";
  if (session) {
    email = session.user.email;
    teacherName = session.user.name;
  }

  const sendGroupToServer = async (fieldsValue, email, teacherName) => {
    const emails = fieldsValue.students.map((student) => student.email);
    console.log(fieldsValue);
    function hasDuplicateEmail(emails) {
      return emails.some(function (email) {
        return emails.indexOf(email) !== emails.lastIndexOf(email);
      });
    }
    if (hasDuplicateEmail(emails)) {
      setShowMessage(true);
      setMessage("You filled two students with the same email");
    } else {
      let groupIdAndEmail = {};
      if (fieldValidations(fieldsValue) && fieldsValue.label) {
        try {
          const json = await fetch("/api/group", {
            method: "POST",
            body: JSON.stringify(fieldsValue),
          });
          const data = await json.json();
          groupIdAndEmail.groupId = data._id;
        } catch (err) {
          console.log("error", err);
        }

        groupIdAndEmail.email = email;
        groupIdAndEmail.teacherName = teacherName;
        try {
          const json = await fetch("/api/teacher", {
            method: "PATCH",
            body: JSON.stringify(groupIdAndEmail),
          });
          await json.json();
          setShowMessage(true);
          setMessage("Your group has been save successfully");
        } catch (err) {
          console.log("error", err);
        }
        fieldsValue.students = [];
        fieldsValue.label = "";
        setValueOfGroupNameField("");
        setValueOfStudentsFields([{ fullName: "", email: "", id: uuidv4() }]);
        setDisabledSubmitButton(true);
      } else {
        setShowMessage(true);
        setMessage("Please fill all fields");
      }
    }
  };

  function handleGroupNameField(event) {
    fieldsValue.label = event.target.value;
    setValueOfGroupNameField(event.target.value);
  }
  return (
    <div className={styles.content}>
      <div className={styles.title}>Create group</div>
      <TextField
        className={styles.groupName}
        id="groupNameField"
        label="Write here the group name"
        variant="outlined"
        key="groupName"
        required
        value={valueOfGroupNameField}
        onChange={handleGroupNameField}
        autoFocus
      />

      <div className={styles.subTitle}>
        Please write a name and email for each student
      </div>
      <StudentsFields
        fieldsValue={fieldsValue}
        setDisabledSubmitButton={setDisabledSubmitButton}
        valueOfStudentsFields={valueOfStudentsFields}
        setValueOfStudentsFields={setValueOfStudentsFields}
      />
      <div className={styles.submitDiv}>
        <Button
          disabled={disabledSubmitButton}
          className={styles.submitButton}
          variant="contained"
          sx={{ margin: "15px", width: "150px" }}
          key="submit"
          type="submit"
          onClick={() => sendGroupToServer(fieldsValue, email, teacherName)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

function StudentsFields({
  fieldsValue,
  setDisabledSubmitButton,
  valueOfStudentsFields,
  setValueOfStudentsFields,
}) {
  const [disabledEmailField, setDisabledEmailField] = useState(true);
  const [errors, setErrors] = useState([]);

  const handleStudentNameChange = (event, studentField, index) => {
    fieldsValue.students[index] = { ...fieldsValue.students[index], label: "" };
    fieldsValue.students[index].label = event.target.value;
    const _valueOfStudentsFields = [...valueOfStudentsFields];
    _valueOfStudentsFields[index].fullName = event.target.value;
    setValueOfStudentsFields([..._valueOfStudentsFields]);
    setDisabledEmailField(false);
    console.log(valueOfStudentsFields);
  };
  const handleStudentEmailChange = (event, studentField, index) => {
    fieldsValue.students[index] = { ...fieldsValue.students[index], email: "" };
    fieldsValue.students[index].email = event.target.value;
    const _valueOfStudentsFields = [...valueOfStudentsFields];
    _valueOfStudentsFields[index].email = event.target.value;
    setValueOfStudentsFields([..._valueOfStudentsFields]);
    console.log(valueOfStudentsFields);

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

  function addStudentField() {
    setDisabledSubmitButton(true);
    const _valueOfStudentsFields = [...valueOfStudentsFields];
    _valueOfStudentsFields[0].deleteIcon = true;
    setValueOfStudentsFields([
      ..._valueOfStudentsFields,
      { fullName: "", email: "", id: uuidv4(), deleteIcon: true },
    ]);
  }

  function removeStudentField(studentFieldId, index) {
    let _valueOfStudentsFields = valueOfStudentsFields.filter(
      (studentField) => studentField !== studentFieldId
    );
    fieldsValue.students.splice(index, 1);
    if (_valueOfStudentsFields.length === 1) {
      _valueOfStudentsFields[0].deleteIcon = false;
    }
    setValueOfStudentsFields([..._valueOfStudentsFields]);
  }
  return (
    <>
      <div>
        {valueOfStudentsFields.map((studentField, index) => (
          <div key={studentField.id}>
            <div className={styles.studentFieldDiv}>
              <div className={styles.studentFieldNum}>{index + 1}</div>
              <TextField
                value={valueOfStudentsFields[index].fullName}
                className={styles.textField}
                sx={{ width: "300px", margin: "10px" }}
                type="text"
                label="Student full name"
                variant="outlined"
                onChange={(e) =>
                  handleStudentNameChange(e, studentField, index)
                }
                required
              />
              <TextField
                value={valueOfStudentsFields[index].email}
                className={styles.textField}
                sx={{ width: "300px", margin: "10px" }}
                type="email"
                required
                label="Student email"
                variant="outlined"
                error={errors[index]}
                disabled={disabledEmailField}
                onChange={(e) =>
                  handleStudentEmailChange(e, studentField, index)
                }
              />
              {valueOfStudentsFields[index].deleteIcon && (
                <DeleteIcon
                  style={{ width: "25px" }}
                  onClick={() => removeStudentField(studentField, index)}
                />
              )}
              {!valueOfStudentsFields[index].deleteIcon && (
                <div style={{ width: "25px" }}></div>
              )}
            </div>
            <Divider className={styles.divider} />
          </div>
        ))}
      </div>
      <div
        className={styles.addBtn}
        key="addStudentField"
        onClick={addStudentField}
      >
        + Add student
      </div>
    </>
  );
}
