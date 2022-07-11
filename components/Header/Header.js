import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Header.module.css";

// function createTeacher(userDetails) {
// console.log(userDetails);
// fetch("/api/teacher", {
//   method: "POST",
//   body: JSON.stringify(userDetails),
// })
//   .then((res) => res.json())
//   .then(() => {
//     console.log("the client register in the DB");
//   })
//   .catch(() => console.log("error"));
// }

export default function Header() {
  const { data: session } = useSession();
  if (session?.user?.name) {
    // console.log(session.user);
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
              // callbackUrl: {`http://localhost:3000/teachers/${nameForDynamicRoute}`},
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
