import Checkbox from "@mui/material/Checkbox";
import styles from "./testId.module.css";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

async function getTestFromServer(
  testId,
  setNextQuestion,
  setQuestionNum,
  setNumOfQuestion,
  setTest,
  email,
  setDoneTest
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
  } catch (err) {
    console.log(err);
  }
}

function sendDataToServer(dataToServer, nextQuestion, answerTime) {
  dataToServer.questionId = nextQuestion.questionId;
  const restAnswers = nextQuestion.answers.filter(
    (answer) => answer.answerId !== dataToServer.markedAnswerId
  );
  dataToServer.restAnswers = restAnswers;
  dataToServer.time = answerTime;
  fetch("/api/student", {
    method: "PATCH",
    headers: { answer: "answer" },
    body: JSON.stringify({
      dataToServer,
    }),
  }).catch(() => console.log("error"));
}

function answerTimeCount(intervalId, setIntervalId, answerTime, dataToServer) {
  // dataToServer.time = answerTime;
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
  const [doneTest, setDoneTest] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <h2>Goodluck!</h2>
      </div>
      <div className={styles.contents}>
        {!doneTest && (
          <TestQuestions testId={testId} setDoneTest={setDoneTest} />
        )}
        {doneTest && <h2>You have completed this test before</h2>}
      </div>
    </div>
  );
}

function TestQuestions({ testId, setDoneTest }) {
  let answerTime = 0;
  let email = "";
  const [showQuestions, setShowQuestions] = useState(false);
  const [nextQuestion, setNextQuestion] = useState({});
  const [test, setTest] = useState();
  const [numOfQuestions, setNumOfQuestions] = useState(0);
  const [questionNum, setQuestionNum] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
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
        setDoneTest
      );
    }
  }, [email, testId]);

  async function goOn(
    test,
    intervalId,
    setIntervalId,
    // answerTime,
    dataToServer
  ) {
    console.log("answerTime", answerTime);
    if (questionNum <= test.length) {
      // dataToServer.time = answerTime;

      await sendDataToServer(dataToServer, nextQuestion, answerTime);
      setNextQuestion(test[questionNum]);
      setQuestionNum(questionNum + 1);
      answerTimeCount(intervalId, setIntervalId, answerTime, dataToServer);
      if (questionNum === test.length) {
        alert("Well done");
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
                    // answerTime,
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
