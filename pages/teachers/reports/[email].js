import { Grid } from "@mui/material";
import TeacherReports from "../../../components/TeacherReports/TeacherReports";
import TeachersNav from "../../../components/TeachersNav/TeachersNav";

export default function Teachers() {
  return (
    <Grid container>
      <TeachersNav />
      <TeacherReports />
    </Grid>
  );
}
Teachers.authTeachers = true;
