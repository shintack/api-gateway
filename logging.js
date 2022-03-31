// const morgan = require("morgan");
const mongooseMorgan = require("mongoose-morgan");
const setupLogging = (app) => {
  // app.use(morgan("combined"));
  // app.use(morgan("tiny"));
  // Logger
  app.use(
    mongooseMorgan(
      {
        connectionString: "mongodb://localhost:27017/logs-db",
      },
      {},
      function (tokens, req, res) {
        return JSON.stringify({
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          status: tokens.status(req, res),
          referrer: tokens.referrer(req, res),
          // request: tokens.req(req, res), // TODO: MSH BUG
          response: tokens.res(req, res, "content-length"),
          responseTime: tokens["response-time"](req, res) + " ms",
          totalTime: tokens["total-time"](req, res) + " ms",
          remoteAddr: tokens["remote-addr"](req, res),
          remoteUser: tokens["remote-user"](req, res),
          httpVersion: tokens["http-version"](req, res),
          userAgent: tokens["user-agent"](req, res),
        });
      }
    )
  );
};

exports.setupLogging = setupLogging;
