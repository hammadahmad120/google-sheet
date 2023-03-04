const express = require("express");
require("dotenv").config({
  path: process.env.NODE_ENV ? ".env" : ".env.development",
});
var app = express();
const cors = require("cors");

const errorHandler = require("./middlewares/errorHandler");
const { logger, loggerMiddleware } = require("./middlewares/logger");

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use("/api/chapter", require("./controllers/chapter.controller"));

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info("Server Listening on port : ", PORT);
});
