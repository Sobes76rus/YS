import "../styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/style.default.scss";
import Header from "../components/Header";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import ContextWrapper from "../contexts/ContextWrapper";
import getConfig from "next/config";
import Layout from "../components/Layout";

const { publicRuntimeConfig } = getConfig();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ContextWrapper>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ContextWrapper>
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const jwt = false;
  let pageProps = {};

  const res = await fetch(`${publicRuntimeConfig.API_URL}/navigations`);
  const navigation = await res.json();

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
    navigation,
    jwt,
  };
};

export default MyApp;
