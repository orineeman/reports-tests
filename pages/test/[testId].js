import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "./testId.module.css";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import TeachersNav from "../../components/TeachersNav/TeachersNav";
// import UploadingQuestions from "../components/UploadingQuestions/UploadingQuestions";

export default function TestLobby() {
  const router = useRouter();
  const { testId } = router.query;

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <TeachersNav />
      </div>
      <div className={styles.contents}>
        <TestQuestions testId={testId} />
      </div>
    </div>
  );
}
function getTestFromServer(
  testId,
  setNextQuestion,
  currentQuestion,
  // questions,
  setNumOfQuestion,
  setTest
) {
  fetch("/api/test", {
    method: "GET",
    headers: { pleaseGetTestId: testId },
  })
    .then((res) => res.json())
    .then((test) => {
      setTest(test);
      setNextQuestion(test[currentQuestion]);
      setNumOfQuestion(test.length);
      console.log(test);
    })
    .catch(() => console.log("error"));
}

function TestQuestions({ testId }) {
  let email = "";
  // let questions = [];
  let currentQuestion = 0;
  const [showQuestions, setShowQuestions] = useState(false);
  const [nextQuestion, setNextQuestion] = useState();
  const [test, setTest] = useState();
  const [numOfQuestion, setNumOfQuestion] = useState(0);
  const [questionNum, setQuestionNum] = useState(currentQuestion + 1);

  const { data: session } = useSession();
  if (session) {
    email = session.user.email;
  }

  useEffect(() => {
    if (email) {
      getTestFromServer(
        testId,
        setNextQuestion,
        currentQuestion,
        // questions,
        setNumOfQuestion,
        setTest
      );
    }
  }, [email]);

  function goOn(test) {
    // fetch("/api/student", {
    //   method: "PATCH",
    //   body: {
    //     email,
    //     testId,
    //     // questionId,
    //     // markedAnswer,
    //     // responseTime,
    //     currentQuestion,
    //   },
    // })
    //   // .then((res) => res.json())
    //   .then(() => {
    //     console.log("save  on DB");
    //   })
    //   .catch(() => console.log("error"));
    console.log(test);
    // console.log(questions[currentQuestion + 1]);
    setNextQuestion(test[questionNum + 1]);
    setQuestionNum(questionNum + 1);
  }

  return (
    <div>
      {!showQuestions && (
        <div className={styles.container}>
          {/* <div className={styles.nav}></div> */}
          <div className={styles.contents}>
            <h1>Instructions:</h1>
            <h3>
              In this test you have {numOfQuestion} questions. Be sure to read
              the questions and answer them correctly, as it is not possible to
              return to the questions you have already answered.
            </h3>

            <h2>Good luck on the test!</h2>
            <div>
              <Button
                sx={{ marginBottom: "15px" }}
                title="click to start the test"
                variant="contained"
                onClick={() => setShowQuestions(true)}
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
              <div key={`div${answer}`}>
                <FormControlLabel
                  key={answer}
                  control={<Checkbox />}
                  label={answer.content}
                />
              </div>
            ))}
            <div>
              <Button
                sx={{ marginBottom: "15px" }}
                key="goOn"
                title="Go to the next question"
                variant="contained"
                onClick={
                  () => goOn(test)
                  // markedAnswer
                  // questionNum - 1
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
