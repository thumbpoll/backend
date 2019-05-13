require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const app = express();

app.use(express.json());

const users = require("./routes/usersRouter");
app.use("/users", users);
const polls = require("./routes/pollsRouter");
app.use("/polls", polls);
const options = require("./routes/optionsRouter");
app.use("/options", options);

app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}`);
});
