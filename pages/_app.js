import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

export default function myApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Header />
      <Component {...pageProps} />
    </>
  );
}
