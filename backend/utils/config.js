require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("./logger.js");

const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const connectToDb = async () => {
  try {
    console.log("connecting to ", MONGODB_URI);
    mongoose.connect(MONGODB_URI);
    logger.info("connected to Mongodb");
  } catch (error) {
    logger.info("couldnt connect to Mongodb", error.message);
  }
};

const setupPort = async (app) => {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

module.exports = { connectToDb, setupPort };
