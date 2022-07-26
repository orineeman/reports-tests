import { Badge, Divider } from "@mui/material";
import Link from "next/link";
import styles from "./AdminNav.module.css";
import MailIcon from "@mui/icons-material/Mail";
import { useContext } from "react";
import adminContext from "../../Context/adminContext";
import ArchiveIcon from "@mui/icons-material/Unarchive";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

export default function AdminNav() {
  const { getNumOfNewMessages, numOfNewMessages, setNumOfMessages } =
    useContext(adminContext);
  getNumOfNewMessages(setNumOfMessages);
  return (
    <div className={styles.adminNav}>
      <Link href="/admin/uploading-questions">
        <div className={styles.btnAdminNav}>
          <ArchiveIcon className={styles.iconsAdminNav} />
          <div
            className={styles.linksAdminNav}
            key="Tests"
            title="Sending a test to students"
          >
            {" "}
            Add questions
          </div>
        </div>
      </Link>
      <Link href="/admin/check-new-questions">
        <div className={styles.btnAdminNav}>
          <PlaylistAddCheckCircleIcon className={styles.iconsAdminNav} />
          <div
            className={styles.linksAdminNav}
            key="Tests"
            title="Sending a test to students"
          >
            {" "}
            Check new questions
          </div>
        </div>
      </Link>
      <Link href="/admin/add-teacher">
        <div className={styles.btnAdminNav}>
          <PersonAddIcon className={styles.iconsAdminNav} />
          <div
            className={styles.linksAdminNav}
            key="Tests"
            title="Sending a test to students"
          >
            {" "}
            Add teacher
          </div>
        </div>
      </Link>
      <Link href="/admin/reports">
        <div className={styles.btnAdminNav}>
          <AssessmentIcon className={styles.iconsAdminNav} />
          <div
            className={styles.linksAdminNav}
            key="Tests"
            title="Sending a test to students"
          >
            {" "}
            Reports
          </div>
        </div>
      </Link>
      <Link href="/admin/base-data-updates">
        <div className={styles.btnAdminNav}>
          <SystemUpdateAltIcon className={styles.iconsAdminNav} />
          <div
            className={styles.linksAdminNav}
            key="Tests"
            title="Sending a test to students"
          >
            {" "}
            Base data updates
          </div>
        </div>
      </Link>
      <Link href="/admin/messages">
        <div className={styles.btnAdminNav}>
          <Badge badgeContent={numOfNewMessages} color="secondary">
            <MailIcon color="#323232" style={{ marginLeft: "1.5vw" }} />
          </Badge>
          <div
            className={styles.linksAdminNav}
            key="Tests"
            title="Sending a test to students"
          >
            {" "}
            Message box
          </div>
        </div>
      </Link>
      <Divider className={styles.divider} />
    </div>
  );
}
