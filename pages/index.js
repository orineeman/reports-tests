import { Grid } from "@mui/material";
import Head from "next/head";
import LeftMainNav from "../components/LeftMainNav/LeftMainNav";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tests reports</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/book.png" />
      </Head>
      <Grid container>
        <LeftMainNav />
        <div className={styles.titlesDiv}>
          <div className={styles.title}>
            Welcome to Test-reports! Site for Test Reports
          </div>
          <div className={styles.subTitle}>
            Want to hear more?{" "}
            <span className={styles._subTitle}>Enter the About tab</span>
          </div>
          <div className={styles.subTitle}>
            Do you have permission?{" "}
            <span className={styles._subTitle}>start working!</span>
          </div>
        </div>
      </Grid>
    </>
  );
}
