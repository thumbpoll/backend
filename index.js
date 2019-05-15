require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Hello Thumbpoll"
  });
});

const users = require("./routes/usersRouter");
app.use("/users", users);

const polls = require("./routes/pollsRouter");
app.use("/polls", polls);

const options = require("./routes/optionsRouter");
app.use("/options", options);

app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}`);
});
