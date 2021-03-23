import Document, { Html, Head, Main, NextScript } from "next/document";

class myDocument extends Document {
  render() {
    return (
      <Html>
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
        </Head>

        <body className="text-center">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default myDocument;
