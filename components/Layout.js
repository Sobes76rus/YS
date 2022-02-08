import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Script from "next/script";
import { useEffect, useState } from "react";

const Layout = (pageProps) => {
  const { isLoading } = pageProps;

  const [paddingTop, setPaddingTop] = useState(0);
  const headerProps = {
    services: pageProps.services,
    ceoPages: pageProps.ceoPages,
    ceoPagesGroups: pageProps.ceoPagesGroups,
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
        <meta
          name="description"
          content={`${
            pageProps.description ? pageProps.description : "Description"
          }`}
          key="description"
        />
        <meta
          name="google-site-verification"
          content="9RbbCfEnk9qtmkCapnYX_scmcCuvotBHz9mfPfMGVYg"
        />
        <meta property="title" content={pageProps.title} key="title" />
        <link rel="icon" type="image/png" href="/icons/favicon-16x16.png" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;400&display=swap"
        />

        <link
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          rel="stylesheet"
        />
        <Script
          type="text/javascript"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
       
          ym(55422358, "init", {
               clickmap:true,
               trackLinks:true,
               accurateTrackBounce:true,
               webvisor:true,
               trackHash:true
          });
  `,
          }}
        />
        <title>{pageProps.title} </title>
      </Head>
      {!pageProps.hideHeader && (
        <Header
          onCollapse={onCollapse}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          {...headerProps}
        />
      )}

      <main
        onClick={() => setCollapsed(false)}
        className={`main ${isLoading && "main-text-align"} ${
          !pageProps.marginBottom && "pb-6"
        }`}
      >
        {pageProps.children}
      </main>

      {!pageProps.hideFooter && <Footer {...footerProps} />}
    </div>
  );
};

export default Layout;
