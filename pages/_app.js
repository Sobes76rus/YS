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
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  NProgress.configure({ showSpinner: false });

  const [isYMIinitialized, setIsYMIinitialized] = useState(false);
  const code = 87364815;
  const key = `yaCounter${code}`;
  const handleYM = () => {
    if (window[key]) {
      window[key].hit(window.location.pathname);
    }
  };
  const initYM = async () => {
    if (!isYMIinitialized) {
      setIsYMIinitialized(true);

      window.ym(code, "init", {
        defer: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        // Отключить вебвизор по просьбе Витали, т.к. не нужно
        // webvisor:true,
        trackHash: true,
      });

      // Ожидаем когда загрузится скрипт
      while (!window[key]) {
        await new Promise((r) => setTimeout(() => r(), 100));
      }

      // После инициализации тоже необходимо уведомить ЯМ
      // т.к. мы отключили автоматическое уведомление флагом defer
      handleYM();
    }
  };

  useEffect(() => {
    initYM();

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

    // Необходимо уведомить яндекс метрику о переходе по ссылке
    router.events.on("routeChangeComplete", handleYM);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);

      router.events.off("routeChangeComplete", handleYM);
    };
  }, [router]);

  return (
    <>
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  `,
        }}
      />
      <DefaultSeo {...SEO} />
      <ContextWrapper>
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
