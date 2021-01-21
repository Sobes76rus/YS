import Document, { Html, Head, Main, NextScript } from "next/document";

class myDocument extends Document {
  render() {
    return (
      <Html>
        <Head />

        <body className="text-center">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default myDocument;
