import Button from "@mui/material/Button";
import styles from "./LeftMainNav.module.css";
// import functionsContext from "../../functionsContext/functionsContext";
import { useContext } from "react";
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
        Student login
      </Button>
      <Button
        sx={{ marginBottom: "10px" }}
        key="teachers-registr"
        // onClick={handleClickOpenTeachersRegister}
      >
        Teachers register
      </Button>
      <Button
        sx={{ marginBottom: "10px" }}
        key="teachers-login"
        // onClick={handleClickOpenTeachersLogin}
      >
        Teachers login
      </Button>
    </div>
  );
}
