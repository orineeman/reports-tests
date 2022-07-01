import Button from "@mui/material/Button";
import styles from "./LeftMainNav.module.css";

export default function LeftMainNav() {
  // const {
  //   handleClickOpenStudentsLogin,
  //   handleClickOpenTeachersLogin,
  //   handleClickOpenTeachersRegister,
  // } = useContext(functionsContext);
  return (
    <div
      className={styles.navButton}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Button
        sx={{ marginBottom: "10px" }}
        key="student-login"
        // onClick={handleClickOpenStudentsLogin}
      >
        Student login (google)
      </Button>
      <Button
        sx={{ marginBottom: "10px" }}
        key="teachers-registr"
        // onClick={handleClickOpenTeachersRegister}
      >
        Teachers register (Canceled)
      </Button>
      <Button
        sx={{ marginBottom: "10px" }}
        key="teachers-login"
        // onClick={handleClickOpenTeachersLogin}
      >
        Teachers login (google)
      </Button>
    </div>
  );
}
