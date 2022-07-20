import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

function getDataFromServer(setShowQuestions) {
  fetch("/api/question", {
    method: "GET",
    headers: { pleaseGet: "newQuestions" },
  })
    .then((res) => res.json())
    .then((newQuestions) => {
      console.log(newQuestions);
      setShowQuestions(newQuestions);
    })
    .catch(() => console.log("error"));
}

const confirmQuestions = (QuestionsIdForUpdate) => {
  if (QuestionsIdForUpdate.questions[0]) {
    fetch("/api/question", {
      method: "PATCH",
      headers: { pleaseGet: "newQuestions" },
      body: JSON.stringify(QuestionsIdForUpdate.questions),
    })
      .then((update) => {
        console.log("the client side give-questions update:", update);
        alert("The questions moved to the repository successfully");
        getDataFromServer();
      })
      .catch(() => console.log("error"));
  } else {
    alert("You did not select any questions");
  }
};

export default function CheckNewQuestions() {
  const QuestionsIdForUpdate = { questions: [] };
  const [showQuestions, setShowQuestions] = useState([]);
  useEffect(() => {
    getDataFromServer(setShowQuestions);
  }, []);

  return (
    <>
      <h2>Check new questions</h2>

      <DataTable
        questions={showQuestions}
        QuestionsIdForUpdate={QuestionsIdForUpdate}
      />
      <div
      //   className="flex-div confirm-button"
      >
        <Button
          variant="contained"
          sx={{ margin: "15px", width: "150px" }}
          key="confirm"
          type="confirm"
          onClick={() => confirmQuestions(QuestionsIdForUpdate)}
        >
          confirm
        </Button>
      </div>
    </>
  );
}

function DataTable({ questions, QuestionsIdForUpdate }) {
  const columns = [
    { field: "age", headerName: "Age", width: 60 },
    { field: "subject", headerName: "Subject", width: 150 },
    { field: "difficulty", headerName: "Difficulty", width: 110 },
    { field: "question", headerName: "Question", width: 130 },
    {
      field: "answers",
      headerName: "Answers",
      width: 130,
      height: 100,
    },
  ];

  const rows = [];
  questions.map((question) => {
    const answers = [];
    for (let answer of question.answers) {
      answers.push(answer.content);
    }
    const questionToRows = {
      subject: question.subject.subject,
      age: question.age.age,
      difficulty: question.difficulty.difficulty,
      question: question.content,
      answers: answers,
      id: question._id,
    };
    rows.push(questionToRows);
  });
  return (
    <>
      <h6>
        Highlight the questions you want to approve for teachers to use, and
        click on confirm button
      </h6>
      <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          // sx={{ color: "red" }}
          onSelectionModelChange={(newSelectionModel) => {
            QuestionsIdForUpdate.questions = newSelectionModel;
          }}
        />
      </div>
    </>
  );
}