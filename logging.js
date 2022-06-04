const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream"); // version 2.x
const json = require("morgan-json");

// create a rotating write stream
const accessLogStream = rfs.createStream("access.log", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
  path: path.join(__dirname, "log"),
});

const format = json(
  `:remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms`
);

// setup the logger
const setupLogging = (app) => {
  app.use(morgan(format, { stream: accessLogStream }));
};

exports.setupLogging = setupLogging;
