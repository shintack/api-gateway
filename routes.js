const ROUTES = [
  {
    url: "/sample",
    auth: true,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 60,
    },
    proxy: {
      target: "http://127.0.0.1:5001/sample",
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        [`^/sample`]: "",
      },
    },
  },
];

exports.ROUTES = ROUTES;
