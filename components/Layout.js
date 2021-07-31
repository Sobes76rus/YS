import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";

const Layout = (pageProps) => {
  const { navigation } = pageProps;
  console.log(navigation);
  const [paddingTop, setPaddingTop] = useState(0);
  const headerProps = {
    navigation: pageProps.navigation,
    headerAbsolute: pageProps.headerAbsolute,
    navbarHoverLight: pageProps.navbarHoverLight,
    bgHoverPurple: pageProps.bgHoverPurple,
  };
  const footerProps = {
    navigation: pageProps.navigation,
    fixedBottom: pageProps.fixedBottom,
  };

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
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
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;400&display=swap"
        />
        <link rel="icon" href="/img/favicon.png" />
        <link
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          rel="stylesheet"
        />
        <title>{pageProps.title} </title>
      </Head>
      {!pageProps.hideHeader && (
        <Header
          onCollapse={onCollapse}
          collapsed={collapsed}
          {...headerProps}
        />
      )}

      <main
        onClick={() => setCollapsed(false)}
        className={`main ${!pageProps.marginBottom && "pb-6"}`}
      >
        {pageProps.children}
      </main>

      {!pageProps.hideFooter && <Footer {...footerProps} />}
    </div>
  );
};

export default Layout;
