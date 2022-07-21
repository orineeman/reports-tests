import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { Grid } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import adminContext from "../../Context/adminContext";
import "./Footer.module.css";

export default function Footer() {
  return (
    <Grid
      container
      style={{
        width: "100vw",
      }}
    >
      <Grid item xs={12}>
        <Navigation />
      </Grid>
    </Grid>
  );
}

function Navigation() {
  const router = useRouter();
  const { handleClickOpenAdminLogin } = useContext(adminContext);
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        onClick={() => router.push("/")}
      />
      <BottomNavigationAction
        label="About"
        icon={<InfoIcon />}
        onClick={() => router.push("/about")}
      />
      <BottomNavigationAction
        label="Admin"
        icon={<AdminPanelSettingsIcon />}
        onClick={handleClickOpenAdminLogin}
      />
    </BottomNavigation>
  );
}
