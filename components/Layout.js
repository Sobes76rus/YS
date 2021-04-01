import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";

const Layout = (pageProps) => {
  const { navigation } = pageProps;
  const [paddingTop, setPaddingTop] = useState(0);
  const headerProps = {
    navigation,
  };

  return (
    <div
      style={{ paddingTop: pageProps.noPaddingTop ? "0" : paddingTop }}
      className="mt-auto"
    >
      {!pageProps.hideHeader && <Header {...headerProps} />}

      <main>{pageProps.children}</main>

      {!pageProps.hideFooter && <Footer navigation={navigation} />}
    </div>
  );
};

export default Layout;
