import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AdminLogin from "../components/AdminLogin/AdminLogin";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import adminContext from "../Context/adminContext";
import styles from "../styles/globals.css";

const { AD_PASS } = process.env;

const CheckAuth = ({ children, authAdmin, authStudents, authTeachers }) => {
  const { data, status } = useSession();
  const [permissions, setPermissions] = useState({});

  const email = data?.user?.email;
  console.log("data", email);

  useEffect(() => {
    if (email && (authStudents || authAdmin || authTeachers)) {
      console.log("/api/permissions", email);
      fetch(`/api/permissions/${email}`)
        .then((res) => res.json())
        .then((permission) => {
          console.log("permission", permission);
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
  const adminPassword = AD_PASS;
  const [disableButton, setDisableButton] = useState(true);
  const [openAdminLoginDialog, setOpenAdminLoginDialog] = useState(false);
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
    <div className={styles.container}>
      <SessionProvider session={session}>
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
          <Footer />
        </adminContext.Provider>
      </SessionProvider>
    </div>
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
      <br /> please contact the management.
    </div>
  );
}
