// const withSass = require("@zeit/next-sass");
const withImages = require("next-images");
// const withLess = require("@zeit/next-less");
// const withCSS = require("@zeit/next-css");

module.exports = withImages({
  env: {
    ANY_ENV_KEY: "ANY_ENV_VARIABLE",
    IMAGES_DOMAIN: process.env.IMAGES_DOMAIN,
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    IMAGES_DOMAIN: process.env.IMAGES_DOMAIN,
  },
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96],
    domains: [process.env.IMAGES_DOMAIN],
    path: "/_next/image",
    loader: "default",
  },
});
