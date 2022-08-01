import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Checkbox, CircularProgress, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import messageContext from "../../Context/messageContext";
import getDataFromServer from "../../utils/getAgeSubjectDif";
import styles from "./UploadingQuestions.module.css";
import { v4 as uuidv4 } from "uuid";

function checkboxValidation(answers) {
  let validation = false;
  for (let answer of answers) {
    if (answer.isCorrect) {
      validation = true;
    }
  }
  if (validation) {
    return true;
  } else {
    return false;
  }
}

const fieldsValue = {
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
  const [valueOfQuestionField, setValueOfQuestionField] = useState("");
  const [valueOfAnswersFields, setValueOfAnswersFields] = useState([
    { content: "", id: uuidv4(), deleteIcon: false },
  ]);
  const { setMessage, setShowMessage } = useContext(messageContext);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    getDataFromServer(
      setAgesArr,
      setSubjectsArr,
      setDifficultiesArr,
      setShowLoading
    );
  }, []);

  const { data: session } = useSession();
  let email = "";
  if (session) {
    email = session.user.email;
  }

  function sendQuestionToServer(fieldsValue) {
    fieldsValue.email = email;
    if (
      fieldsValue.difficulty &&
      fieldsValue.age &&
      fieldsValue.content &&
      fieldsValue.subject &&
      fieldsValue.answers[0] &&
      checkboxValidation(fieldsValue.answers)
    ) {
      setShowLoading(true);
      fetch("/api/question", {
        method: "POST",
        body: JSON.stringify(fieldsValue),
      })
        .then((res) => res.json())
        .then((question) => {
          console.log(question);
          setValueOfQuestionField("");
          setValueOfAnswersFields([
            { content: "", id: uuidv4(), deleteIcon: false },
          ]);
          setShowMessage(true);
          setMessage(
            "Your question has been sent successfully, It will be checked soon by the webmaster, and then uploaded to the database"
          );
          setShowLoading(false);
        })
        .catch(() => console.log("error"));
    } else {
      setShowMessage(true);
      setMessage("Please fill all fields");
    }
  }
  function handleFieldContent() {
    fieldsValue.content = event.target.value;
    setValueOfQuestionField(event.target.value);
  }
  return (
    <div className={styles.content}>
      <div className={styles.title}>Add questions</div>
      {showLoading && (
        <CircularProgress sx={{ color: "rgba(133, 64, 245, 0.97)" }} />
      )}
      {!showLoading && (
        <>
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
            value={valueOfQuestionField}
            id="field-question"
            label="Write here the question"
            variant="outlined"
            name="content"
            required
            onChange={handleFieldContent}
          />

          <div className={styles.subTitle}>Please mark the correct answer</div>
          <AnswersFields
            valueOfAnswersFields={valueOfAnswersFields}
            setValueOfAnswersFields={setValueOfAnswersFields}
          />
          <div className={styles.submitDiv}>
            <Button
              className={styles.submitButton}
              variant="contained"
              key="submit"
              type="submit"
              onClick={() => sendQuestionToServer(fieldsValue)}
            >
              Submit
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function SelectAge({ agesArr }) {
  const [age, setAge] = useState("");

  const handleSelectAge = (event) => {
    setAge(event.target.value);
    fieldsValue.age = event.target.value;
  };

  return (
    <FormControl sx={{ width: "80px" }}>
      <InputLabel id="age-select">Age</InputLabel>
      <Select
        sx={{ width: "8vw" }}
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
    fieldsValue.subject = event.target.value;
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="subject-select">Subject</InputLabel>
      <Select
        sx={{ width: "18vw" }}
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
    fieldsValue.difficulty = event.target.value;
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="difficulty-select">Difficulty</InputLabel>
      <Select
        sx={{ width: "10vw" }}
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

function AnswersFields({ valueOfAnswersFields, setValueOfAnswersFields }) {
  const [checked, setChecked] = useState([]);

  const handleChange = (event, answerField, index) => {
    setChecked[index] = event.target.checked;
    fieldsValue.answers[index] = {
      ...fieldsValue.answers[index],
      isCorrect: event.target.checked,
    };
  };

  const handleAnswerChange = (answerField, index) => {
    fieldsValue.answers[index] = {
      ...fieldsValue.answers[index],
      content: event.target.value,
    };
    const _valueOfAnswersFields = [...valueOfAnswersFields];
    _valueOfAnswersFields[index].content = event.target.value;
    setValueOfAnswersFields(_valueOfAnswersFields);
  };

  function addAnswerField() {
    const _valueOfAnswersFields = [...valueOfAnswersFields];
    _valueOfAnswersFields[0].deleteIcon = true;
    setValueOfAnswersFields([
      ..._valueOfAnswersFields,
      { content: "", id: uuidv4(), deleteIcon: true },
    ]);
  }

  function removeAnswerField(answerFieldId, index) {
    let _valueOfAnswersFields = valueOfAnswersFields.filter(
      (answerField) => answerField !== answerFieldId
    );
    fieldsValue.answers.splice(index, 1);
    if (_valueOfAnswersFields.length === 1) {
      _valueOfAnswersFields[0].deleteIcon = false;
    }
    setValueOfAnswersFields([..._valueOfAnswersFields]);
  }

  return (
    <>
      <div>
        {valueOfAnswersFields.map((answerField, index) => (
          <div key={answerField.id} className={styles.answerFieldDiv}>
            <div className={styles.answerFieldNum}>{index + 1}</div>
            <TextField
              value={valueOfAnswersFields[index].content}
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
            {valueOfAnswersFields[index].deleteIcon && (
              <DeleteIcon
                style={{ width: "25px" }}
                onClick={() => removeAnswerField(answerField, index)}
              />
            )}
            {!valueOfAnswersFields[index].deleteIcon && (
              <div style={{ width: "25px" }}></div>
            )}
          </div>
        ))}
      </div>
      <div
        className={styles.addBtn}
        variant="outlined"
        key="addAnswerField"
        onClick={addAnswerField}
      >
        + Add answer
      </div>
    </>
  );
}
