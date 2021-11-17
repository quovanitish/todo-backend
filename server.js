const express = require("express");
require("./core/db/db");
const taskRouter = require("./core/routers/task/task");
const userRouter = require("./core/routers/user/user");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
  console.log(`Backend server is up on port: ${PORT}`);
});
