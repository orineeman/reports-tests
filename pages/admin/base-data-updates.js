import AdminNav from "../../components/AdminNav/AdminNav";
import BaseDataUpdates from "../../components/BaseDataUpdates/BaseDataUpdates";
import { Grid } from "@mui/material";

export default function Admin() {
  return (
    <Grid container>
      <AdminNav />
      <BaseDataUpdates />
    </Grid>
  );
}
Admin.authAdmin = true;
