import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import ContextWrapper from "../contexts/ContextWrapper";
import NextNprogress from "nextjs-progressbar";
import "../scss/style.default.scss";
import "react-image-lightbox/style.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ContextWrapper>
        <Layout layout={Component.layout} {...pageProps}>
          <NextNprogress
            color="#dac9f9"
            startPosition={0.3}
            stopDelayMs={200}
            height={10}
            showOnShallow={true}
            options={{ showSpinner: false }}
          />
          <Component {...pageProps} />
        </Layout>
      </ContextWrapper>
    </>
  );
}

export default MyApp;
