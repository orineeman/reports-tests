import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import messageContext from "../../Context/messageContext";
import styles from "./CheckNewQuestions.module.css";

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

const confirmQuestions = (QuestionsIdForUpdate, setMessage, setShowMessage) => {
  if (QuestionsIdForUpdate.questions[0]) {
    fetch("/api/question", {
      method: "PATCH",
      headers: { pleaseGet: "newQuestions" },
      body: JSON.stringify(QuestionsIdForUpdate.questions),
    })
      .then((update) => {
        console.log("the client side give-questions update:", update);
        setShowMessage(true);
        setMessage("The questions moved to the repository successfully");
        getDataFromServer();
      })
      .catch(() => console.log("error"));
  } else {
    setShowMessage(true);
    setMessage("You did not select any questions");
  }
};

export default function CheckNewQuestions() {
  const QuestionsIdForUpdate = { questions: [] };
  const [showQuestions, setShowQuestions] = useState([]);
  const { setMessage, setShowMessage } = useContext(messageContext);

  useEffect(() => {
    getDataFromServer(setShowQuestions);
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.title}>Check new questions</div>

      <DataTable
        questions={showQuestions}
        QuestionsIdForUpdate={QuestionsIdForUpdate}
      />
      <div className={styles.submitDiv}>
        <Button
          className={styles.submitButton}
          variant="contained"
          key="confirm"
          type="confirm"
          onClick={() =>
            confirmQuestions(QuestionsIdForUpdate, setMessage, setShowMessage)
          }
        >
          confirm
        </Button>
      </div>
    </div>
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
      <div className={styles.subTitle}>
        Highlight the questions you want to approve for teachers to use, and
        click on confirm button
      </div>
      <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            QuestionsIdForUpdate.questions = newSelectionModel;
          }}
        />
      </div>
    </>
  );
}
