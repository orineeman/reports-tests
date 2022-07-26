import AdminNav from "../../components/AdminNav/AdminNav";
import AdminReports from "../../components/AdminReports/AdminReports";
import { Grid } from "@mui/material";

export default function Admin() {
  return (
    <Grid container>
      <AdminNav />
      <AdminReports />
    </Grid>
  );
}
Admin.authAdmin = true;
