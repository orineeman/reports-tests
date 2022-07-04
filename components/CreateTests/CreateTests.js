// import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
// import { questionsData } from "../json-questions";
// import { test1, questionsData } from "../../../Test-reports/src/json-questions";

function getDataFromServer(setShowTest) {
  fetch("/api/question", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((questions) => {
      console.log(questions);
      setShowTest(questions);
    })
    .catch(() => console.log("error"));
}

function submitTest(QuestionsIdForTest) {
  console.log(QuestionsIdForTest);
  fetch("/api/test", {
    method: "POST",
    body: JSON.stringify(QuestionsIdForTest),
  })
    .then((res) => res.json())
    .then((test) => {
      console.log("the client side give test:", test);
      alert("The test was saved successfully");
    })
    .catch(() => console.log("error"));
}

// function showTestInTable(test1) {
//   // console.log(test1);
//   const test = questionsData.filter(
//     (question) => question.id === test1[0] || question.id === test1[1]
//   );
//   console.log(test);
// }
export default function CreateTests() {
  const questionsIdForTest = { questions: [] };
  const [showTest, setShowTest] = useState([]);
  useEffect(() => {
    getDataFromServer(setShowTest);
  }, []);

  // function SelectExistingTest() {
  //   const handleSelectExistingTest = (event) => {
  //     console.log(event.target.value);
  //     setShowTest(true);
  //   };
  //   return (
  //     <FormControl fullWidth>
  //       <InputLabel id="existingTest-select">Existing test</InputLabel>
  //       <Select
  //         sx={{ width: "300px" }}
  //         labelId="existingTest_select_label"
  //         id="existingTest_select"
  //         value="existingTest"
  //         label="existingTest"
  //         name="existingTest"
  //         onChange={handleSelectExistingTest}
  //       >
  //         <MenuItem value={"test1"}>Test1</MenuItem>
  //         <MenuItem value={"test2"}>Test2</MenuItem>
  //       </Select>
  //     </FormControl>
  //   );
  // }

  return (
    <>
      {/* <SelectExistingTest /> */}
      {/* {showTest && showTestInTable(test1)} */}
      {/* <form action="/teachers" method="GET" onSubmit={(e) => testSubmit(e)}> */}
      <h2>Tests - Create & Edit </h2>
      {/* <h6>Filter questions by age and subject </h6>
      <div className="flex-div">
        <SelectAge />
        <SelectSubject />
      </div>
      <TextField
        sx={{ width: "650px", marginTop: "20px" }}
        id="Test-name-field"
        label="Test name"
        variant="outlined"
        name="test-name"
        title="Name the test (for your use)"
      /> */}

      <DataTable questions={showTest} questionsIdForTest={questionsIdForTest} />
      <div className="flex-div submit-button">
        <Button
          variant="contained"
          sx={{ margin: "15px", width: "150px" }}
          key="submit"
          type="submit"
          onClick={() => submitTest(questionsIdForTest)}
        >
          Submit
        </Button>
      </div>
      {/* </form> */}
    </>
  );
}

// function SelectAge() {
//   const [age, setAge] = useState("");

//   const handleSelectAge = (event) => {
//     setAge(event.target.value);
//   };

//   return (
//     <FormControl>
//       <InputLabel id="age-select">Age</InputLabel>
//       <Select
//         sx={{ width: "100px", marginRight: "20px" }}
//         labelId="demo-simple-select-label"
//         id="demo-simple-select"
//         value={age}
//         label="Age"
//         onChange={handleSelectAge}
//         name="age"
//       >
//         <MenuItem value={6}>6</MenuItem>
//         <MenuItem value={7}>7</MenuItem>
//         <MenuItem value={8}>8</MenuItem>
//         <MenuItem value={9}>9</MenuItem>
//         <MenuItem value={10}>10</MenuItem>
//         <MenuItem value={11}>11</MenuItem>
//       </Select>
//     </FormControl>
//   );
// }
// function SelectSubject() {
//   const [subject, setSubject] = useState("");

//   const handleSelectSubject = (event) => {
//     setSubject(event.target.value);
//   };

//   return (
//     <FormControl fullWidth>
//       <InputLabel id="subject-select">Subject</InputLabel>
//       <Select
//         sx={{ width: "300px" }}
//         labelId="subject_select_label"
//         id="subject_select"
//         value={subject}
//         label="subject"
//         name="subject"
//         onChange={handleSelectSubject}
//       >
//         <MenuItem value={"Simple fractions"}>Simple fractions</MenuItem>
//         <MenuItem value={"Decimal fractions"}>Decimal fractions</MenuItem>
//         <MenuItem value={"Polygons"}>Polygons</MenuItem>
//         <MenuItem value={"Multiply vertically"}>Multiply vertically</MenuItem>
//         <MenuItem value={"Measurements"}>Measurements</MenuItem>
//       </Select>
//     </FormControl>
//   );
// }

function DataTable({ questions, questionsIdForTest }) {
  console.log(questionsIdForTest);
  const columns = [
    { field: "age", headerName: "Age", width: 60 },
    { field: "subject", headerName: "Subject", width: 150 },
    { field: "difficulty", headerName: "Difficulty", width: 110 },
    { field: "question", headerName: "Question", width: 130 },

    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
  ];
  const rows = [];
  console.log(questions);
  questions.map((question) => {
    const questionToRows = {
      subject: question.subject.subject,
      age: question.age.age,
      difficulty: question.difficulty.difficulty,
      question: question.content,
      id: question._id,
    };
    rows.push(questionToRows);
  });
  return (
    <>
      <h6>
        Select the questions you want and click Submit to create the test:
      </h6>
      <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            questionsIdForTest.questions = newSelectionModel;
            console.log(questionsIdForTest.questions);
          }}
        />
      </div>
    </>
  );
}
