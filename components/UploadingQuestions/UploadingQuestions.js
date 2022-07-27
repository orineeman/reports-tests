import { Button, Checkbox, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useContext, useEffect, useState } from "react";
import styles from "./UploadingQuestions.module.css";
import getDataFromServer from "../../utils/getAgeSubjectDif";
import { useSession } from "next-auth/react";
import messageContext from "../../Context/messageContext";
import DeleteIcon from "@mui/icons-material/Delete";

const filedsValue = {
  difficulty: "",
  age: "",
  subject: "",
  content: "",
  answers: [],
  email: "",
};
export default function UploadingQuestions() {
  const [agesArr, setAgesArr] = useState([]);
  const [subjectsArr, setSubjectsArr] = useState([]);
  const [difficultiesArr, setDifficultiesArr] = useState([]);
  const { setMessage, setShowMessage } = useContext(messageContext);

  useEffect(() => {
    getDataFromServer(setAgesArr, setSubjectsArr, setDifficultiesArr);
  }, []);

  const { data: session } = useSession();
  let email = "";
  if (session) {
    email = session.user.email;
  }

  function sendQuestionToServer(filedsValue) {
    console.log(filedsValue);
    filedsValue.email = email;
    if (
      filedsValue.difficulty &&
      filedsValue.age &&
      filedsValue.content &&
      filedsValue.subject &&
      filedsValue.answers[0]
      // checkboxValidation
    ) {
      fetch("/api/question", {
        method: "POST",
        body: JSON.stringify(filedsValue),
      })
        .then((res) => res.json())
        .then((question) => {
          console.log("the client side", question);
          setShowMessage(true);
          setMessage(
            "Your question has been sent successfully, It will be checked soon by the webmaster, and then uploaded to the database"
          );
        })
        .catch(() => console.log("error"));
    } else {
      setShowMessage(true);
      setMessage("Please fill all fields");
    }
  }
  function handleFieldContent() {
    filedsValue.content = event.target.value;
  }
  return (
    <div className={styles.content}>
      <div className={styles.title}>Add questions</div>
      <div className={styles.selectsDiv}>
        <div>
          <SelectAge agesArr={agesArr} />
        </div>
        <div>
          <SelectSubject subjectsArr={subjectsArr} />
        </div>
        <div>
          <SelectDifficulty difficultiesArr={difficultiesArr} />
        </div>
      </div>
      <TextField
        className={styles.questionField}
        id="field-question"
        label="Write here the question"
        variant="outlined"
        name="content"
        required
        onChange={handleFieldContent}
      />

      <div className={styles.subTitle}>Please mark the correct answer</div>
      <AnswersFields />
      <div className={styles.submitDiv}>
        <Button
          className={styles.submitButton}
          variant="contained"
          key="submit"
          type="submit"
          onClick={() => sendQuestionToServer(filedsValue)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

function SelectAge({ agesArr }) {
  const [age, setAge] = useState("");

  const handleSelectAge = (event) => {
    setAge(event.target.value);
    filedsValue.age = event.target.value;
    console.log(event.target.value);
  };

  return (
    <FormControl sx={{ width: "80px" }}>
      <InputLabel id="age-select">Age</InputLabel>
      <Select
        sx={{ width: "100px" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleSelectAge}
        name="age"
      >
        {agesArr.map((age) => (
          <MenuItem key={age._id} value={age._id}>
            {age.age}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
function SelectSubject({ subjectsArr }) {
  const [subject, setSubject] = useState("");

  const handleSelectSubject = (event) => {
    setSubject(event.target.value);
    filedsValue.subject = event.target.value;
    console.log(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="subject-select">Subject</InputLabel>
      <Select
        sx={{ width: "300px" }}
        labelId="subject_select_label"
        id="subject_select"
        value={subject}
        label="subject"
        name="subject"
        onChange={handleSelectSubject}
      >
        {subjectsArr.map((subject) => (
          <MenuItem key={subject._id} value={subject._id}>
            {subject.subject}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function SelectDifficulty({ difficultiesArr }) {
  const [difficulty, setDifficulty] = useState("");

  const handleSelectDifficulty = (event) => {
    setDifficulty(event.target.value);
    filedsValue.difficulty = event.target.value;
    console.log(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="difficulty-select">Difficulty</InputLabel>
      <Select
        sx={{ width: "150px" }}
        labelId="subject_select_label"
        id="difficulty_select"
        value={difficulty}
        label="difficulty"
        name="difficulty"
        onChange={handleSelectDifficulty}
      >
        {difficultiesArr.map((difficulty) => (
          <MenuItem key={difficulty._id} value={difficulty._id}>
            {difficulty.difficulty}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function AnswersFields() {
  let [newAnswerField, setNewAnswerField] = useState([1]);
  const [disabledAddButton, setDisabledAddButton] = useState(true);
  const [checked, setChecked] = useState([]);

  const handleChange = (event, answerField, index) => {
    setChecked[index] = event.target.checked;
    filedsValue.answers[index] = {
      ...filedsValue.answers[index],
      isCorrect: event.target.checked,
    };
  };

  const handleAnswerChange = (answerField, index) => {
    console.log("index", index);
    filedsValue.answers[index] = {
      ...filedsValue.answers[index],
      content: event.target.value,
    };

    setDisabledAddButton(false);
  };

  function addAnswerField() {
    newAnswerField = [...newAnswerField, newAnswerField.length + 1];
    setNewAnswerField([...newAnswerField]);
  }

  function removeAnswerField(answerFieldId, index) {
    if (newAnswerField.length > 1) {
      newAnswerField = newAnswerField.filter(
        (answerField) => answerField !== answerFieldId
      );
      filedsValue.answers.splice(index, 1);
    }
    setNewAnswerField([...newAnswerField]);
  }
  return (
    <>
      <div>
        {newAnswerField.map((answerField, index) => (
          <div key={index} className={styles.answerFieldDiv}>
            <div className={styles.answerFieldNum}>{index + 1}</div>
            <TextField
              // autoFocus
              sx={{ width: "300px" }}
              label="answer"
              variant="outlined"
              onChange={() => handleAnswerChange(answerField, index)}
            />
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "#472CC0",
                },
              }}
              value={answerField}
              checked={checked[index]}
              onChange={() => handleChange(event, answerField, index)}
              inputProps={{ "aria-label": "controlled" }}
            />
            <DeleteIcon onClick={() => removeAnswerField(answerField, index)} />
          </div>

          // </div>
        ))}
      </div>
      <div
        className={styles.addBtn}
        variant="outlined"
        disabled={disabledAddButton}
        key="addAnswerField"
        onClick={addAnswerField}
      >
        + Add answer
      </div>
    </>
  );
}
