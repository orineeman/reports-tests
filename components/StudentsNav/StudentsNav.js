import Link from "next/link";
import styles from "./StudentsNav.module.css";
import DoneIcon from "@mui/icons-material/Done";
export default function StudentNav() {
  return (
    <div className={styles.studentNav}>
      <Link href="/students/tests">
        <div className={styles.btnStudentNav}>
          <DoneIcon className={styles.iconsStudentNav} />
          <div
            className={styles.linksStudentNav}
            key="Tests"
            title="Tests to be done"
          >
            Tests to be done
          </div>
        </div>
      </Link>
    </div>
  );
}
