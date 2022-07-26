import { Grid } from "@mui/material";
import CreateGroup from "../../components/CreateGroup/CreateGroup";
import TeachersNav from "../../components/TeachersNav/TeachersNav";

export default function Teachers() {
  return (
    <Grid container>
      <TeachersNav />
      <CreateGroup />
    </Grid>
  );
}
Teachers.authTeachers = true;
