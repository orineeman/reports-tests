import AdminNav from "../../components/AdminNav/AdminNav";
import CheckNewQuestions from "../../components/CheckNewQuestions/CheckNewQuestions";
import { Grid } from "@mui/material";

export default function Admin() {
  return (
    <Grid container>
      <AdminNav />
      <CheckNewQuestions />
    </Grid>
  );
}
Admin.authAdmin = true;
