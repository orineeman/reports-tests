import { Grid } from "@mui/material";
import SendingTest from "../../components/SendingTest/SendingTest";
import TeachersNav from "../../components/TeachersNav/TeachersNav";

export default function Teachers() {
  return (
    <Grid container>
      <TeachersNav />
      <SendingTest />
    </Grid>
  );
}
Teachers.authTeachers = true;
