import Link from "next/link";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import styles from "./LeftMainNav.module.css";
import Divider from "@mui/material/Divider";

export default function LeftMainNav() {
  return (
    <div className={styles.leftMainNav}>
      <Link href="/students">
        <div className={styles.btnMainNav} key="student-login">
          <MenuBookIcon className={styles.iconsMainNav} />
          <div className={styles.linksMainNav}>Students</div>
        </div>
      </Link>
      <Link href="/teachers">
        <div className={styles.btnMainNav} key="teachers-registr">
          <SchoolIcon className={styles.iconsMainNav} />
          <div className={styles.linksMainNav}>Teachers</div>
        </div>
      </Link>
      <Divider className={styles.divider} />
    </div>
  );
}
