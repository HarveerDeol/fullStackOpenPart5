const app = require("./app"); // the actual Express application
const config = require("./utils/config");
const logger = require("./utils/logger");

config.setupPort(app);
