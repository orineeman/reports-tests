// import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// import styles from "./createTests.module";

function getDataFromServer(setShowTest) {
  fetch("/api/question", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((questions) => {
      setShowTest(questions);
    })
    .catch(() => console.log("error"));
}

const submitTest = async (QuestionsIdForTest, email) => {
  let testIdAndEmail = {};
  console.log(QuestionsIdForTest);
  if (QuestionsIdForTest.questions && QuestionsIdForTest.testName) {
    await fetch("/api/test", {
      method: "POST",
      body: JSON.stringify(QuestionsIdForTest),
    })
      .then((res) => res.json())
      .then((test) => {
        console.log(test._id);
        testIdAndEmail.testId = test._id;
        console.log("the client side give test:", test);
        // alert("The test was saved successfully");
      })
      .catch(() => console.log("error"));

    testIdAndEmail.email = email;
    console.log(testIdAndEmail);

    fetch("/api/teacher", {
      method: "PATCH",
      body: JSON.stringify(testIdAndEmail),
    })
      .then((res) => res.json())
      .then((teacherUpdate) => {
        console.log("the client side give-teacherUpdate:", teacherUpdate);
        alert("The test was saved successfully");
      })
      .catch(() => console.log("error"));
  } else {
    alert("Please fill all fields");
  }
};

export default function CreateTests() {
  const { data: session } = useSession();
  let email = "";
  if (session) {
    email = session.user.email;
  }
  const questionsIdForTest = { questions: [], testName: "" };
  const [showTest, setShowTest] = useState([]);
  useEffect(() => {
    getDataFromServer(setShowTest);
  }, []);

  function handleFieldTestName() {
    questionsIdForTest.testName = event.target.value;
  }
  return (
    <>
      <h2>Create Tests</h2>
      <TextField
        sx={{ width: "650px", marginTop: "20px" }}
        id="Test-name-field"
        label="Test name"
        variant="outlined"
        name="testName"
        title="Name the test (for your use)"
        onChange={handleFieldTestName}
      />

      <DataTable
        questions={showTest}
        questionsIdForTest={questionsIdForTest}
        email={email}
      />
      <div className="flex-div submit-button">
        <Button
          variant="contained"
          sx={{ margin: "15px", width: "150px" }}
          key="submit"
          type="submit"
          onClick={() => submitTest(questionsIdForTest, email)}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

function DataTable({ questions, questionsIdForTest }) {
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
          }}
        />
      </div>
    </>
  );
}
