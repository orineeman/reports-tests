import AdminNav from "../../components/AdminNav/AdminNav";
import MessageBox from "../../components/MessageBox/MessageBox";
import { Grid } from "@mui/material";

export default function Admin() {
  return (
    <Grid container>
      <AdminNav />
      <MessageBox />
    </Grid>
  );
}
Admin.authAdmin = true;
