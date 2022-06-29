import { style } from "@mui/system";
import { useState } from "react";
import AdminLogin from "../components/AdminLogin/AdminLogin";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import adminContext from "../Context/adminContext";
import styles from "../styles/globals.css";

function MyApp({ Component, pageProps }) {
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
        <Component {...pageProps} />
        <AdminLogin />
        <Footer />
      </adminContext.Provider>
    </div>
  );
}

export default MyApp;
