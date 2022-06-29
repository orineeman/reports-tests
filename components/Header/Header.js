import styles from "./Header.module.css";

// import GradingIcon from "@mui/icons-material/Grading";
export default function Header({ userName }) {
  return (
    <div className={styles.header}>
      <h3>Test-reports</h3>
      <h5>Hello{userName}</h5>
    </div>
  );
}
