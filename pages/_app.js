import { style } from "@mui/system";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
