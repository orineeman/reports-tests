import { BottomNavigationAction, Divider } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./TeachersNav.module.css";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ContactUs from "../ContactUs/ContactUs";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CreateIcon from "@mui/icons-material/Create";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ArchiveIcon from "@mui/icons-material/Unarchive";

function handleClickOpenContactUs(setOpenDrawer) {
  setOpenDrawer(true);
}

export default function TeachersNav() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { data: session } = useSession();
  let email = "";
  if (session) {
    email = session.user.email;
  }
  return (
    <div className={styles.teacherNav}>
      <Link href="/teachers/sending-test">
        <div className={styles.btnTeacherNav}>
          <SendIcon className={styles.iconsTeacherNav} />
          <div
            className={styles.linksTeacherNav}
            title="Sending a test to students"
          >
            Sending test
          </div>
        </div>
      </Link>
      <Link href="/teachers/create-tests">
        <div className={styles.btnTeacherNav}>
          <CreateIcon className={styles.iconsTeacherNav} />
          <div className={styles.linksTeacherNav} title="Create, Edit ,Delete">
            Create tests
          </div>
        </div>
      </Link>
      <Link href="/teachers/create-group">
        <div className={styles.btnTeacherNav}>
          <GroupAddIcon className={styles.iconsTeacherNav} />
          <div
            className={styles.linksTeacherNav}
            key="classes"
            title="create group"
          >
            create group
          </div>
        </div>
      </Link>
      <Link href={`/teachers/reports/${email}`}>
        <div className={styles.btnTeacherNav}>
          <TextSnippetIcon className={styles.iconsTeacherNav} />
          <div className={styles.linksTeacherNav} key="Reports" title="Reports">
            Reports
          </div>
        </div>
      </Link>
      <Link href="/teachers/uploading-questions">
        <div className={styles.btnTeacherNav}>
          <ArchiveIcon className={styles.iconsTeacherNav} />
          <div
            className={styles.linksTeacherNav}
            key="Uploading questions"
            title="Uploading questions"
          >
            Add questions
          </div>
        </div>
      </Link>
      <div className={styles.btnTeacherNav}>
        <BottomNavigationAction
          title="Contact Us"
          icon={
            <ContactMailIcon
              className={styles.iconsTeacherNav}
              style={{
                fontSize: 22,
              }}
            />
          }
          onClick={() => handleClickOpenContactUs(setOpenDrawer)}
        />
        <div
          className={styles.linksTeacherNavContactUs}
          key="Contact us"
          title="Contact us"
        >
          Contact us
        </div>
        <ContactUs
          email={email}
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
      </div>

      <Divider className={styles.divider} />
    </div>
  );
}
