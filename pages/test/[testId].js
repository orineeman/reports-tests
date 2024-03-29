import { Button, CircularProgress, Divider, Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import messageContext from "../../Context/messageContext";
import styles from "./testId.module.css";

let answerTime = 0;

async function getTestFromServer(
  testId,
  setNextQuestion,
  setQuestionNum,
  setNumOfQuestion,
  setTest,
  email,
  setDoneTest,
  setShowLobby,
  setTestLabel
) {
  try {
    const json = await fetch("/api/test", {
      method: "GET",
      headers: { pleaseGetTestId: testId, email },
    });
    const data = await json.json();
    const test = data.filterdData.questions;
    const currentQuestion = data.currentQuestion;
    setDoneTest(data.done);
    setTest(test);
    setNextQuestion(test[currentQuestion - 1]);
    setNumOfQuestion(test.length);
    setQuestionNum(currentQuestion);
    setTestLabel(data.filterdData.label);
    setShowLobby(true);
  } catch (err) {
    console.log(err);
  }
}

async function sendDataToServer(dataToServer, nextQuestion, answerTime) {
  dataToServer.questionId = nextQuestion._id;
  const restAnswers = nextQuestion.answers.filter(
    (answer) => !dataToServer.markedAnswersId.includes(answer._id)
  );
  dataToServer.restAnswers = restAnswers;
  dataToServer.time = answerTime;
  console.log("dataToServer", dataToServer);
  try {
    await fetch("/api/student", {
      method: "PATCH",
      headers: { answer: "answer" },
      body: JSON.stringify({
        dataToServer,
      }),
    });
  } catch (e) {
    console.log("error");
  }
}

function answerTimeCount(intervalId, setIntervalId) {
  if (intervalId) {
    clearInterval(intervalId);
    setIntervalId(0);
  }
  const newIntervalId = setInterval(() => {
    answerTime++;
  }, 1000);
  setIntervalId(newIntervalId);
}

function startTest(setShowQuestions, intervalId, setIntervalId) {
  setShowQuestions(true);
  answerTimeCount(intervalId, setIntervalId);
}

export default function TestLobby() {
  const router = useRouter();
  const { testId } = router.query;
  const [doneTest, setDoneTest] = useState(false);

  return (
    <Grid container>
      <div className={styles.studentNav}>
        <div className={styles.linksStudentNav}>Goodluck!</div>
      </div>
      {!doneTest && <TestQuestions testId={testId} setDoneTest={setDoneTest} />}
      {doneTest && (
        <div className={styles.content}>
          <div className={styles.subTitle}>
            You have completed this test before
          </div>
        </div>
      )}
    </Grid>
  );
}

function TestQuestions({ testId, setDoneTest }) {
  let email = "";
  const [showQuestions, setShowQuestions] = useState(false);
  const [testLabel, setTestLabel] = useState("");
  const [showLobby, setShowLobby] = useState(false);
  const [nextQuestion, setNextQuestion] = useState({});
  const [test, setTest] = useState();
  const [numOfQuestions, setNumOfQuestions] = useState(0);
  const [questionNum, setQuestionNum] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [checked, setChecked] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const { setMessage, setShowMessage } = useContext(messageContext);

  const router = useRouter();
  const dataToServer = {
    markedAnswersId: [],
    time: 0,
    currentQuestion: questionNum,
    email: "",
    testId,
    questionId: "",
    restAnswers: [],
  };
  const { data: session } = useSession();
  if (session) {
    email = session.user.email;
    dataToServer.email = email;
  }

  useEffect(() => {
    if (email && testId) {
      getTestFromServer(
        testId,
        setNextQuestion,
        setQuestionNum,
        setNumOfQuestions,
        setTest,
        email,
        setDoneTest,
        setShowLobby,
        setTestLabel
      );
    }
  }, [email, setDoneTest, testId]);

  async function goOn(test, intervalId, setIntervalId) {
    if (questionNum <= test.length) {
      setShowLoading(true);
      await sendDataToServer(dataToServer, nextQuestion, answerTime);
      setNextQuestion(test[questionNum]);
      setQuestionNum(questionNum + 1);
      answerTime = 0;
      answerTimeCount(intervalId, setIntervalId, answerTime, dataToServer);
      setChecked([]);
      setShowLoading(false);
      if (questionNum === test.length) {
        setShowMessage(true);
        setMessage("Well done");
        router.push("/students");
      }
    }
  }
  const handleChange = (event, answerId) => {
    if (event.target.checked) {
      dataToServer.markedAnswersId.push(answerId._id);
    } else {
      dataToServer.markedAnswersId = dataToServer.markedAnswersId.filter(
        (answer) => answer != answerId._id
      );
    }
  };
  return (
    <>
      {!showQuestions && (
        <div className={styles.content}>
          <div className={styles.title}>Instructions</div>
          <div className={styles.title}>{testLabel}</div>
          {!showLobby && (
            <CircularProgress sx={{ color: "rgba(133, 64, 245, 0.97)" }} />
          )}
          {showLobby && (
            <div className={styles.subTitle}>
              In this test you have {numOfQuestions} questions.
              <br /> Be sure to read the questions and answer them correctly, as
              it is not possible to return to the questions you have already
              answered.
            </div>
          )}
          <div className={styles.subTitle3}>Good luck on the test!</div>
          <div className={styles.submitDiv}>
            <Button
              className={styles.submitButton}
              sx={{
                marginTop: "25px",
                background: "rgba(133, 64, 245, 0.97)",
              }}
              title="click to start the test"
              variant="contained"
              onClick={() =>
                startTest(setShowQuestions, intervalId, setIntervalId)
              }
            >
              Start the test
            </Button>
          </div>
        </div>
      )}
      {showQuestions && (
        <div className={styles.content}>
          <div className={styles.subTitle2}>Question: {questionNum}</div>
          <Divider className={styles.divider} />
          {showLoading && (
            <CircularProgress
              sx={{ color: "rgba(133, 64, 245, 0.97)", margin: "7vw" }}
            />
          )}
          {!showLoading && (
            <>
              <div className={styles.question}>{nextQuestion?.content} = ?</div>
              {nextQuestion?.answers.map((answer, index) => (
                <div className={styles.answer} key={answer._id}>
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#472CC0",
                      },
                    }}
                    checked={checked[index]}
                    value={answer}
                    onChange={() => handleChange(event, answer)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <div className={styles.answerContent}>{answer.content}</div>
                </div>
              ))}
              <div>
                <Button
                  className={styles.submitButton}
                  sx={{
                    marginTop: "25px",
                    background: "rgba(133, 64, 245, 0.97)",
                  }}
                  key="goOn"
                  title="Go to the next question"
                  variant="contained"
                  onClick={() => goOn(test, intervalId, setIntervalId)}
                >
                  Go on!
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
TestLobby.authStudents = true;
