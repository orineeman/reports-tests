import { Grid } from "@mui/material";
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

  const email = data?.user?.email;

  useEffect(() => {
    if (email && (authStudents || authAdmin || authTeachers)) {
      fetch(`/api/permissions/${email}`)
        .then((res) => res.json())
        .then((permission) => {
          console.log(permission);
          setPermissions(permission);
        })
        .catch(() => console.log("error"));
    }
  }, [authAdmin, authStudents, authTeachers, email]);

  if (authStudents && permissions.studentPermission) {
    return <AuthStudents status={status}>{children}</AuthStudents>;
  } else if (authTeachers && permissions.teacherPermission) {
    return <AuthTeachers status={status}>{children}</AuthTeachers>;
  } else if (authAdmin && permissions.adminPermission) {
    return <AuthAdmin status={status}>{children}</AuthAdmin>;
  } else if (authAdmin || authStudents || authTeachers) {
    return <Authorized />;
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

function AuthStudents({ children }) {
  return children;
}

function AuthTeachers({ children }) {
  return children;
}

function AuthAdmin({ children }) {
  return children;
}

function Authorized() {
  return (
    <div
      style={{ marginTop: "200px", marginLeft: "300px", marginBottom: "200px" }}
    >
      You do not have permission for this page,
      <br /> please sign in with google or contact the management.
    </div>
  );
}
