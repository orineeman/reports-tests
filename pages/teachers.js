import { useSession } from "next-auth/react";
import TeachersNav from "../components/TeachersNav/TeachersNav";
import styles from "../styles/Home.module.css";

export default function Teachers() {
  function validationPermissionUser() {
    const { status } = useSession({
      required: true,
      onUnauthenticated() {
        console.log("not connected");
      },
    });

    if (status === "loading") {
      console.log("Loading or not authenticated...");
    }
    console.log("User is logged in");
  }

  validationPermissionUser();
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <TeachersNav />
      </div>
      <div className={styles.contents}>
        <ExplanationTeachers />
      </div>
    </div>
  );
}

function ExplanationTeachers() {
  return (
    <p>
      A. Uploading questions to the database - fields to fill in - approximate
      age for the question, the question, 4 American answers or a standard
      answer, send button. Will send an email thanking the teacher for the
      question, and response time X days if the question was received.
      <br />
      <br />
      B. In pulling a test by age and by subject - filtering by age and subject
      , and then a window for selecting questions by randomness, or checkbox,
      opens. And send for printing.
      <br />
      <br />
      C. Preserved tests from the past.
      <br />
      <br />
      D. Entering student names to receive users - Entering a full name, and
      receiving an output of username and password for each student. Option to
      print passwords for classroom use. Students will be classified as a Grade
      3 group. And in choosing a test opening class, each student will see the
      test after doing a login.
      <br />
      <br />
      E. The presentation of reports - after a test has been taken, its data
      will be displayed, with the option of filtering by student, and by
      question.
    </p>
  );
}
