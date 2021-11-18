const express = require("express");
const userRouter = require("./core/routers/user/user");
const taskRouter = require("./core/routers/task/task");
const cors = require("cors");
require("dotenv").config();
require("./core/db/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
  console.log(`Backend server is up on PORT: ${PORT}`);
});
