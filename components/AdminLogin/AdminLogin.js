import Button from "@mui/material/Button";
import AdminLoginDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
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
        <DialogTitle sx={{ input: { color: "#140B53" } }}>
          Admin login
        </DialogTitle>
        <DialogContent>
          <TextField
            color="secondary"
            sx={{ input: { color: "#140B53" } }}
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
          <Button style={{ color: "#9C27B0" }} onClick={handleCloseAdminLogin}>
            Cancel
          </Button>
          <Button
            style={{ color: "#9C27B0" }}
            disabled={disableButton}
            onClick={() => goToAdminPage()}
          >
            Go-on
          </Button>
        </DialogActions>
      </AdminLoginDialog>
    </>
  );
}
