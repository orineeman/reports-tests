// import TeachersNav from "../TeachersNav/TeachersNav";
// import UploadingQuestions from "../UploadingQuestions/UploadingQuestions";
// import StudentRegistration from "../StudentRegistration/StudentRegistration";
// import "./Teachers.css";
// import CreateTests from "../CreateTests/CreateTests";
import CreateTests from "../components/CreateTests/CreateTests";
import TeachersNav from "../components/TeachersNav/TeachersNav";
import UploadingQuestions from "../components/UploadingQuestions/UploadingQuestions";
import styles from "../styles/Home.module.css";

// import { Route, Routes } from "react-router-dom";
// import { useContext } from "react";
// import functionsContext from "../../functionsContext/functionsContext";

export default function Teachers() {
  // const { noHideExplanationTeachers } = useContext(functionsContext);
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <TeachersNav />
      </div>
      <div className={styles.contents}>
        <UploadingQuestions />
        {/* <StudentRegistration /> */}
        <CreateTests />
        {/* {noHideExplanationTeachers && <ExplanationTeachers />} */}
        {/* <Routes> */}
        {/* <Route path="/uploading-questions" element={<UploadingQuestions />} /> */}
        {/* <Route path="/creat-test" element={<CreatTest />} />
          <Route
            path="/student-registration"
            element={<StudentRegistration />}
          />
          <Route path="/reports" element={<Reports />} />  */}
        {/* </Routes> */}
      </div>
    </div>
  );
}

// function ExplanationTeachers() {
//   return (
//     <p>
//       A. Uploading questions to the database - fields to fill in - approximate
//       age for the question, the question, 4 American answers or a standard
//       answer, send button. Will send an email thanking the teacher for the
//       question, and response time X days if the question was received.
//       <br />
//       <br />
//       B. In pulling a test by age and by subject - filtering by age and subject
//       , and then a window for selecting questions by randomness, or checkbox,
//       opens. And send for printing.
//       <br />
//       <br />
//       C. Preserved tests from the past.
//       <br />
//       <br />
//       D. Entering student names to receive users - Entering a full name, and
//       receiving an output of username and password for each student. Option to
//       print passwords for classroom use. Students will be classified as a "Grade
//       3" group. And in choosing a test opening class, each student will see the
//       test after doing a login.
//       <br />
//       <br />
//       E. The presentation of reports - after a test has been taken, its data
//       will be displayed, with the option of filtering by student, and by
//       question.
//     </p>
//   );
// }
