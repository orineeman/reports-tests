import { CircularProgress, Grid } from "@mui/material";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AdminLogin from "../components/AdminLogin/AdminLogin";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Message from "../components/Message/Message";
import adminContext from "../Context/adminContext";
import messageContext from "../Context/messageContext";

const { ADMIN_PASS } = process.env;

const CheckAuth = ({ children, authAdmin, authStudents, authTeachers }) => {
  const { data, status } = useSession();
  const [permissions, setPermissions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const email = data?.user?.email;

  useEffect(() => {
    if (email && (authStudents || authAdmin || authTeachers)) {
      setIsLoading(true);
      fetch(`/api/permissions/${email}`)
        .then((res) => res.json())
        .then((permission) => {
          setPermissions(permission);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          console.log("error");
        });
    }
  }, [authAdmin, authStudents, authTeachers, email]);

  if (authStudents && permissions.studentPermission) {
    return <AuthStudents status={status}>{children}</AuthStudents>;
  } else if (authTeachers && permissions.teacherPermission) {
    return <AuthTeachers status={status}>{children}</AuthTeachers>;
  } else if (authAdmin && permissions.adminPermission) {
    return <AuthAdmin status={status}>{children}</AuthAdmin>;
  } else if (
    (authAdmin && !permissions.adminPermission) ||
    (authStudents && !permissions.studentPermission) ||
    (authTeachers && !permissions.teacherPermission)
  ) {
    if (isLoading) {
      return (
        <CircularProgress
          style={{ margin: "auto", color: "rgba(133, 64, 245, 0.97)" }}
        />
      );
    } else {
      return <Authorized />;
    }
  } else {
    return children;
  }
};

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const adminPassword = ADMIN_PASS;
  const [disableButton, setDisableButton] = useState(true);
  const [openAdminLoginDialog, setOpenAdminLoginDialog] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [numOfNewMessages, setNumOfMessages] = useState();

  function getNumOfNewMessages(setNewMessages) {
    fetch("/api/contact-us", {
      method: "GET",
      headers: { pleaseGet: "numOfNewMessages" },
    })
      .then((res) => res.json())
      .then((numOfNewMessages) => {
        setNewMessages(numOfNewMessages);
      })
      .catch(() => console.log("error"));
  }

  const handleClickOpenAdminLogin = () => {
    setOpenAdminLoginDialog(true);
  };
  const handleCloseAdminLogin = () => {
    setOpenAdminLoginDialog(false);
    setDisableButton(true);
  };
  const testAdminLogin = () => {
    setOpenAdminLoginDialog(false);
  };

  return (
    <Grid container>
      <SessionProvider session={session}>
        <messageContext.Provider value={{ setMessage, setShowMessage }}>
          <adminContext.Provider
            value={{
              disableButton,
              setDisableButton,
              handleClickOpenAdminLogin,
              openAdminLoginDialog,
              handleCloseAdminLogin,
              testAdminLogin,
              adminPassword,
              getNumOfNewMessages,
              numOfNewMessages,
              setNumOfMessages,
            }}
          >
            <Header />
            <CheckAuth
              authAdmin={Component.authAdmin}
              authStudents={Component.authStudents}
              authTeachers={Component.authTeachers}
            >
              <Component {...pageProps} />
            </CheckAuth>
            <AdminLogin />
            <Message
              message={message}
              showMessage={showMessage}
              setShowMessage={setShowMessage}
            />
            <Footer />
          </adminContext.Provider>
        </messageContext.Provider>
      </SessionProvider>
    </Grid>
  );
}
export default MyApp;

function AuthStudents({ children, status }) {
  if (status === "loading") {
    return <div>Trying to connect to the Student page...</div>;
  }
  return children;
}

function AuthTeachers({ children, status }) {
  if (status === "loading") {
    return <div>Trying to connect to the Teacher page...</div>;
  }
  return children;
}

function AuthAdmin({ children, status }) {
  if (status === "loading") {
    return <div>Trying to connect to the Admin page...</div>;
  }
  return children;
}

function Authorized() {
  return (
    <div
      style={{
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 400,
        fontsize: "16px",
        lineHeight: "24px",
        marginTop: "200px",
        marginLeft: "300px",
        marginBottom: "200px",
      }}
    >
      You do not have permission for this page,
      <br /> please sign in with google or contact the management.
    </div>
  );
}
