import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./UpdateQuestion.module.css";
import { DataGrid } from "@mui/x-data-grid";
import getDataFromServer from "../../utils/getAgeSubjectDif";
import MenuItem from "@mui/material/MenuItem";
import { Button, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import messageContext from "../../Context/messageContext";

function getQuesionFromServer(
  questionIdToUpdate,
  setQuestionData,
  setShowLoding
) {
  fetch("/api/admin/update-question", {
    method: "GET",
    headers: { questionid: questionIdToUpdate },
  })
    .then((res) => res.json())
    .then((questionAndAnswers) => {
      console.log("questionAndAnswers", questionAndAnswers);
      setQuestionData(questionAndAnswers);
      setShowLoding(false);
    })
    .catch(() => console.log("error"));
}

const changesToUpdate = {
  questionId: "",
  answerContent: {},
  age: "",
  difficulty: "",
  questionContent: "",
  subject: "",
};

function updateQuestion(
  changesToUpdate,
  handleCloseDialog,
  setMessage,
  setShowMessage
) {
  fetch("/api/admin/update-question", {
    method: "PATCH",
    body: JSON.stringify(changesToUpdate),
  })
    .then(() => {
      setShowMessage(true);
      setMessage("The question has been successfully updated");
      getDataFromServer();
    })
    .catch(() => console.log("error"));
  handleCloseDialog();
}
function deleteQuestion(
  questionIdToUpdate,
  handleCloseDialog,
  setMessage,
  setShowMessage
) {
  fetch("/api/admin/update-question", {
    method: "DELETE",
    body: JSON.stringify(questionIdToUpdate),
  })
    .then(() => {
      setShowMessage(true);
      setMessage("The question has been successfully deleted");
    })
    .catch(() => console.log("error"));
  handleCloseDialog();
}
export default function UploadingQuestions({
  openUpdateQuestionDialog,
  setOpenUpdateQuestionDialog,
  questionIdToUpdate,
}) {
  const [agesArr, setAgesArr] = useState([]);
  const [subjectsArr, setSubjectsArr] = useState([]);
  const [difficultiesArr, setDifficultiesArr] = useState([]);
  const [questionData, setQuestionData] = useState({});
  const { setMessage, setShowMessage } = useContext(messageContext);
  const [showLoding, setShowLoding] = useState(true);

  changesToUpdate.questionId = questionIdToUpdate;

  useEffect(() => {
    if (questionIdToUpdate) {
      getQuesionFromServer(questionIdToUpdate, setQuestionData, setShowLoding);
      getDataFromServer(setAgesArr, setSubjectsArr, setDifficultiesArr);
    }
  }, [questionIdToUpdate]);

  const handleCloseDialog = () => {
    setOpenUpdateQuestionDialog(false);
    setShowLoding(true);
  };

  return (
    <div>
      <Dialog
        sx={{ margin: "30px" }}
        fullScreen={true}
        open={openUpdateQuestionDialog}
        onClose={handleCloseDialog}
      >
        {showLoding && (
          <CircularProgress
            style={{ margin: "auto", color: "rgba(133, 64, 245, 0.97)" }}
          />
        )}
        {!showLoding && (
          <>
            <DialogTitle className={styles.title}>Question update</DialogTitle>
            <DialogContent>
              <DialogContentText className={styles.subTitle}>
                Modify the data as you wish and click Save Changes.
              </DialogContentText>
              <TextFields
                questionData={questionData}
                difficultiesArr={difficultiesArr}
                agesArr={agesArr}
                subjectsArr={subjectsArr}
              />
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className={styles.subTitles}>answers</div>
                  <AnswersFields questionData={questionData} />
                </div>
                <div>
                  <DataTable
                    sx={{ width: 400, minHeight: 100 }}
                    questionData={questionData}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button className={styles.btn} onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button
                className={styles.btn}
                onClick={() =>
                  deleteQuestion(
                    questionIdToUpdate,
                    handleCloseDialog,
                    setMessage,
                    setShowMessage
                  )
                }
              >
                Delete question
              </Button>
              <Button
                className={styles.btn}
                onClick={() =>
                  updateQuestion(
                    changesToUpdate,
                    handleCloseDialog,
                    setMessage,
                    setShowMessage
                  )
                }
              >
                Save Changes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}

function TextFields({ questionData, difficultiesArr, agesArr, subjectsArr }) {
  const [currentAge, setCurrentAge] = useState("");
  const [currentSubject, setCurrentSubject] = useState("");
  const [currentDifficulty, setCurrentDifficulty] = useState("");
  let questionContent = "";
  if (questionData?.question?.content) {
    questionContent = questionData?.question?.content;
  }
  const [currentQuestion, setCurrentQuestion] = useState(questionContent);
  useEffect(() => {
    if (questionData?.question?.content) {
      setCurrentQuestion(questionData.question.content);
    }
  }, [questionData?.question?.content]);

  useEffect(() => {
    if (
      questionData?.question?.age?._id &&
      questionData?.question?.subject?._id &&
      questionData?.question?.difficulty?._id
    ) {
      setCurrentAge(questionData.question.age._id);
      setCurrentSubject(questionData.question.subject._id);
      setCurrentDifficulty(questionData.question.difficulty._id);
    }
  }, [difficultiesArr, subjectsArr, agesArr, questionData]);
  const handleChangeAge = (event) => {
    const indexOfAge = agesArr.findIndex(
      (age) => age._id === event.target.value
    );
    setCurrentAge(agesArr[indexOfAge]._id);
    changesToUpdate.age = event.target.value;
  };
  const handleChangeSubject = (event) => {
    const indexOfSubject = subjectsArr.findIndex(
      (subject) => subject._id === event.target.value
    );
    setCurrentSubject(subjectsArr[indexOfSubject]._id);
    changesToUpdate.subject = event.target.value;
  };
  const handleChangeDifficulty = (event) => {
    const indexOfDifficulty = difficultiesArr.findIndex(
      (difficulty) => difficulty._id === event.target.value
    );
    setCurrentDifficulty(difficultiesArr[indexOfDifficulty]._id);
    changesToUpdate.difficulty = event.target.value;
  };
  const handleChangeQuestionContent = (event) => {
    changesToUpdate.questionContent = event.target.value;
    setCurrentQuestion(event.target.value);
  };

  return (
    <>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div className={styles.subTitles}>
          question
          <TextField
            sx={{ width: 400 }}
            value={currentQuestion}
            variant="outlined"
            onChange={handleChangeQuestionContent}
          ></TextField>
        </div>
        <div className={styles.subTitles}>
          age
          <TextField
            select
            sx={{ width: 100 }}
            value={currentAge}
            onChange={handleChangeAge}
            variant="outlined"
          >
            {agesArr.map((age) => (
              <MenuItem key={age._id} value={age._id}>
                {age.age}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className={styles.subTitles}>
          subject
          <TextField
            select
            sx={{ width: 250 }}
            value={currentSubject}
            onChange={handleChangeSubject}
            variant="outlined"
          >
            {subjectsArr.map((subject) => (
              <MenuItem key={subject._id} value={subject._id}>
                {subject.subject}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className={styles.subTitles}>
          difficulty
          <TextField
            select
            sx={{ width: 150 }}
            value={currentDifficulty}
            onChange={handleChangeDifficulty}
            variant="outlined"
          >
            {difficultiesArr.map((difficulty) => (
              <MenuItem key={difficulty._id} value={difficulty._id}>
                {difficulty.difficulty}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
    </>
  );
}

function AnswersFields({ questionData }) {
  const handleChangeAnswerContent = (event, answerId) => {
    changesToUpdate.answerContent[answerId] = event.target.value;
  };
  return (
    <>
      {questionData?.answers?.map((answer, i) => (
        <div
          key={answer._id}
          style={{
            display: "flex",
            alignItems: "center",

            justifyContent: "space-evenly",
            marginBottom: 10,
          }}
        >
          <div style={{ marginRight: 20 }}>{i + 1}</div>
          <TextField
            sx={{ width: 150 }}
            defaultValue={answer.content}
            onChange={() => handleChangeAnswerContent(event, answer._id)}
            variant="outlined"
          ></TextField>
        </div>
      ))}
    </>
  );
}

function DataTable({ questionData }) {
  const columns = [
    { field: "content", headerName: "answer content", width: 110 },
    // { field: "responses", headerName: "Responses", width: 80 },
    { field: "right", headerName: "Right", width: 50 },
    { field: "mistakes", headerName: "Mistakes", width: 70 },
    {
      field: "misleadingPercentages",
      headerName: "Misleading percentages",
      width: 150,
    },
  ];

  const rows = [];
  questionData?.answers?.map((answer) => {
    const answersToRows = {
      content: answer.content,
      // responses: answer.statistics.numberOfResponses,
      right: answer.statistics.amountOfRight,
      mistakes: answer.statistics.amountOfMistakes,
      misleadingPercentages: `${
        Math.round(
          (100 / answer.statistics.numberOfResponses) *
            answer.statistics.amountOfMistakes *
            10
        ) / 10
      } %`,
      id: answer._id,
    };
    rows.push(answersToRows);
  });
  return (
    <>
      <div style={{ width: "100%", marginTop: "20px" }}>
        <div className={styles.statistics}>statistics:</div>
        <div>
          <div className={styles.statisticsTitles}>
            Average response time (Seconds):
            <div className={styles.statisticsValue}>
              {Math.round(questionData.averageResponsesTime * 10) / 10}
            </div>
          </div>
          <div className={styles.statisticsTitles}>
            The number of times we answered the answer:
            <div className={styles.statisticsValue}>
              {questionData.numberOfResponses}
            </div>
          </div>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{ width: 500, fontSize: "12px", height: 300 }}
        />
      </div>
    </>
  );
}
