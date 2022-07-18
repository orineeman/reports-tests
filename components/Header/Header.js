import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

async function userConnection(user) {
  user ? true : false;
}

async function logIn() {
  await signIn("google", {
    redirect: false,
    callbackUrl: `http://localhost:3000/`,
  });
}
async function logOut() {
  await signOut({
    redirect: true,
    callbackUrl: "http://localhost:3000/",
  });
}
export default function Header() {
  const { data: session } = useSession();
  const [signIn, setSignIn] = useState(userConnection(session?.user));
  useEffect(() => {
    if (session?.user) {
      setSignIn(true);
    } else {
      setSignIn(false);
    }
  }, [session]);
  return (
    <div className={styles.header}>
      <div className={styles.flex}>
        <CreateOutlinedIcon />
        <h3>Test-reports</h3>
      </div>
      <h5>Hello {session?.user?.name || `guest`}</h5>
      <div>
        {!signIn && (
          <button
            className={styles.signIn}
            onClick={() => logIn(setSignIn, session)}
          >
            Sign in with Google
          </button>
        )}
        {signIn && (
          <button
            className={styles.signOut}
            onClick={() => {
              logOut(setSignIn);
            }}
          >
            Sign out
          </button>
        )}
      </div>
    </div>
  );
}
