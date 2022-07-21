import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Box, Button, Grid } from "@mui/material";
import Image from "next/image";
import { blue } from "@mui/material/colors";

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
    <Grid
      container
      style={{
        margin: -8,
        background: "rgb(230, 230, 230)",
        width: "100vw",
        // opacity: 0.8,
        height: 80,
      }}
    >
      <Grid
        item
        xs={8}
        md={4}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <>
          <Grid
            item
            xs={8}
            md={5}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CreateOutlinedIcon />
            Test-reports
          </Grid>
        </>
      </Grid>

      <Grid
        item
        xs={2}
        md={6}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          fontSize: 10,
        }}
      >
        Hello {session?.user?.name || `guest`}
      </Grid>
      <Grid
        item
        xs={2}
        md={2}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!signIn && (
          <Button
            className={styles.signIn}
            // style={{
            //   borderRadius: "50px",
            //   display: "flex",
            //   textAlign: "center",
            //   alignItems: "center",
            //   justifyContent: "center",
            //   border: "1px solid #4285f4",
            //   fontSize: 10,
            //   background: "#fff",
            // }}
            onClick={() => logIn(setSignIn, session)}
          >
            <p className={styles.signInText} style={{ marginRight: 4 }}>
              sign in with
            </p>
            <GoogleIcon />
            {/* <Image
              class="google-icon"
              alt="sign in"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              // layout="fill"
              width="18px"
              height="18px"
            /> */}
          </Button>
        )}
        {signIn && (
          <Button
            style={{
              borderRadius: "50px",

              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
            }}
            onClick={() => {
              logOut(setSignIn);
            }}
          >
            Sign out
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
        <path
          fill="#4285F4"
          d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
        />
        <path
          fill="#34A853"
          d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
        />
        <path
          fill="#FBBC05"
          d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
        />
        <path
          fill="#EA4335"
          d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
        />
      </g>
    </svg>
  );
}
