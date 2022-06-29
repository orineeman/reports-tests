import AdminNav from "../components/AdminNav/AdminNav";
import styles from "../styles/Home.module.css";

export default function Admin() {
  // const { noHideExplanationTeachers } = useContext(functionsContext);
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <AdminNav />
      </div>
      <div className={styles.contents}>
        <h1>בעעעעעעעעעעעעעעעעעעע</h1>
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
