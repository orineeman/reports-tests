import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress } from "@mui/material";
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
      setShowQuestions(newQuestions);
    })
    .catch(() => console.log("error"));
}

const confirmQuestions = (
  QuestionsIdForUpdate,
  setMessage,
  setShowMessage,
  setShowLoading,
  setShowQuestions
) => {
  if (QuestionsIdForUpdate.questions[0]) {
    setShowLoading(true);
    fetch("/api/question", {
      method: "PATCH",
      headers: { pleaseGet: "newQuestions" },
      body: JSON.stringify(QuestionsIdForUpdate.questions),
    })
      .then((update) => {
        console.log("the client side give-questions update:", update);
        setShowMessage(true);
        setMessage("The questions moved to the repository successfully");
        getDataFromServer(setShowQuestions);
        setShowLoading(false);
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
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    getDataFromServer(setShowQuestions);
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.title}>Check new questions</div>
      {showLoading && (
        <CircularProgress sx={{ color: "rgba(133, 64, 245, 0.97)" }} />
      )}
      {!showLoading && (
        <>
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
                confirmQuestions(
                  QuestionsIdForUpdate,
                  setMessage,
                  setShowMessage,
                  setShowLoading,
                  setShowQuestions
                )
              }
            >
              confirm
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function DataTable({ questions, QuestionsIdForUpdate }) {
  const columns = [
    {
      field: "age",
      headerName: "Age",
      width: 60,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 150,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      width: 110,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "question",
      headerName: "Question",
      width: 130,
      headerClassName: "header",
      headerAlign: "center",
    },
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
          sx={{
            "& .header": {
              fontWeight: 700,
              fontSize: "16px",
              color: "#040330",
            },
            borderColor: "#040330",
            "& .MuiDataGrid-cell:hover": {
              color: "#040330",
            },
          }}
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
