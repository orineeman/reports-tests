import { Button, Divider, TextField } from "@mui/material";
import { useContext, useState } from "react";
import styles from "./CreateGroup.module.css";
import { useSession } from "next-auth/react";
import messageContext from "../../Context/messageContext";
import DeleteIcon from "@mui/icons-material/Delete";

const fieldsValue = {
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

  const sendGroupToServer = async (fieldsValue, email, teacherName) => {
    const emails = fieldsValue.students.map((student) => student.email);
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
      if (fieldsValue.students && fieldsValue.label) {
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
    }
  };

  function handleGroupNameField(event) {
    fieldsValue.label = event.target.value;
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
        onChange={handleGroupNameField}
        autoFocus
      />

      <div className={styles.subTitle}>
        Please write a name and email for each student
      </div>
      <StudentsFields fieldsValue={fieldsValue} />
      <div className={styles.submitDiv}>
        <Button
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

function StudentsFields({ fieldsValue }) {
  let [newStudentsField, setNewStudentsField] = useState([1]);
  const [disabledEmailField, setDisabledEmailField] = useState(true);
  const [errors, setErrors] = useState([]);

  const handleStudentNameChange = (studentField, index) => {
    fieldsValue.students[index] = { ...fieldsValue.students[index], label: "" };
    fieldsValue.students[index].label = event.target.value;
    setDisabledEmailField(false);
  };
  const handleStudentEmailChange = (studentField, index) => {
    fieldsValue.students[index] = { ...fieldsValue.students[index], email: "" };
    fieldsValue.students[index].email = event.target.value;
    if (!isValidEmail(event.target.value)) {
      const _errors = [...errors];
      _errors[index] = true;
      setErrors(_errors);
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
      fieldsValue.students.splice(index, 1);
    }
    setNewStudentsField([...newStudentsField]);
  }
  return (
    <>
      <div>
        {newStudentsField.map((studentField, index) => (
          <>
            {" "}
            <div className={styles.studentFieldDiv} key="studentField">
              <div className={styles.studentFieldNum}>{index + 1}</div>
              <TextField
                className={styles.textField}
                sx={{ width: "300px", margin: "10px" }}
                type="text"
                label="Student full name"
                variant="outlined"
                onChange={() => handleStudentNameChange(studentField, index)}
                required
              />
              <TextField
                className={styles.textField}
                sx={{ width: "300px", margin: "10px" }}
                type="email"
                required
                label="Student email"
                variant="outlined"
                error={errors[index]}
                disabled={disabledEmailField}
                onChange={() => handleStudentEmailChange(studentField, index)}
              />
              <DeleteIcon
                onClick={() => removeStudentField(studentField, index)}
              />
            </div>
            <Divider className={styles.divider} />
          </>
        ))}
      </div>
      <div
        className={styles.addBtn}
        // disabled={disabledAddButton}
        key="addStudentField"
        onClick={addStudentField}
      >
        + Add student
      </div>
    </>
  );
}
