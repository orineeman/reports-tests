import { BottomNavigationAction } from "@mui/material";
import Button from "@mui/material/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./TeachersNav.module.css";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ContactUs from "../ContactUs/ContactUs";
import { useState } from "react";

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
    <div className={styles.navButton}>
      <Link href="/teachers/sending-test" className={styles.link}>
        <Button
          sx={{ marginBottom: "15px" }}
          key="Tests"
          title="Sending a test to students"
        >
          Sending test
        </Button>
      </Link>
      <Link href="/teachers/create-tests" className={styles.link}>
        <Button
          sx={{ marginBottom: "15px" }}
          key="Tests"
          title="Create, Edit ,Delete"
        >
          Create tests
        </Button>
      </Link>
      <Link href="/teachers/create-group" className={styles.link}>
        <Button
          sx={{ marginBottom: "15px" }}
          key="classes"
          title="create group"
        >
          create group
        </Button>
      </Link>
      <Link href={`/teachers/reports/${email}`} className={styles.link}>
        <Button sx={{ marginBottom: "15px" }} key="Reports" title="Reports">
          Reports
        </Button>
      </Link>
      <Link href="/teachers/uploading-questions" className={styles.link}>
        <Button
          sx={{ marginBottom: "15px" }}
          key="Uploading questions"
          title="Uploading questions"
        >
          Uploading questions
        </Button>
      </Link>
      <BottomNavigationAction
        title="Contact Us"
        icon={<ContactMailIcon />}
        onClick={() => handleClickOpenContactUs(setOpenDrawer)}
      />
      <ContactUs
        email={email}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      Contact us
    </div>
  );
}
