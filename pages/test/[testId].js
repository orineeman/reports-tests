import Checkbox from "@mui/material/Checkbox";
import styles from "./testId.module.css";
import { Button, CircularProgress, Divider, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import messageContext from "../../Context/messageContext";

let answerTime = 0;

async function getTestFromServer(
  testId,
  setNextQuestion,
  setQuestionNum,
  setNumOfQuestion,
  setTest,
  email,
  setDoneTest,
  setShowLobby
) {
  try {
    const json = await fetch("/api/test", {
      method: "GET",
      headers: { pleaseGetTestId: testId, email },
    });
    const data = await json.json();
    const test = data.filterdData;
    const currentQuestion = data.currentQuestion;
    setDoneTest(data.done);
    setTest(test);
    setNextQuestion(test[currentQuestion - 1]);
    setNumOfQuestion(test.length);
    setQuestionNum(currentQuestion);
    setShowLobby(true);
  } catch (err) {
    console.log(err);
  }
}

async function sendDataToServer(dataToServer, nextQuestion, answerTime) {
  dataToServer.questionId = nextQuestion.questionId;
  const restAnswers = nextQuestion.answers.filter(
    (answer) => answer.answerId !== dataToServer.markedAnswerId
  );
  dataToServer.restAnswers = restAnswers;
  dataToServer.time = answerTime;

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
        <div className={styles.subTitle}>
          You have completed this test before
        </div>
      )}
    </Grid>
  );
}

function TestQuestions({ testId, setDoneTest }) {
  let email = "";
  const [showQuestions, setShowQuestions] = useState(false);
  const [showLobby, setShowLobby] = useState(false);
  const [nextQuestion, setNextQuestion] = useState({});
  const [test, setTest] = useState();
  const [numOfQuestions, setNumOfQuestions] = useState(0);
  const [questionNum, setQuestionNum] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [checked, setChecked] = useState([]);
  const { setMessage, setShowMessage } = useContext(messageContext);

  const router = useRouter();
  const dataToServer = {
    markedAnswerId: "",
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
        setShowLobby
      );
    }
  }, [email, setDoneTest, testId]);

  async function goOn(test, intervalId, setIntervalId) {
    if (questionNum <= test.length) {
      await sendDataToServer(dataToServer, nextQuestion, answerTime);
      setNextQuestion(test[questionNum]);
      setQuestionNum(questionNum + 1);
      answerTime = 0;
      answerTimeCount(intervalId, setIntervalId, answerTime, dataToServer);
      setChecked([]);
      if (questionNum === test.length) {
        setShowMessage(true);
        setMessage("Well done");
        router.push("/students");
      }
    }
  }
  const handleChange = (event, answer) => {
    if (event.target.checked) {
      dataToServer.markedAnswerId = answer.answerId;
    }
  };
  return (
    <>
      {!showQuestions && (
        <div className={styles.content}>
          <div className={styles.title}>Instructions</div>
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
          <div className={styles.subTitle2}>Good luck on the test!</div>
          <div className={styles.submitDiv}>
            <Button
              className={styles.submitButton}
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
          <div className={styles.question}>{nextQuestion?.content} = ?</div>
          {nextQuestion?.answers.map((answer, index) => (
            <div className={styles.answer} key={answer.answerId}>
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
              sx={{ marginTop: "25px" }}
              key="goOn"
              title="Go to the next question"
              variant="contained"
              onClick={() => goOn(test, intervalId, setIntervalId)}
            >
              Go on!
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
TestLobby.authStudents = true;
