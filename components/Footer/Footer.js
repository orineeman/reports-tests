import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
// import { Link } from "react-router-dom";
import Link from "next/link";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useContext, useState } from "react";
// import functionContext from "../../functionsContext/functionsContext";
// import { useContext } from "react";
// import functionContext from "../../functionsContext/functionsContext";

import "./Footer.module.css";
export default function Footer() {
  return (
    <div className="footer">
      {" "}
      <Navigation />
    </div>
  );
}

function Navigation() {
  // const {
  //   handleClickOpenTeachersLogin,
  //   handleClickOpenTeachersRegister,
  //   handleClickOpenStudentsLogin,
  // } = useContext(functionContext);
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
      <Link href="/">
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      </Link>
      <Link href="/about">
        <BottomNavigationAction label="About" icon={<InfoIcon />} />
      </Link>

      <BottomNavigationAction
        label="Students login"
        icon={<MenuBookIcon />}
        // onClick={handleClickOpenStudentsLogin}
      />
      <BottomNavigationAction
        label="Teachers login"
        icon={<SchoolIcon />}
        // onClick={handleClickOpenTeachersLogin}
      />
      <BottomNavigationAction
        label="Teachers register"
        icon={<AppRegistrationIcon />}
        // onClick={handleClickOpenTeachersRegister}
      />
      <Link href="/admin">
        <BottomNavigationAction
          label="Admin"
          icon={<AdminPanelSettingsIcon />}
        />
      </Link>
    </BottomNavigation>
  );
}
