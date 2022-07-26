import { Grid } from "@mui/material";
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
          if (res.status === "not confirm") {
            router.push("/");
          }
        })
        .catch(() => console.log("error"));
    }
  }, [email, router]);
  return (
    <Grid container>
      <AdminNav />
      <div className={styles.titlesDiv}>
        <div className={styles.title}>welcome mr. admin</div>
      </div>
    </Grid>
  );
}

Admin.authAdmin = true;
