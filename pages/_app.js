import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import ContextWrapper from "../contexts/ContextWrapper";
import { useRouter } from "next/router";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

function MyApp({ Component, pageProps, navigation }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ContextWrapper>
        <Header navigation={navigation} />
        <Component {...pageProps} />
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
