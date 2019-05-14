const mongoose = require("mongoose");

const MONGODB_CONNECTION =
  process.env.MONGODB_URI || "mongodb://localhost:27017/thumbpoll";

mongoose.set("useCreateIndex", true);

mongoose.connect(
  MONGODB_CONNECTION,
  {
    useNewUrlParser: true
  },
  function(err) {
    if (err) {
      return console.log("failed");
    }
  }
);

module.exports = mongoose;
