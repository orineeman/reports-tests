import Button from "@mui/material/Button";
import AdminLoginDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useContext, useState } from "react";
import adminContext from "../../Context/adminContext";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const {
    disableButton,
    setDisableButton,
    openAdminLoginDialog,
    handleCloseAdminLogin,
    adminPassword,
  } = useContext(adminContext);

  const router = useRouter();
  function goToAdminPage() {
    handleCloseAdminLogin();
    router.push("/admin");
  }
  const testAdminPassword = (event) => {
    setDisableButton(true);
    if (event.target.value === adminPassword) setDisableButton(false);
  };
  return (
    <>
      <AdminLoginDialog
        open={openAdminLoginDialog}
        onClose={handleCloseAdminLogin}
      >
        <DialogTitle>Admin login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="admin_login"
            label="Password"
            type="Password"
            fullWidth
            variant="standard"
            required
            onChange={testAdminPassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdminLogin}>Cancel</Button>
          {!disableButton && (
            // <Link href="/admin">
            <Button onClick={() => goToAdminPage()}>Login</Button>
            // </Link>
          )}
        </DialogActions>
      </AdminLoginDialog>
    </>
  );
}
