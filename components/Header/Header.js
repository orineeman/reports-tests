import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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
function validationPermissionUser(session) {
  fetch("/api/permissions", {
    method: "GET",
    headers: { please: "valid", email: session?.user?.email },
  })
    .then((res) => res.json())
    .then((confirm) => {
      setConfirm(confirm);
    })
    .catch(() => console.log("error"));
}

async function userConnection(user) {
  // console.log("user", user);
  user ? true : false;
}

async function logIn(setSignIn, session) {
  await signIn("google", {
    redirect: false,
    callbackUrl: `http://localhost:3000/`,
  });
  // setSignIn(true);
  validationPermissionUser(session);
}
async function logOut(setSignIn) {
  await signOut({
    redirect: true,
    callbackUrl: "http://localhost:3000/",
  });
  // setSignIn(false);
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
      <h3>Test-reports</h3>
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
