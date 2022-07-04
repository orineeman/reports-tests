import { Button, Checkbox, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import styles from "./UploadingQuestions.module.css";

function getDataFromServer(setAgesArr, setSubjectsArr, setDifficultiesArr) {
  fetch("/api/age", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((ages) => {
      setAgesArr(ages);
    })
    .catch(() => setAgesArr(["error"]));

  fetch("/api/subject", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((subjects) => {
      setSubjectsArr(subjects);
    })
    .catch(() => setSubjectsArr(["error"]));

  fetch("/api/difficulty", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((difficulties) => {
      setDifficultiesArr(difficulties);
    })
    .catch(() => setDifficultiesArr(["error"]));
}

const filedsValue = {
  difficulty: "",
  age: "",
  subject: "",
  content: "",
  answers: [],
};
export default function UploadingQuestions() {
  const [agesArr, setAgesArr] = useState([]);
  const [subjectsArr, setSubjectsArr] = useState([]);
  const [difficultiesArr, setDifficultiesArr] = useState([]);
  useEffect(() => {
    getDataFromServer(setAgesArr, setSubjectsArr, setDifficultiesArr);
  }, []);

  function sendQuestionToServer(filedsValue) {
    console.log(filedsValue);
    if (
      filedsValue.difficulty &&
      filedsValue.age &&
      filedsValue.content &&
      filedsValue.subject &&
      filedsValue.answers
    ) {
      fetch("/api/question", {
        method: "POST",
        body: JSON.stringify(filedsValue),
      })
        .then((res) => res.json())
        .then((question) => {
          console.log("the client side", question);
          alert("Your question has been sent successfully");
        })
        .catch(() => console.log("error"));
    } else {
      alert("Please fill all fields");
    }
  }
  function handleFieldContent() {
    filedsValue.content = event.target.value;
  }
  return (
    <>
      {/* <form
        action="/about"
        method="GET"
        target="hiddenFrame"
        onSubmit={(e) => testSubmit(e)}
     >  */}
      <h2>Uploading questions</h2>
      <div className={styles.flex}>
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
        sx={{ width: "650px", marginTop: "20px" }}
        id="field-question"
        label="Write here the question"
        variant="outlined"
        name="content"
        required
        onChange={handleFieldContent}
      />
      <AnswersFields />
      {/* <QuestionTypeRadioButtons setTypeQuestion={setTypeQuestion} /> */}
      {/* {typeQuestion ? <MultipleChoiceFields /> : <OpenQuestion />} */}
      <div className={styles.submitButton}>
        <Button
          variant="contained"
          sx={{ margin: "15px", width: "150px" }}
          key="submit"
          type="submit"
          onClick={() => sendQuestionToServer(filedsValue)}
        >
          Submit
        </Button>
      </div>
      {/* </form> */}
    </>
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
        sx={{ width: "100px", mr: 20 }}
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
  // const checkboxObj = {};

  const handleChange = (event, answerField, index) => {
    setChecked[index] = event.target.checked;
    filedsValue.answers[index].isCorrect = event.target.checked;
  };

  const handleAnswerChange = (answerField, index) => {
    console.log("index", index);
    filedsValue.answers[index] = { content: "", isCorrect: false };
    // .content for the object
    filedsValue.answers[index].content = event.target.value;
    console.log(filedsValue);

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
        <div>
          {newAnswerField.map((answerField, index) => (
            <div key={answerField}>
              {index + 1}
              <TextField
                autoFocus
                sx={{ width: "300px", margin: "10px" }}
                id={index + 300}
                label="answer"
                variant="outlined"
                onChange={() => handleAnswerChange(answerField, index)}
              />
              <Checkbox
                value={answerField}
                id={index + 100}
                checked={checked[index]}
                onChange={() => handleChange(event, answerField, index)}
                inputProps={{ "aria-label": "controlled" }}
                name={answerField}
              />
              <Button
                variant="outlined"
                sx={{ height: "40px", margin: "10px", width: "40px" }}
                key="addAnswer"
                id={answerField}
                onClick={() => removeAnswerField(answerField, index)}
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
          key="addAnswer"
          onClick={addAnswerField}
        >
          Add answer
        </Button>
      </div>
    </>
  );
}
