import { Grid } from "@mui/material";
import CreateTests from "../../components/CreateTests/CreateTests";
import TeachersNav from "../../components/TeachersNav/TeachersNav";

export default function Teachers() {
  return (
    <Grid container>
      <TeachersNav />
      <CreateTests />
    </Grid>
  );
}
Teachers.authTeachers = true;
