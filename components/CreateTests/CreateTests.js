import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import messageContext from "../../Context/messageContext";
import styles from "./CreateTests.module.css";

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
  setShowMessage,
  setTestNameField,
  setShowLoading
) => {
  let testIdAndEmail = {};
  console.log(QuestionsIdForTest);
  if (QuestionsIdForTest.questions && QuestionsIdForTest.label) {
    setShowLoading(true);
    try {
      const json = await fetch("/api/test", {
        method: "POST",
        body: JSON.stringify(QuestionsIdForTest),
      });
      const test = await json.json();
      testIdAndEmail.testId = test._id;
      setTestNameField("");
    } catch (err) {
      console.log("error", err);
    }

    testIdAndEmail.email = email;
    try {
      const json2 = await fetch("/api/teacher", {
        method: "PATCH",
        body: JSON.stringify(testIdAndEmail),
      });
      await json2.json();
      setShowMessage(true);
      setMessage("The test was saved successfully");
      setShowLoading(false);
    } catch (err) {
      console.log("error", err);
    }
  } else {
    setShowMessage(true);
    setMessage("Please fill all fields");
  }
};

const questionsIdForTest = { questions: [], label: "" };
export default function CreateTests() {
  const { setMessage, setShowMessage } = useContext(messageContext);
  const [testNameField, setTestNameField] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const { data: session } = useSession();
  let email = "";
  if (session) {
    email = session.user.email;
  }
  const [showTest, setShowTest] = useState([]);
  useEffect(() => {
    getDataFromServer(setShowTest);
  }, []);

  function handleFieldTestName() {
    questionsIdForTest.label = event.target.value;
    setTestNameField(event.target.value);
  }
  return (
    <div className={styles.content}>
      <div className={styles.title}>Create Tests</div>
      {showLoading && (
        <CircularProgress sx={{ color: "rgba(133, 64, 245, 0.97)" }} />
      )}
      {!showLoading && (
        <>
          <TextField
            value={testNameField}
            className={styles.testName}
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
          <div className={styles.submitDiv}>
            <Button
              className={styles.submitButton}
              variant="contained"
              key="submit"
              type="submit"
              onClick={() =>
                submitTest(
                  questionsIdForTest,
                  email,
                  setMessage,
                  setShowMessage,
                  setTestNameField,
                  setShowLoading
                )
              }
            >
              Submit
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function DataTable({ questions, questionsIdForTest }) {
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
      <div className={styles.subTitle}>
        Select the questions you want and click Submit to create the test:
      </div>
      <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
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
          onSelectionModelChange={(newSelectionModel) => {
            questionsIdForTest.questions = newSelectionModel;
          }}
        />
      </div>
    </>
  );
}
