import AdminNav from "../../components/AdminNav/AdminNav";
import AddTeacher from "../../components/AddTeacher/AddTeacher";
import { Grid } from "@mui/material";

export default function Admin() {
  return (
    <Grid container>
      <AdminNav />
      <AddTeacher />
    </Grid>
  );
}
Admin.authAdmin = true;
