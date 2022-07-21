import Link from "next/link";

import Button from "@mui/material/Button";
import styles from "./LeftMainNav.module.css";
import { createTheme, ThemeProvider, Typography } from "@mui/material";

const theme = createTheme();
theme.typography.h6 = {
  fontSize: "0.5rem",
  "@media (min-width:600px)": {
    fontSize: "1rem",
  },
};
export default function LeftMainNav() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 30,
      }}
    >
      <ThemeProvider theme={theme}>
        <Link href="/students">
          <Button sx={{ marginBottom: "10px" }} key="student-login">
            <Typography variant="h6">Students</Typography>
          </Button>
        </Link>
        <Link href="/teachers">
          <Button sx={{ marginBottom: "10px" }} key="teachers-registr">
            <Typography variant="h6">Teachers</Typography>
          </Button>
        </Link>
      </ThemeProvider>
    </div>
  );
}
