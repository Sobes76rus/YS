import Head from "next/head";
import Header from "./Header";
// import Footer from "./Footer";
import { useEffect, useState } from "react";

const Layout = (pageProps) => {
  const [paddingTop, setPaddingTop] = useState(0);
  const headerProps = {
    nav: {
      classes: pageProps.nav && pageProps.nav.classes,
      fixed: pageProps.nav && pageProps.nav.fixed,
      color: pageProps.nav && pageProps.nav.color,
      light: pageProps.nav && pageProps.nav.light,
      dark: pageProps.nav && pageProps.nav.dark,
      sticky: pageProps.nav && pageProps.nav.sticky,
    },
    loggedUser: pageProps.loggedUser,
    headerClasses: pageProps.headerClasses,
    headerAbsolute: pageProps.headerAbsolute,
    hideTopbar: pageProps.hideTopbar,
    setPaddingTop: (event) => setPaddingTop(event),
  };

  return (
    <div
      style={{ paddingTop: pageProps.noPaddingTop ? "0" : paddingTop }}
      className={pageProps.className}
    >
      {!pageProps.hideHeader && <Header {...headerProps} />}

      <main>{pageProps.children}</main>

      {/* {!pageProps.hideFooter && <Footer />} */}
    </div>
  );
};

export default Layout;
