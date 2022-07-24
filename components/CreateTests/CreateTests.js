import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import messageContext from "../../Context/messageContext";

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

const submitTest = async (
  QuestionsIdForTest,
  email,
  setMessage,
  setShowMessage
) => {
  let testIdAndEmail = {};
  if (QuestionsIdForTest.questions && QuestionsIdForTest.label) {
    await fetch("/api/test", {
      method: "POST",
      body: JSON.stringify(QuestionsIdForTest),
    })
      .then((res) => res.json())
      .then((test) => {
        testIdAndEmail.testId = test._id;
      })
      .catch(() => console.log("error"));

    testIdAndEmail.email = email;

    fetch("/api/teacher", {
      method: "PATCH",
      body: JSON.stringify(testIdAndEmail),
    })
      .then((res) => res.json())
      .then(() => {
        setShowMessage(true);
        setMessage("The test was saved successfully");
      })
      .catch(() => console.log("error"));
  } else {
    setShowMessage(true);
    setMessage("Please fill all fields");
  }
};

export default function CreateTests() {
  const { setMessage, setShowMessage } = useContext(messageContext);

  const { data: session } = useSession();
  let email = "";
  if (session) {
    email = session.user.email;
  }
  const questionsIdForTest = { questions: [], label: "" };
  const [showTest, setShowTest] = useState([]);
  useEffect(() => {
    getDataFromServer(setShowTest);
  }, []);

  function handleFieldTestName() {
    questionsIdForTest.label = event.target.value;
  }
  return (
    <>
      <h2>Create Tests</h2>
      <TextField
        sx={{ width: "650px", marginTop: "20px" }}
        id="Test-name-field"
        label="Test name"
        variant="outlined"
        name="label"
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
          onClick={() =>
            submitTest(questionsIdForTest, email, setMessage, setShowMessage)
          }
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
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            questionsIdForTest.questions = newSelectionModel;
          }}
        />
      </div>
    </>
  );
}
