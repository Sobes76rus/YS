import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import ContextWrapper from "../components/ContextWrapper";
import Router from "next/router";

function myApp({ Component, pageProps, navigation }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ContextWrapper>
        <Header navigation={navigation} />
      </ContextWrapper>
      <Component {...pageProps} />
    </>
  );
}

function redirectUser(ctx, location) {
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
    return; // should be added IMO.
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push(location);
  }

  return token;
}

myApp.getInitialProps = async (ctx) => {
  const jwt = false;
  const { API_URL } = process.env;
  const res = await fetch(`${API_URL}/navigations`);
  const navigation = await res.json();

  if (ctx.pathname === "/payed-articles") {
    redirectUser(ctx, "/login");
  }

  return { navigation };
};

export default myApp;
