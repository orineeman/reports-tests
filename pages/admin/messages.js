import AdminNav from "../../components/AdminNav/AdminNav";
import ReadMessages from "../../components/ReadMessages/ReadMessages";
import { Grid } from "@mui/material";

export default function Admin() {
  return (
    <Grid container>
      <AdminNav />
      <ReadMessages />
    </Grid>
  );
}
Admin.authAdmin = true;
