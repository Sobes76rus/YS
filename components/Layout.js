import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";

const Layout = (pageProps) => {
  const { navigation } = pageProps;
  const [paddingTop, setPaddingTop] = useState(0);
  const headerProps = {
    navigation: pageProps.navigation,
    headerAbsolute: pageProps.headerAbsolute,
    navbarHoverLight: pageProps.navbarHoverLight,
    bgHoverPurple: pageProps.bgHoverPurple,
  };

  return (
    <div
      style={{
        paddingTop: pageProps.noPaddingTop ? "0" : paddingTop,
        minHeight: "100vh",
      }}
      className="mt-auto"
    >
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap"
        />

        <link rel="icon" href="/img/favicon.png" />
        <link
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          rel="stylesheet"
        />
        <title>{pageProps.title} YS </title>
      </Head>
      {!pageProps.hideHeader && <Header {...headerProps} />}

      <main className="main pb-6">{pageProps.children}</main>

      {!pageProps.hideFooter && <Footer navigation={navigation} />}
    </div>
  );
};

export default Layout;
