require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const app = express();

app.use(express.json());

// app.use('/', (req, res) => {
//   res.send({
//     message: 'Hello World'
//   })
// })

const users = require("./routes/usersRouter");
app.use("/users", users);
const polls = require("./routes/pollsRouter");
app.use("/polls", polls);

app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}`);
});
