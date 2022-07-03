import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import { useState } from "react";
import styles from "./UploadingQuestions.module.css";
import Checkbox from "@mui/material/Checkbox";

const filedsValue = {};
export default function UploadingQuestions() {
  const [typeQuestion, setTypeQuestion] = useState(true);
  function sendQuestionToServer(filedsValue) {
    if (
      filedsValue.Firstanswer &&
      filedsValue.Secondanswer &&
      filedsValue.Thirdanswer &&
      filedsValue.Fourthanswer &&
      filedsValue.age &&
      filedsValue.content &&
      filedsValue.subject
    ) {
      // console.log(filedsValue);
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
      console.log(filedsValue);
      alert("Please fill all fields");
    }
    // שליחה לשרת
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
        <SelectAge />
        <SelectSubject />
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
      <QuestionTypeRadioButtons setTypeQuestion={setTypeQuestion} />
      {typeQuestion ? <MultipleChoiceFields /> : <OpenQuestion />}
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

function SelectAge() {
  const [age, setAge] = useState("");

  const handleSelectAge = (event) => {
    setAge(event.target.value);
    filedsValue.age = event.target.value;
    console.log(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel id="age-select">Age</InputLabel>
      <Select
        sx={{ width: "100px", marginRight: "20px" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleSelectAge}
        name="age"
      >
        <MenuItem value={"6"}>6</MenuItem>
        <MenuItem value={"7"}>7</MenuItem>
        <MenuItem value={"8"}>8</MenuItem>
        <MenuItem value={"9"}>9</MenuItem>
        <MenuItem value={"10"}>10</MenuItem>
        <MenuItem value={"11"}>11</MenuItem>
      </Select>
    </FormControl>
  );
}
function SelectSubject() {
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
        <MenuItem value={"Simple fractions"}>Simple fractions</MenuItem>
        <MenuItem value={"Decimal fractions"}>Decimal fractions</MenuItem>
        <MenuItem value={"Polygons"}>Polygons</MenuItem>
        <MenuItem value={"Multiply vertically"}>Multiply vertically</MenuItem>
        <MenuItem value={"Measurements"}>Measurements</MenuItem>
      </Select>
    </FormControl>
  );
}

function QuestionTypeRadioButtons({ setTypeQuestion }) {
  return (
    <FormControl>
      <FormLabel id="question_type_label" sx={{ marginTop: "15px" }}>
        Select a question type
      </FormLabel>

      <RadioGroup
        sx={{ color: "#667474", required: "true" }}
        row
        // aria-labelledby="demo-row-radio-buttons-group-label"
        name="question-type"
        defaultValue="multiple-choice-question"
        onChange={(event) => QuestionTypeRadio(event, setTypeQuestion)}
      >
        <FormControlLabel
          value="multiple-choice-question"
          control={<Radio />}
          label="Multiple choice question"
        />
        <FormControlLabel
          value="open-question"
          control={<Radio />}
          label="Open question"
        />
      </RadioGroup>
    </FormControl>
  );
}
function QuestionTypeRadio(event, setTypeQuestion) {
  if (event.target.value === "multiple-choice-question") {
    setTypeQuestion(true);
  } else {
    setTypeQuestion(false);
  }
}

function MultipleChoiceFields() {
  const filedAnswers = [
    "First-answer",
    "Second-answer",
    "Third-answer",
    "Fourth-answer",
  ];
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleAnswerChange = (event, answerField) => {
    const answer = answerField.replace("-", "");
    filedsValue[answer] = event.target.value;
    console.log(event.target.value);
  };

  return (
    <div>
      <p style={{ fontSize: "15px", color: "#666666" }}>
        Mark the correct/s answer/s
      </p>
      {filedAnswers.map((answerField) => (
        <div className="new-student-div" key={answerField}>
          <TextField
            sx={{ marginTop: "10px", width: "600px" }}
            id={answerField}
            label={answerField}
            variant="outlined"
            name={answerField}
            onChange={() => handleAnswerChange(event, answerField)}
          />
          <Checkbox
            value={answerField}
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            name={answerField}
          />
        </div>
      ))}
    </div>
  );
}

function OpenQuestion() {
  return (
    <div>
      <div className="textField-margin">
        <TextField
          sx={{ marginTop: "10px", width: "650px" }}
          id="answer"
          label="Answer"
          variant="outlined"
          name="open-answer"
        />
      </div>
    </div>
  );
}
