import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Header.module.css";

// import GradingIcon from "@mui/icons-material/Grading";
export default function Header() {
  const { data: session } = useSession();
  if (session?.user?.name) {
    const nameForDynamicRoute = session.user.name.replaceAll(" ", "-");
    console.log(nameForDynamicRoute);
  }
  return (
    <div className={styles.header}>
      <h3>Test-reports</h3>
      <h5>Hello {session?.user?.name || `guest`}</h5>
      <div>
        <button
          className={styles.signIn}
          onClick={() =>
            signIn("google", {
              redirect: false,
              // callbackUrl: `http://localhost:3000/teachers/${nameForDynamicRoute}`,
              callbackUrl: `http://localhost:3000/teachers`,
            })
          }
        >
          Sign in with Google
        </button>
        <button
          className={styles.signOut}
          onClick={() =>
            signOut({ redirect: false, callbackUrl: "http://localhost:3000/" })
          }
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
