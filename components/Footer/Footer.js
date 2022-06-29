import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import adminContext from "../../Context/adminContext";
import "./Footer.module.css";

export default function Footer() {
  return (
    <div style={{ padding: "10px" }}>
      <Navigation />
    </div>
  );
}

function Navigation() {
  const router = useRouter();
  const {
    handleClickOpenAdminLogin,
    // handleClickOpenTeachersRegister,
    // handleClickOpenStudentsLogin,
  } = useContext(adminContext);
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        console.log(newValue);
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

      <BottomNavigationAction label="Students login" icon={<MenuBookIcon />} />
      <BottomNavigationAction label="Teachers login" icon={<SchoolIcon />} />
      <BottomNavigationAction
        label="Teachers register"
        icon={<AppRegistrationIcon />}
      />
      <BottomNavigationAction
        label="Admin"
        icon={<AdminPanelSettingsIcon />}
        onClick={handleClickOpenAdminLogin}
      />
    </BottomNavigation>
  );
}
