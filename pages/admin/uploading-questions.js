import UploadingQuestions from "../../components/UploadingQuestions/UploadingQuestions";
import AdminNav from "../../components/AdminNav/AdminNav";
import { Grid } from "@mui/material";

export default function Admin() {
  return (
    <Grid container>
      <AdminNav />
      <UploadingQuestions />
    </Grid>
  );
}
Admin.authAdmin = true;
