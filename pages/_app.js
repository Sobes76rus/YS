import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import ContextWrapper from "../contexts/ContextWrapper";
import NProgress from "nprogress";
import { Spinner } from "reactstrap";
import "nprogress/nprogress.css";
import "../scss/style.default.scss";
import "react-image-lightbox/style.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { YMInitializer } from "react-yandex-metrika";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
      NProgress.start();
    };
    const handleStop = () => {
      setIsLoading(false);
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);
  return (
    <>
      <DefaultSeo {...SEO} />
      <ContextWrapper>
        <YMInitializer
          accounts={[55422358]}
          options={{
            defer: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
          }}
          version="2"
        />
        <Layout layout={Component.layout} isLoading={isLoading} {...pageProps}>
          {isLoading ? (
            <Spinner className="spinner" />
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </ContextWrapper>
    </>
  );
}

export default MyApp;
