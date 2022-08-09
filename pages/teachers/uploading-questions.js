import { Grid } from "@mui/material";
import TeachersNav from "../../components/TeachersNav/TeachersNav";
import UploadingQuestions from "../../components/UploadingQuestions/UploadingQuestions";

export default function Teachers() {
  return (
    <Grid container>
      <TeachersNav />
      <UploadingQuestions />
    </Grid>
  );
}
Teachers.authTeachers = true;
