const express = require("express");
const cors = require("cors");
const { name, version } = require("./package.json");
const { ROUTES } = require("./routes");
const { setupLogging } = require("./logging");
const { setupRateLimit } = require("./ratelimit");
const { setupCreditCheck } = require("./creditcheck");
const { setupProxies } = require("./proxy");
const { setupAuth } = require("./auth");

const app = express();
const port = 4000;

app.use(
  cors({
    origin: "*",
  })
);

setupLogging(app);
setupRateLimit(app, ROUTES);
setupAuth(app, ROUTES);
setupCreditCheck(app, ROUTES);
setupProxies(app, ROUTES);

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: `Sevice ${name} is running`,
    version,
  });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
