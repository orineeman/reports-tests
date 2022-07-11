// import { useSession } from "next-auth/react";
import AdminNav from "../components/AdminNav/AdminNav";
import styles from "../styles/Home.module.css";
import TestQuestions from "./test/[testId]";

export default function Admin() {
  // const { data: session } = useSession();
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <AdminNav />
      </div>
      <div className={styles.contents}>
        <h1>Some super secret dashboard</h1>
        <TestQuestions />
      </div>
    </div>
  );
}
