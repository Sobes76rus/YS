import "../styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import ContextWrapper from "../contexts/ContextWrapper";
import getConfig from "next/config";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const { publicRuntimeConfig } = getConfig();

function MyApp({ Component, pageProps, navigation }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ContextWrapper>
        <Header navigation={navigation} />
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
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
