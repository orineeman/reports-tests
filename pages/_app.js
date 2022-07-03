import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import AdminLogin from "../components/AdminLogin/AdminLogin";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import adminContext from "../Context/adminContext";
import styles from "../styles/globals.css";
// import { Link } from "@mui/material";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log("auth", Component.auth);
  const adminPassword = "ori";
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
          {Component.auth ? (
            // <Auth>
            <Component {...pageProps} />
          ) : (
            // </Auth>
            <Component {...pageProps} />
          )}
          <AdminLogin />
          <Footer />
        </adminContext.Provider>
      </SessionProvider>
    </div>
  );
}
export default MyApp;
