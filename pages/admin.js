import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminNav from "../components/AdminNav/AdminNav";
import styles from "../styles/Home.module.css";

export default function Admin() {
  const router = useRouter();
  const { data: session } = useSession();
  let email = "";
  if (session?.user?.email) {
    email = session.user.email;
  }
  useEffect(() => {
    if (email) {
      fetch("/api/admin", {
        method: "GET",
        headers: { pleaseGet: "permissionAdmin", email },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("res.status", res.status);
          if (res.status === "not confirm") {
            router.push("/");
          }
        })
        .catch(() => console.log("error"));
    }
  }, [email, router]);
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

Admin.authAdmin = true;
