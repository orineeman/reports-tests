import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { Grid } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import adminContext from "../../Context/adminContext";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <Grid container className={styles.footerdDiv}>
      <Navigation />
    </Grid>
  );
}

function Navigation() {
  const [admin, setAdmin] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    let email = "";
    if (session) {
      email = session.user.email;
      if (email === process.env.EMAIL) {
        setAdmin(true);
      }
    }
  }, [session]);
  const router = useRouter();
  const { handleClickOpenAdminLogin } = useContext(adminContext);
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      sx={{
        "& .Mui-selected, .Mui-selected > svg": {
          color: "#140b53",
          // width: "50vw",
        },
      }}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        className={styles.footerIcon}
        label="Home"
        icon={<HomeIcon />}
        onClick={() => router.push("/")}
      />
      <BottomNavigationAction
        className={styles.footerIcon}
        label="About"
        icon={<InfoIcon />}
        onClick={() => router.push("/about")}
      />

      {admin && (
        <BottomNavigationAction
          className={styles.footerIcon}
          label="Admin"
          icon={<AdminPanelSettingsIcon />}
          onClick={handleClickOpenAdminLogin}
        />
      )}
    </BottomNavigation>
  );
}
