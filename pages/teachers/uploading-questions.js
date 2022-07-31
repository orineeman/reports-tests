import UploadingQuestions from "../../components/UploadingQuestions/UploadingQuestions";
import TeachersNav from "../../components/TeachersNav/TeachersNav";
import { Grid } from "@mui/material";

export default function Teachers() {
  return (
    <Grid container>
      <TeachersNav />
      <UploadingQuestions />
    </Grid>
  );
}
Teachers.authTeachers = true;
