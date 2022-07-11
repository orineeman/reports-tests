// import { useSession } from "next-auth/react";
import { Link } from "@mui/material";
import styles from "../styles/Home.module.css";

export default function Test() {
  //   function getTestIdFromServer() {
  //     fetch("/api/test", {
  //       method: "GET",
  //     })
  //       .then((res) => res.json())
  //       .then((testId) => {
  //         console.log(testId);
  //       })
  //       .catch(() => console.log("error"));
  //   }
  return (
    <div className={styles.container}>
      <div className={styles.nav}></div>
      <div className={styles.contents}>
        <h1>Instructions:</h1>
        <h3>
          In this test you have X questions. Be sure to read the questions and
          answer them correctly, as it is not possible to return to the
          questions you have already answered.
        </h3>

        <h2>Good luck on the test!</h2>
        <div>
          <Link href={`/test/${testId}`}>Click here</Link>to start test
        </div>
      </div>
    </div>
  );
}
