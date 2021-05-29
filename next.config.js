const withTM = require("next-transpile-modules")(["ky", "react-modal"]);

module.exports = withTM({
  future: {
    webpack5: false,
  },
  reactStrictMode: true,
  images: {
    domains: ["ui-avatars.com"],
  },
});
