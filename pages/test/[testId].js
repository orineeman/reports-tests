import Checkbox from "@mui/material/Checkbox";
import styles from "./testId.module.css";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

async function getTestFromServer(
  testId,
  setNextQuestion,
  currentQuestion,
  setNumOfQuestion,
  setTest
) {
  console.log("currentQuestion", currentQuestion);
  try {
    const json = await fetch("/api/test", {
      method: "GET",
      headers: { pleaseGetTestId: testId },
    });
    const test = await json.json();
    setTest(test);
    console.log(test);
    setNextQuestion(test[currentQuestion - 1]);
    setNumOfQuestion(test.length);
  } catch (err) {
    console.log(err);
  }
}

function sendDataToServer(dataToServer, nextQuestion, answerTime) {
  dataToServer.questionId = nextQuestion.questionId;
  console.log("nextQuestion", nextQuestion);
  const restAnswers = nextQuestion.answers.filter(
    (answer) => answer.answerId !== dataToServer.markedAnswerId
  );
  dataToServer.restAnswers = restAnswers;
  console.log("restAnswers", restAnswers);
  dataToServer.time = 5;
  fetch("/api/student", {
    method: "PATCH",
    headers: { answer: "answer" },
    body: JSON.stringify({
      dataToServer,
    }),
  })
    // .then((res) => res.json())
    .then(() => {
      console.log("save on DB");
    })
    .catch(() => console.log("error"));
}

function answerTimeCount(intervalId, setIntervalId, answerTime, dataToServer) {
  if (intervalId) {
    clearInterval(intervalId);
    setIntervalId(0);
  }
  const newIntervalId = setInterval(() => {
    answerTime++;
    dataToServer.time = answerTime;
    console.log(answerTime);
  }, 1000);
  setIntervalId(newIntervalId);
}

function startTest(
  setShowQuestions,
  intervalId,
  setIntervalId,
  answerTime,
  dataToServer
) {
  setShowQuestions(true);
  answerTimeCount(intervalId, setIntervalId, answerTime, dataToServer);
}

export default function TestLobby() {
  const router = useRouter();
  const { testId } = router.query;
  console.log("testId", testId);

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <h2>Goodluck!</h2>
      </div>
      <div className={styles.contents}>
        <TestQuestions testId={testId} />
      </div>
    </div>
  );
}

function TestQuestions({ testId }) {
  let answerTime = 0;
  let email = "";
  let currentQuestion = 1;
  const [showQuestions, setShowQuestions] = useState(false);
  const [nextQuestion, setNextQuestion] = useState({});
  const [test, setTest] = useState();
  const [numOfQuestions, setNumOfQuestions] = useState(0);
  const [questionNum, setQuestionNum] = useState(currentQuestion);
  const [intervalId, setIntervalId] = useState(0);
  const router = useRouter();
  const dataToServer = {
    // markedAnswer: "",
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
        currentQuestion,
        setNumOfQuestions,
        setTest
      );
    }
  }, [email, testId]);

  async function goOn(
    test,
    intervalId,
    setIntervalId,
    answerTime,
    dataToServer
  ) {
    if (questionNum < test.length - 1) {
      // dataToServer.time = answerTime;
      console.log("dataToServer", dataToServer);

      await sendDataToServer(dataToServer, nextQuestion, answerTime);
      setNextQuestion(test[questionNum + 1]);
      setQuestionNum(questionNum + 1);
      answerTimeCount(intervalId, setIntervalId, answerTime, dataToServer);
    } else {
      alert("Well done");
      router.push("/students");
    }
  }
  const handleChange = (event, answer) => {
    if (event.target.checked) {
      dataToServer.markedAnswerId = answer.answerId;
    }
    console.log("dataToServer", dataToServer);
  };
  return (
    <div>
      {!showQuestions && (
        <div className={styles.container}>
          <div className={styles.contents}>
            <h1>Instructions:</h1>
            <h3>
              In this test you have {numOfQuestions} questions. Be sure to read
              the questions and answer them correctly, as it is not possible to
              return to the questions you have already answered.
            </h3>

            <h2>Good luck on the test!</h2>
            <div>
              <Button
                sx={{ marginBottom: "15px" }}
                title="click to start the test"
                variant="contained"
                onClick={() =>
                  startTest(
                    setShowQuestions,
                    intervalId,
                    setIntervalId,
                    answerTime,
                    dataToServer
                  )
                }
              >
                Start the test
              </Button>
            </div>
          </div>
        </div>
      )}
      {showQuestions && (
        <div className={styles.container}>
          <div className={styles.contents}>
            <h6>Question: {questionNum}</h6>
            <h2>{nextQuestion?.content}</h2>
            {nextQuestion?.answers.map((answer) => (
              <div key={answer}>
                <Checkbox
                  value={answer}
                  onChange={() => handleChange(event, answer)}
                />
                {answer.content}
              </div>
            ))}
            <div>
              <Button
                sx={{ marginBottom: "15px" }}
                key="goOn"
                title="Go to the next question"
                variant="contained"
                onClick={() =>
                  goOn(
                    test,
                    intervalId,
                    setIntervalId,
                    answerTime,
                    dataToServer
                  )
                }
              >
                Go on
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
