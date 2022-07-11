// import { useSession } from "next-auth/react";
import AdminNav from "../components/AdminNav/AdminNav";
import styles from "../styles/Home.module.css";

export default function Admin() {
  // const { data: session } = useSession();
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <AdminNav />
      </div>
      <div className={styles.contents}>
        <h1>welcome mr. admin</h1>
      </div>
    </div>
  );
}
